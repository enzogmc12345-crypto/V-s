/**
 * Painel do Carrossel Suite para Photoshop (UXP).
 *
 * O painel so faz tres coisas: ler o formulario, pedir o plano ao nucleo
 * compartilhado e mandar o plano para os modulos que falam com o
 * Photoshop. Toda a matematica de layout mora em lib/core.
 */

const { entrypoints } = require('uxp');
const fsProvider = require('uxp').storage.localFileSystem;
const { app, core } = require('photoshop');

const {
  listFormats,
  resolveFormat,
  planCarousel,
  planFromExistingCanvas,
  applyNames,
  findCrossings
} = require('./lib/core');
const { createCarouselDocument, addGuides, clearGuides, tryCreateArtboards, readLayerRects } = require('./src/ps-doc');
const { exportPages } = require('./src/ps-export');
const { removeBackground, openSelectAndMask } = require('./src/ps-removebg');

entrypoints.setup({
  panels: {
    'carrossel.panel': {
      show() {}
    }
  }
});

const $ = (id) => document.getElementById(id);
let planoAtual = null;

/* ---------- formulario ---------- */

function popularFormatos() {
  const select = $('formato');
  for (const f of listFormats()) {
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
  const plano = planCarousel(lerFormulario());
  applyNames(plano, $('padrao').value.trim());
  planoAtual = plano;
  atualizarResumo(plano);
  return plano;
}

function atualizarResumo(plano) {
  const px = `${Math.round(plano.canvas.width)} x ${Math.round(plano.canvas.height)} px`;
  const saida = `${Math.round(plano.format.width * plano.scale)} x ${Math.round(plano.format.height * plano.scale)} px`;
  $('resumo').textContent = `Tela: ${px} · ${plano.slides} página(s) · cada fatia sai em ${saida}`;
  if (plano.warnings.length) mostrar(plano.warnings.map((w) => `⚠ ${w}`).join('\n'), 'aviso');
}

/* ---------- status ---------- */

function mostrar(texto, classe = '') {
  const box = $('status');
  box.textContent = texto;
  box.className = `status ${classe}`;
}

async function comErro(fn) {
  try {
    await fn();
  } catch (error) {
    const msg = error && error.message ? error.message : String(error);
    mostrar(`✕ ${msg}`, 'erro');
    console.error(error);
  }
}

/* ---------- acoes ---------- */

async function criarDocumento() {
  const plano = montarPlano();
  await core.executeAsModal(
    async () => {
      await createCarouselDocument(plano);
      if (plano.mode === 'pages') {
        const resultado = await tryCreateArtboards(plano);
        if (!resultado.ok) {
          mostrar(
            `Documento criado com guias. As pranchetas automáticas falharam nesta versão do Photoshop (${resultado.error}); ` +
              'o corte na exportação continua exato.',
            'aviso'
          );
          return;
        }
      }
      mostrar(`✓ Documento criado: ${plano.slides} páginas, ${Math.round(plano.canvas.width)} px de largura.`, 'ok');
    },
    { commandName: 'Criar carrossel' }
  );
}

async function aplicarGuias() {
  const plano = montarPlano();
  await core.executeAsModal(
    async () => {
      const doc = app.activeDocument;
      if (!doc) throw new Error('Abra um documento primeiro.');
      await clearGuides();
      await addGuides(doc, plano);
    },
    { commandName: 'Aplicar guias' }
  );
  mostrar('✓ Guias aplicadas.', 'ok');
}

function fatiarAtual() {
  const doc = app.activeDocument;
  if (!doc) throw new Error('Abra o documento com a arte antes de fatiar.');
  const base = lerFormulario();
  const plano = planFromExistingCanvas({
    canvasWidth: doc.width,
    canvasHeight: doc.height,
    slideWidth: resolveFormat(base.format).width,
    gutter: base.gutter,
    bleed: base.bleed,
    scale: base.scale,
    name: base.name
  });
  applyNames(plano, $('padrao').value.trim());
  planoAtual = plano;
  $('paginas').value = plano.slides;
  atualizarResumo(plano);
  mostrar(
    `✓ Prancheta de ${Math.round(doc.width)} px lida: ${plano.slides} páginas de ${Math.round(plano.format.width)} px.` +
      (plano.warnings.length ? `\n⚠ ${plano.warnings.join('\n⚠ ')}` : ''),
    plano.warnings.length ? 'aviso' : 'ok'
  );
}

function conferirEmendas() {
  const doc = app.activeDocument;
  if (!doc) throw new Error('Abra um documento primeiro.');
  const plano = planoAtual || montarPlano();
  const achados = findCrossings(readLayerRects(doc), plano);
  if (!achados.length) {
    mostrar('✓ Nenhum elemento crítico em cima das emendas.', 'ok');
    return;
  }
  const erros = achados.filter((a) => a.severity === 'error');
  mostrar(achados.map((a) => `${a.severity === 'error' ? '✕' : '·'} ${a.message}`).join('\n'), erros.length ? 'erro' : '');
}

async function exportar() {
  const plano = planoAtual || montarPlano();
  const pasta = await fsProvider.getFolder();
  if (!pasta) return;
  mostrar('Exportando…');
  const arquivos = await exportPages(plano, pasta, {
    format: $('saida').value,
    quality: parseInt($('qualidade').value, 10) || 90,
    onProgress: (feito, total, nome) => mostrar(`Exportando ${feito}/${total} — ${nome}`)
  });
  mostrar(`✓ ${arquivos.length} arquivo(s) em:\n${pasta.nativePath}`, 'ok');
}

async function tirarFundo(todas) {
  mostrar('Removendo fundo…');
  const relatorio = await removeBackground({
    allLayers: todas,
    trim: $('aparar').checked,
    refine: {
      contract: parseFloat($('contract').value) || 0,
      feather: parseFloat($('feather').value) || 0
    }
  });
  mostrar(
    `✓ ${relatorio.length} camada(s):\n` + relatorio.map((r) => `· ${r.layer} (${r.method})`).join('\n'),
    'ok'
  );
}

/* ---------- ligacao ---------- */

popularFormatos();
montarPlano();

for (const id of ['nome', 'formato', 'paginas', 'modo', 'respiro', 'sangria', 'escala', 'padrao']) {
  $(id).addEventListener('change', () => comErro(async () => montarPlano()));
}

$('criar').addEventListener('click', () => comErro(criarDocumento));
$('guias').addEventListener('click', () => comErro(aplicarGuias));
$('fatiar').addEventListener('click', () => comErro(async () => fatiarAtual()));
$('emendas').addEventListener('click', () => comErro(async () => conferirEmendas()));
$('exportar').addEventListener('click', () => comErro(exportar));
$('fundo').addEventListener('click', () => comErro(() => tirarFundo(false)));
$('fundoTodas').addEventListener('click', () => comErro(() => tirarFundo(true)));
$('refinar').addEventListener('click', () => comErro(openSelectAndMask));
