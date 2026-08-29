/**
 * Painel do Carrossel Suite para Illustrator (CEP).
 *
 * A divisao e a mesma do plugin do Photoshop: o painel le o formulario,
 * o nucleo compartilhado calcula o plano, e o ExtendScript (host/carrossel.jsx)
 * mexe no documento. A unica parte especifica daqui e a remocao de fundo,
 * que fala com o servico local em 127.0.0.1.
 */

(function () {
  'use strict';

  const core = window.CarrosselCore;
  const { chamar, escolherPasta } = window.CEP;
  const SERVICO = 'http://127.0.0.1:8765';

  const $ = (id) => document.getElementById(id);
  let planoAtual = null;

  /* ---------- formulario ---------- */

  function popularFormatos() {
    const select = $('formato');
    for (const f of core.listFormats()) {
      const option = document.createElement('option');
      option.value = f.id;
      option.textContent = `${f.label} — ${f.width}x${f.height}`;
      select.appendChild(option);
    }
    select.value = 'ig-4x5';
  }

  function lerFormulario() {
    return {
      name: $('nome').value.trim() || 'carrossel',
      format: $('formato').value,
      slides: parseInt($('paginas').value, 10) || 1,
      mode: $('modo').value,
      gutter: parseFloat($('respiro').value) || 0,
      bleed: parseFloat($('sangria').value) || 0,
      scale: parseFloat($('escala').value) || 1
    };
  }

  function montarPlano() {
    const plano = core.planCarousel(lerFormulario());
    core.applyNames(plano, $('padrao').value.trim());
    planoAtual = plano;
    atualizarResumo(plano);
    return plano;
  }

  function atualizarResumo(plano) {
    const tela = `${Math.round(plano.canvas.width)} x ${Math.round(plano.canvas.height)} px`;
    const fatia = `${Math.round(plano.format.width * plano.scale)} x ${Math.round(plano.format.height * plano.scale)} px`;
    $('resumo').textContent = `Prancheta: ${tela} · ${plano.slides} página(s) · cada página sai em ${fatia}`;
    if (plano.warnings.length) mostrar(plano.warnings.map((w) => `⚠ ${w}`).join('\n'), 'aviso');
  }

  /* ---------- status ---------- */

  function mostrar(texto, classe = '') {
    const box = $('status');
    box.textContent = texto;
    box.className = `status ${classe}`;
  }

  function comErro(fn) {
    return async () => {
      try {
        await fn();
      } catch (erro) {
        mostrar(`✕ ${erro && erro.message ? erro.message : erro}`, 'erro');
        console.error(erro);
      }
    };
  }

  /* ---------- acoes de layout ---------- */

  async function criar() {
    const plano = montarPlano();
    const r = await chamar('carrosselCriar', plano);
    mostrar(`✓ Documento criado com ${r.pranchetas} prancheta(s).`, 'ok');
  }

  async function fatiar() {
    const doc = await chamar('carrosselLerDocumento');
    // fatiamos a prancheta ativa, nao a primeira: o designer pode ter varias
    const ativa = doc.pranchetas[doc.ativa] || doc.pranchetas[0];
    if (!ativa) throw new Error('O documento não tem prancheta.');

    const base = lerFormulario();
    const larguraPagina = core.resolveFormat(base.format).width;
    const plano = core.planFromExistingCanvas({
      canvasWidth: ativa.width,
      canvasHeight: ativa.height,
      slideWidth: larguraPagina,
      gutter: base.gutter,
      bleed: base.bleed,
      scale: base.scale,
      name: base.name
    });
    core.applyNames(plano, $('padrao').value.trim());

    // O núcleo planeja a partir de (0,0). A prancheta lida pode estar em
    // qualquer canto do documento, então deslocamos páginas e guias juntas —
    // se só as páginas andassem, as guias cairiam no lugar errado.
    core.offsetPlan(plano, ativa.x, ativa.y);
    plano.indiceOriginal = ativa.indice;
    plano.removerOriginal = $('removerOriginal').checked;
    planoAtual = plano;
    $('paginas').value = plano.slides;
    atualizarResumo(plano);

    const r = await chamar('carrosselFatiar', plano);
    mostrar(
      `✓ ${plano.slides} páginas criadas (documento agora tem ${r.pranchetas} pranchetas).` +
        (plano.warnings.length ? `\n⚠ ${plano.warnings.join('\n⚠ ')}` : ''),
      plano.warnings.length ? 'aviso' : 'ok'
    );
  }

  async function conferirEmendas() {
    const plano = planoAtual || montarPlano();
    const itens = await chamar('carrosselLerObjetos');
    const achados = core.findCrossings(itens, plano);
    if (!achados.length) {
      mostrar('✓ Nenhum elemento crítico em cima das emendas.', 'ok');
      return;
    }
    const erros = achados.filter((a) => a.severity === 'error');
    mostrar(
      achados.map((a) => `${a.severity === 'error' ? '✕' : '·'} ${a.message}`).join('\n'),
      erros.length ? 'erro' : ''
    );
  }

  async function exportar() {
    const plano = planoAtual || montarPlano();
    const pasta = escolherPasta('Onde salvar as páginas do carrossel');
    if (!pasta) return;

    const doc = await chamar('carrosselLerDocumento');
    plano.exportar = {
      pasta,
      formato: $('saida').value,
      intervalo: intervaloDasPaginas(doc, plano),
      escala: plano.scale,
      qualidade: parseInt($('qualidade').value, 10) || 90,
      prefixo: ''
    };

    mostrar('Exportando…');
    const r = await chamar('carrosselExportar', plano);
    mostrar(`✓ Exportado por ${r.metodo} em:\n${r.pasta || r.arquivo}`, 'ok');
  }

  /**
   * Monta o intervalo "3-7" que o Illustrator espera, a partir dos nomes
   * das paginas do plano. Se os nomes nao baterem, exporta todas.
   */
  function intervaloDasPaginas(doc, plano) {
    const nomes = new Set(plano.pages.map((p) => p.name));
    const indices = doc.pranchetas
      .filter((a) => nomes.has(a.nome))
      .map((a) => a.indice + 1)
      .sort((a, b) => a - b);
    if (!indices.length) return `1-${doc.pranchetas.length}`;
    return comprimirIntervalo(indices);
  }

  function comprimirIntervalo(indices) {
    const blocos = [];
    let inicio = indices[0];
    let anterior = indices[0];
    for (let i = 1; i <= indices.length; i++) {
      const atual = indices[i];
      if (atual !== anterior + 1) {
        blocos.push(inicio === anterior ? `${inicio}` : `${inicio}-${anterior}`);
        inicio = atual;
      }
      anterior = atual;
    }
    return blocos.join(',');
  }

  /* ---------- remocao de fundo ---------- */

  async function verificarServico() {
    try {
      const r = await fetch(`${SERVICO}/saude`, { method: 'GET' });
      const dados = await r.json();
      $('servico').textContent = `Serviço local: ativo (${dados.modelos.length} modelo(s) disponível(is)).`;
      return true;
    } catch (erro) {
      $('servico').textContent =
        'Serviço local: desligado. Rode "python tools/bgremove/servidor.py" — veja docs/03-remocao-de-fundo.md.';
      return false;
    }
  }

  async function removerFundoSelecionada() {
    if (!(await verificarServico())) {
      throw new Error('O serviço local de remoção de fundo não está rodando.');
    }
    const imagem = await chamar('carrosselImagemSelecionada');
    mostrar(`Removendo fundo de ${imagem.nome}…`);
    const recorte = await pedirRecorte(imagem.arquivo);
    await chamar('carrosselReligarImagem', { arquivo: recorte });
    mostrar(`✓ Fundo removido. A imagem agora aponta para:\n${recorte}`, 'ok');
  }

  async function removerFundoDeArquivo() {
    if (!(await verificarServico())) {
      throw new Error('O serviço local de remoção de fundo não está rodando.');
    }
    const cep = window.cep;
    const escolha = cep.fs.showOpenDialog(false, false, 'Escolha a imagem', '', ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'webp']);
    if (escolha.err !== 0 || !escolha.data || !escolha.data.length) return;

    mostrar('Removendo fundo…');
    const recorte = await pedirRecorte(escolha.data[0]);
    await chamar('carrosselColocarImagem', { arquivo: recorte, x: 0, y: 0 });
    mostrar(`✓ Imagem recortada colocada no documento:\n${recorte}`, 'ok');
  }

  async function pedirRecorte(caminho) {
    const resposta = await fetch(`${SERVICO}/remover-fundo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caminho,
        modelo: $('modelo').value,
        alpha_matting: $('alfaMatting').checked
      })
    });
    const dados = await resposta.json();
    if (!resposta.ok || dados.erro) throw new Error(dados.erro || `Serviço respondeu ${resposta.status}.`);
    return dados.saida;
  }

  /* ---------- ligacao ---------- */

  popularFormatos();
  montarPlano();
  verificarServico();

  for (const id of ['nome', 'formato', 'paginas', 'modo', 'respiro', 'sangria', 'escala', 'padrao']) {
    $(id).addEventListener('change', comErro(async () => montarPlano()));
  }

  $('criar').addEventListener('click', comErro(criar));
  $('fatiar').addEventListener('click', comErro(fatiar));
  $('emendas').addEventListener('click', comErro(conferirEmendas));
  $('exportar').addEventListener('click', comErro(exportar));
  $('fundo').addEventListener('click', comErro(removerFundoSelecionada));
  $('fundoArquivo').addEventListener('click', comErro(removerFundoDeArquivo));
})();
