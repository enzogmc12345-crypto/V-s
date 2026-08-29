/**
 * Carrossel Suite - camada ExtendScript do Illustrator.
 *
 * Escrito em ES3: sem let/const, sem arrow, sem JSON nativo. O painel
 * (Chromium) monta a chamada como texto, com os parametros ja calculados
 * pelo nucleo compartilhado, e recebe de volta uma string JSON.
 *
 * Unidades: o nucleo trabalha em pixels a 72 dpi, que equivalem a pontos
 * no Illustrator (1 px = 1 pt). A conversao de eixo e feita aqui: o
 * nucleo usa Y para baixo a partir do topo, o Illustrator usa Y para cima.
 */

#target illustrator

/* ------------------------------------------------------------------ */
/* utilitarios                                                         */
/* ------------------------------------------------------------------ */

function serializar(valor) {
    var i, partes;
    if (valor === null || valor === undefined) return 'null';
    var tipo = typeof valor;
    if (tipo === 'number') return isFinite(valor) ? String(valor) : 'null';
    if (tipo === 'boolean') return valor ? 'true' : 'false';
    if (tipo === 'string') {
        return '"' + valor
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/[\r\n]/g, ' ') + '"';
    }
    if (valor instanceof Array) {
        partes = [];
        for (i = 0; i < valor.length; i++) partes.push(serializar(valor[i]));
        return '[' + partes.join(',') + ']';
    }
    partes = [];
    for (i in valor) {
        if (valor.hasOwnProperty(i)) partes.push('"' + i + '":' + serializar(valor[i]));
    }
    return '{' + partes.join(',') + '}';
}

function ok(dados) {
    return serializar({ ok: true, dados: dados === undefined ? null : dados });
}

function falha(mensagem) {
    return serializar({ ok: false, erro: String(mensagem) });
}

/** Retangulo do nucleo (Y para baixo) -> artboardRect do Illustrator (Y para cima). */
function paraArtboardRect(pagina) {
    return [pagina.x, -pagina.y, pagina.x + pagina.width, -(pagina.y + pagina.height)];
}

/** geometricBounds do Illustrator -> retangulo do nucleo. */
function paraRetangulo(bounds) {
    return {
        x: bounds[0],
        y: -bounds[1],
        width: bounds[2] - bounds[0],
        height: bounds[1] - bounds[3]
    };
}

function camadaGuias(doc) {
    var i;
    for (i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name === 'Guias do carrossel') {
            doc.layers[i].locked = false;
            return doc.layers[i];
        }
    }
    var camada = doc.layers.add();
    camada.name = 'Guias do carrossel';
    return camada;
}

/* ------------------------------------------------------------------ */
/* leitura                                                             */
/* ------------------------------------------------------------------ */

/** Estado do documento aberto, para o painel decidir o que oferecer. */
function carrosselLerDocumento() {
    try {
        if (app.documents.length === 0) return falha('Nenhum documento aberto.');
        var doc = app.activeDocument;
        var pranchetas = [];
        var i;
        for (i = 0; i < doc.artboards.length; i++) {
            var r = doc.artboards[i].artboardRect;
            pranchetas.push({
                indice: i,
                nome: doc.artboards[i].name,
                x: r[0],
                y: -r[1],
                width: r[2] - r[0],
                height: r[1] - r[3]
            });
        }
        return ok({
            nome: doc.name,
            salvo: doc.saved,
            caminho: doc.saved ? doc.fullName.fsName : null,
            ativa: doc.artboards.getActiveArtboardIndex(),
            pranchetas: pranchetas
        });
    } catch (e) {
        return falha(e);
    }
}

/** Retangulos dos objetos visiveis, para a conferencia de emendas. */
function carrosselLerObjetos() {
    try {
        if (app.documents.length === 0) return falha('Nenhum documento aberto.');
        var doc = app.activeDocument;
        var itens = [];
        var i;
        for (i = 0; i < doc.pageItems.length; i++) {
            var item = doc.pageItems[i];
            if (item.hidden || item.guides) continue;
            if (item.layer && (item.layer.name === 'Guias do carrossel')) continue;
            var rect;
            try {
                rect = paraRetangulo(item.visibleBounds);
            } catch (semBounds) {
                continue;
            }
            if (rect.width <= 0 || rect.height <= 0) continue;
            itens.push({
                name: item.name || item.typename,
                kind: tipoDoItem(item),
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            });
        }
        return ok(itens);
    } catch (e) {
        return falha(e);
    }
}

function tipoDoItem(item) {
    switch (item.typename) {
        case 'TextFrame':
            return 'text';
        case 'PlacedItem':
        case 'RasterItem':
            return 'image';
        case 'SymbolItem':
            return 'logo';
        default:
            return 'objeto';
    }
}

/* ------------------------------------------------------------------ */
/* criacao                                                             */
/* ------------------------------------------------------------------ */

/**
 * Cria o documento do carrossel.
 * plano.mode === 'continuous': uma prancheta larga (a arte atravessa as
 * paginas) mais as guias de corte. 'pages': uma prancheta por pagina.
 */
function carrosselCriar(plano) {
    try {
        var doc = novoDocumento(plano);
        var i;

        if (plano.mode === 'pages') {
            doc.artboards[0].artboardRect = paraArtboardRect(plano.pages[0]);
            doc.artboards[0].name = plano.pages[0].name;
            for (i = 1; i < plano.pages.length; i++) {
                var nova = doc.artboards.add(paraArtboardRect(plano.pages[i]));
                nova.name = plano.pages[i].name;
            }
        } else {
            doc.artboards[0].artboardRect = [0, 0, plano.canvas.width, -plano.canvas.height];
            doc.artboards[0].name = plano.name;
        }

        desenharGuias(doc, plano);
        doc.artboards.setActiveArtboardIndex(0);
        return ok({ nome: doc.name, pranchetas: doc.artboards.length });
    } catch (e) {
        return falha(e);
    }
}

function novoDocumento(plano) {
    try {
        var preset = new DocumentPreset();
        preset.width = plano.canvas.width;
        preset.height = plano.canvas.height;
        preset.colorMode = DocumentColorSpace.RGB;
        preset.units = RulerUnits.Pixels;
        preset.rasterResolution = DocumentRasterResolution.ScreenResolution;
        preset.title = plano.name;
        return app.documents.addDocument('Web', preset);
    } catch (semPreset) {
        // Illustrator antigo: caminho simples, sem preset.
        return app.documents.add(DocumentColorSpace.RGB, plano.canvas.width, plano.canvas.height);
    }
}

/**
 * Guias de corte e de area segura, numa camada propria e travada.
 * plano.origin existe quando as paginas foram deslocadas para cima de uma
 * prancheta que nao comeca em (0,0); sem ela, a origem e o canto do documento.
 * O nome vem do nucleo (offsetPlan), por isso esta em ingles como o resto do plano.
 */
function desenharGuias(doc, plano) {
    var camada = camadaGuias(doc);
    var origem = plano.origin || { x: 0, y: 0 };
    var topo = -origem.y;
    var base = -(origem.y + plano.canvas.height);
    var esquerda = origem.x;
    var direita = origem.x + plano.canvas.width;
    var i;
    for (i = 0; i < plano.guides.vertical.length; i++) {
        linhaGuia(camada, plano.guides.vertical[i], topo, plano.guides.vertical[i], base);
    }
    for (i = 0; i < plano.guides.horizontal.length; i++) {
        linhaGuia(camada, esquerda, -plano.guides.horizontal[i], direita, -plano.guides.horizontal[i]);
    }
    camada.locked = true;
}

function linhaGuia(camada, x1, y1, x2, y2) {
    var linha = camada.pathItems.add();
    linha.setEntirePath([[x1, y1], [x2, y2]]);
    linha.filled = false;
    linha.stroked = false;
    linha.guides = true;
}

/**
 * Fatia a prancheta larga que ja existe: cria uma prancheta por pagina
 * em cima da arte. A prancheta original vira a ultima da lista e pode ser
 * removida pelo painel (plano.removerOriginal).
 */
function carrosselFatiar(plano) {
    try {
        if (app.documents.length === 0) return falha('Nenhum documento aberto.');
        var doc = app.activeDocument;
        // O painel diz qual prancheta foi lida; usar a "ativa" aqui daria
        // outra se o usuario tivesse clicado em outra depois de planejar.
        var indiceOriginal = plano.indiceOriginal;
        var i;

        for (i = 0; i < plano.pages.length; i++) {
            var nova = doc.artboards.add(paraArtboardRect(plano.pages[i]));
            nova.name = plano.pages[i].name;
        }

        if (plano.removerOriginal &&
            indiceOriginal !== undefined && indiceOriginal !== null &&
            doc.artboards.length > plano.pages.length) {
            doc.artboards.remove(indiceOriginal);
        }

        desenharGuias(doc, plano);
        return ok({ pranchetas: doc.artboards.length });
    } catch (e) {
        return falha(e);
    }
}

/* ------------------------------------------------------------------ */
/* exportacao                                                          */
/* ------------------------------------------------------------------ */

/**
 * Exporta as pranchetas do carrossel.
 * plano.exportar: { pasta, formato: 'png'|'jpg'|'pdf', intervalo: '1-5',
 *                   escala, qualidade, prefixo }
 */
function carrosselExportar(plano) {
    try {
        if (app.documents.length === 0) return falha('Nenhum documento aberto.');
        var doc = app.activeDocument;
        var cfg = plano.exportar;
        var pasta = new Folder(cfg.pasta);
        if (!pasta.exists) pasta.create();

        if (cfg.formato === 'pdf') return exportarPDF(doc, cfg);

        try {
            return exportarPorTelas(doc, cfg, pasta);
        } catch (semExportForScreens) {
            return exportarUmaAUma(doc, cfg, pasta);
        }
    } catch (e) {
        return falha(e);
    }
}

function exportarPorTelas(doc, cfg, pasta) {
    var item = new ExportForScreensItemToExport();
    item.artboards = cfg.intervalo;
    item.document = false;

    var opcoes;
    if (cfg.formato === 'jpg') {
        opcoes = new ExportForScreensOptionsJPEG();
        opcoes.antiAliasing = true;
        opcoes.compressionMethod = JPEGCompressionMethodType.BASELINESTANDARD;
        opcoes.qualitySetting = Math.round(cfg.qualidade || 90);
        doc.exportForScreens(pasta, ExportForScreensType.SE_JPEG100, opcoes, item, cfg.prefixo || '');
    } else {
        opcoes = new ExportForScreensOptionsPNG24();
        opcoes.antiAliasing = true;
        opcoes.transparency = true;
        opcoes.scaleType = ExportForScreensScaleType.SCALEBYFACTOR;
        opcoes.scaleTypeValue = cfg.escala || 1;
        doc.exportForScreens(pasta, ExportForScreensType.SE_PNG24, opcoes, item, cfg.prefixo || '');
    }
    return ok({ metodo: 'exportForScreens', pasta: pasta.fsName });
}

/** Caminho alternativo: uma prancheta por vez, com exportFile. */
function exportarUmaAUma(doc, cfg, pasta) {
    var escala = (cfg.escala || 1) * 100;
    var arquivos = [];
    var i;
    for (i = 0; i < doc.artboards.length; i++) {
        doc.artboards.setActiveArtboardIndex(i);
        var nome = doc.artboards[i].name;
        var destino = new File(pasta.fsName + '/' + (cfg.prefixo || '') + nome);
        var opcoes;
        if (cfg.formato === 'jpg') {
            opcoes = new ExportOptionsJPEG();
            opcoes.qualitySetting = Math.round(cfg.qualidade || 90);
            opcoes.artBoardClipping = true;
            opcoes.horizontalScale = escala;
            opcoes.verticalScale = escala;
            doc.exportFile(destino, ExportType.JPEG, opcoes);
        } else {
            opcoes = new ExportOptionsPNG24();
            opcoes.transparency = true;
            opcoes.artBoardClipping = true;
            opcoes.horizontalScale = escala;
            opcoes.verticalScale = escala;
            doc.exportFile(destino, ExportType.PNG24, opcoes);
        }
        arquivos.push(nome);
    }
    return ok({ metodo: 'exportFile', pasta: pasta.fsName, arquivos: arquivos });
}

/** PDF de varias paginas: e o formato que o LinkedIn aceita como carrossel. */
function exportarPDF(doc, cfg) {
    var destino = new File(cfg.pasta + '/' + (cfg.prefixo || 'carrossel') + '.pdf');
    var opcoes = new PDFSaveOptions();
    opcoes.compatibility = PDFCompatibility.ACROBAT7;
    opcoes.preserveEditability = false;
    opcoes.viewAfterSaving = false;
    opcoes.artboardRange = cfg.intervalo;
    doc.saveAs(destino, opcoes);
    return ok({ metodo: 'pdf', arquivo: destino.fsName });
}

/* ------------------------------------------------------------------ */
/* remocao de fundo                                                    */
/* ------------------------------------------------------------------ */

/**
 * Descobre o que esta selecionado e se da para remover o fundo.
 * O Illustrator nao expoe a remocao de fundo para script, entao o
 * caminho e: pegar o arquivo da imagem, mandar para o servico local e
 * religar o resultado.
 */
function carrosselImagemSelecionada() {
    try {
        if (app.documents.length === 0) return falha('Nenhum documento aberto.');
        var doc = app.activeDocument;
        if (doc.selection.length === 0) return falha('Selecione a imagem.');
        var item = doc.selection[0];

        if (item.typename === 'PlacedItem') {
            var arquivo = null;
            try {
                arquivo = item.file.fsName;
            } catch (semArquivo) {
                arquivo = null;
            }
            if (!arquivo) return falha('A imagem esta vinculada a um arquivo que nao foi encontrado.');
            return ok({ tipo: 'vinculada', arquivo: arquivo, nome: item.name || 'imagem' });
        }

        if (item.typename === 'RasterItem') {
            return falha(
                'Esta imagem esta incorporada no arquivo .ai. Use Janela > Links > Desincorporar ' +
                'para salvar em disco, ou remova o fundo antes de colocar a imagem no Illustrator.'
            );
        }

        return falha('Selecione uma imagem (o item selecionado e ' + item.typename + ').');
    } catch (e) {
        return falha(e);
    }
}

/** Religa a imagem selecionada ao arquivo recortado devolvido pelo servico. */
function carrosselReligarImagem(params) {
    try {
        var doc = app.activeDocument;
        if (doc.selection.length === 0) return falha('A selecao mudou. Selecione a imagem de novo.');
        var item = doc.selection[0];
        var novo = new File(params.arquivo);
        if (!novo.exists) return falha('Arquivo recortado nao encontrado: ' + params.arquivo);

        try {
            item.relink(novo);
        } catch (semRelink) {
            item.file = novo;
        }
        app.redraw();
        return ok({ arquivo: novo.fsName });
    } catch (e) {
        return falha(e);
    }
}

/** Coloca um arquivo ja recortado como nova imagem no documento. */
function carrosselColocarImagem(params) {
    try {
        var doc = app.activeDocument;
        var arquivo = new File(params.arquivo);
        if (!arquivo.exists) return falha('Arquivo nao encontrado: ' + params.arquivo);
        var item = doc.placedItems.add();
        item.file = arquivo;
        if (params.x !== undefined) item.left = params.x;
        if (params.y !== undefined) item.top = -params.y;
        app.redraw();
        return ok({ nome: item.name });
    } catch (e) {
        return falha(e);
    }
}
