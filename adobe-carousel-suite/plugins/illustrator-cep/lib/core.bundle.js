// GERADO POR scripts/build.mjs - NAO EDITE. Fonte: packages/core/
/**
 * Nucleo do carrossel empacotado para o painel CEP.
 * Expoe window.CarrosselCore. Os modulos tem nomes unicos, entao o
 * require interno resolve pelo nome do arquivo, sem caminho.
 */
(function (global) {
  'use strict';
  var fabricas = {};
  var cache = {};

  function registrar(id, fabrica) {
    fabricas[id] = fabrica;
  }

  function require(caminho) {
    var id = String(caminho).replace(/^.*\//, '').replace(/\.js$/, '');
    if (cache[id]) return cache[id].exports;
    if (!fabricas[id]) throw new Error('Modulo nao encontrado no bundle: ' + caminho);
    var module = { exports: {} };
    cache[id] = module;
    fabricas[id](module, module.exports, require);
    return module.exports;
  }

  registrar("presets", function (module, exports, require) {
/**
 * Presets de formato para carrossel e post.
 *
 * Todas as medidas em PIXELS a 72 dpi (1 px = 1 pt no Illustrator),
 * que e a base usada tanto pelo Photoshop quanto pelo Illustrator.
 * A exportacao em @2x/@3x e feita por escala, nunca mudando o preset.
 */

/**
 * safe = area de respiro onde a interface do app (legenda, bolinhas de
 * paginacao, botoes) pode cobrir a arte. Nao e recorte: e guia visual.
 */
const FORMATS = {
  'ig-4x5': {
    id: 'ig-4x5',
    label: 'Instagram / Feed 4:5 (retrato)',
    width: 1080,
    height: 1350,
    safe: { top: 60, right: 60, bottom: 160, left: 60 },
    maxSlides: 20,
    note: 'Formato de maior area no feed. Padrao recomendado para carrossel.'
  },
  'ig-1x1': {
    id: 'ig-1x1',
    label: 'Instagram / Feed 1:1 (quadrado)',
    width: 1080,
    height: 1080,
    safe: { top: 60, right: 60, bottom: 140, left: 60 },
    maxSlides: 20,
    note: 'Mais seguro quando o carrossel mistura foto e video.'
  },
  'ig-9x16': {
    id: 'ig-9x16',
    label: 'Instagram / Stories e Reels 9:16',
    width: 1080,
    height: 1920,
    safe: { top: 250, right: 60, bottom: 340, left: 60 },
    maxSlides: 1,
    note: 'A interface cobre topo e base; respeite a area segura.'
  },
  'li-4x5': {
    id: 'li-4x5',
    label: 'LinkedIn / Carrossel 4:5',
    width: 1080,
    height: 1350,
    safe: { top: 60, right: 60, bottom: 120, left: 60 },
    maxSlides: 20,
    note: 'O LinkedIn distribui carrossel como PDF; exporte tambem em PDF.'
  },
  'li-1x1': {
    id: 'li-1x1',
    label: 'LinkedIn / Carrossel 1:1',
    width: 1080,
    height: 1080,
    safe: { top: 60, right: 60, bottom: 120, left: 60 },
    maxSlides: 20,
    note: null
  },
  'tt-9x16': {
    id: 'tt-9x16',
    label: 'TikTok / Carrossel 9:16',
    width: 1080,
    height: 1920,
    safe: { top: 200, right: 120, bottom: 480, left: 60 },
    maxSlides: 35,
    note: 'A base tem muita interface (legenda, botoes laterais).'
  },
  'print-a4': {
    id: 'print-a4',
    label: 'A4 retrato (impresso, 300 dpi)',
    width: 2480,
    height: 3508,
    safe: { top: 118, right: 118, bottom: 118, left: 118 },
    maxSlides: 1,
    note: 'A4 a 300 dpi. Use sangria de 3 mm (~35 px) na exportacao.'
  }
};

const DEFAULT_FORMAT = 'ig-4x5';

/** Lista para popular <select> no painel. */
function listFormats() {
  return Object.values(FORMATS).map((f) => ({
    id: f.id,
    label: f.label,
    width: f.width,
    height: f.height,
    maxSlides: f.maxSlides
  }));
}

/**
 * Resolve um formato a partir do id, ou a partir de medidas livres.
 * @param {string|{width:number,height:number,label?:string}} input
 */
function resolveFormat(input) {
  if (!input) return FORMATS[DEFAULT_FORMAT];
  if (typeof input === 'string') {
    const found = FORMATS[input];
    if (!found) throw new Error(`Formato desconhecido: "${input}"`);
    return found;
  }
  const { width, height } = input;
  if (!isFinite(width) || !isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Formato personalizado precisa de width e height positivos.');
  }
  return {
    id: 'custom',
    label: input.label || `Personalizado ${Math.round(width)}x${Math.round(height)}`,
    width,
    height,
    safe: input.safe || { top: 0, right: 0, bottom: 0, left: 0 },
    maxSlides: input.maxSlides || 60,
    note: null
  };
}

module.exports = { FORMATS, DEFAULT_FORMAT, listFormats, resolveFormat };

  });

  registrar("layout", function (module, exports, require) {
/**
 * Calculo do layout do carrossel.
 *
 * Sistema de coordenadas: origem no canto superior esquerdo do documento,
 * eixo Y crescendo para baixo (convencao do Photoshop). A camada do
 * Illustrator converte para o eixo Y do artboard (que cresce para cima).
 *
 * Dois modos:
 *  - 'continuous': UMA prancheta larga (N x largura). A arte atravessa as
 *    paginas; o corte e feito na exportacao. E o modo que permite uma foto
 *    comecar na pagina 1 e terminar na 2.
 *  - 'pages': UMA prancheta por pagina, lado a lado. Melhor quando cada
 *    slide e independente.
 *
 * 'gutter' e um respiro de trabalho entre paginas na tela. Ele NAO e
 * exportado: as fatias sempre saem com a largura exata do formato.
 */

const { resolveFormat } = require('./presets');

const MAX_CANVAS_PX = 30000; // limite pratico de trabalho, bem abaixo do teto do PS

function clampRect(rect, bounds) {
  const left = Math.max(rect.x, bounds.x);
  const top = Math.max(rect.y, bounds.y);
  const right = Math.min(rect.x + rect.width, bounds.x + bounds.width);
  const bottom = Math.min(rect.y + rect.height, bounds.y + bounds.height);
  return { x: left, y: top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}

/**
 * @param {object} opts
 * @param {string|object} opts.format      id do preset ou {width,height}
 * @param {number} opts.slides             quantidade de paginas (>= 1)
 * @param {'continuous'|'pages'} [opts.mode='continuous']
 * @param {number} [opts.gutter=0]         respiro visual entre paginas (px)
 * @param {number} [opts.bleed=0]          sangria na exportacao (px)
 * @param {number} [opts.scale=1]          fator de exportacao (1, 2, 3...)
 * @param {number} [opts.startIndex=1]     numero da primeira pagina
 * @param {string} [opts.name='carrossel'] nome base do projeto
 */
function planCarousel(opts = {}) {
  const format = resolveFormat(opts.format);
  const mode = opts.mode === 'pages' ? 'pages' : 'continuous';
  const slides = Math.max(1, Math.round(opts.slides ?? 1));
  const gutter = Math.max(0, opts.gutter ?? 0);
  const bleed = Math.max(0, opts.bleed ?? 0);
  const scale = opts.scale > 0 ? opts.scale : 1;
  const startIndex = opts.startIndex ?? 1;
  const name = opts.name || 'carrossel';

  const pw = format.width;
  const ph = format.height;
  const pitch = pw + gutter;

  const canvas = {
    width: slides * pw + Math.max(0, slides - 1) * gutter,
    height: ph
  };

  const pages = [];
  for (let i = 0; i < slides; i++) {
    const x = i * pitch;
    const cut = { x, y: 0, width: pw, height: ph };
    const withBleed = {
      x: x - bleed,
      y: -bleed,
      width: pw + bleed * 2,
      height: ph + bleed * 2
    };
    pages.push({
      index: i,
      number: startIndex + i,
      name: null, // preenchido por naming.applyNames
      ...cut,
      cut,
      // area realmente exportada, sempre dentro do documento
      export: clampRect(withBleed, { x: 0, y: 0, width: canvas.width, height: canvas.height }),
      safe: {
        x: x + format.safe.left,
        y: format.safe.top,
        width: pw - format.safe.left - format.safe.right,
        height: ph - format.safe.top - format.safe.bottom
      }
    });
  }

  // Guias: linhas de corte + area segura da primeira pagina replicada
  const vertical = [];
  const horizontal = [format.safe.top, ph - format.safe.bottom];
  for (let i = 0; i < slides; i++) {
    const x = i * pitch;
    vertical.push(x);
    vertical.push(x + pw);
    if (format.safe.left) vertical.push(x + format.safe.left);
    if (format.safe.right) vertical.push(x + pw - format.safe.right);
  }

  const warnings = [];
  if (format.maxSlides && slides > format.maxSlides) {
    warnings.push(
      `${format.label} aceita no maximo ${format.maxSlides} paginas; voce pediu ${slides}.`
    );
  }
  if (canvas.width * scale > MAX_CANVAS_PX) {
    warnings.push(
      `A tela final ficaria com ${Math.round(canvas.width * scale)} px de largura. ` +
        `Acima de ${MAX_CANVAS_PX} px o arquivo fica pesado; considere dividir em dois documentos.`
    );
  }
  if (mode === 'continuous' && gutter > 0) {
    warnings.push(
      'No modo continuo o respiro entre paginas nao e exportado: qualquer arte ' +
        'desenhada dentro dele some no corte. Use respiro 0 para arte que atravessa paginas.'
    );
  }
  if (mode === 'continuous' && bleed > 0 && slides > 1) {
    warnings.push(
      'Sangria no modo continuo repete pixels da pagina vizinha nas bordas internas. ' +
        'Para redes sociais use sangria 0.'
    );
  }

  return {
    name,
    format,
    mode,
    slides,
    gutter,
    bleed,
    scale,
    pitch,
    canvas,
    pages,
    guides: { vertical: dedupe(vertical), horizontal: dedupe(horizontal) },
    warnings
  };
}

/**
 * Le uma prancheta larga que ja existe e descobre quantas paginas cabem.
 * Usado pelo botao "Fatiar esta prancheta".
 */
function planFromExistingCanvas(opts = {}) {
  const { canvasWidth, canvasHeight } = opts;
  if (!(canvasWidth > 0) || !(canvasHeight > 0)) {
    throw new Error('canvasWidth e canvasHeight sao obrigatorios.');
  }
  const gutter = Math.max(0, opts.gutter ?? 0);
  const slideWidth = opts.slideWidth > 0 ? opts.slideWidth : null;
  const slideHeight = opts.slideHeight > 0 ? opts.slideHeight : canvasHeight;

  let slides;
  let pw;
  if (slideWidth) {
    pw = slideWidth;
    slides = Math.max(1, Math.round((canvasWidth + gutter) / (pw + gutter)));
  } else {
    slides = Math.max(1, Math.round(opts.slides ?? 1));
    pw = (canvasWidth - Math.max(0, slides - 1) * gutter) / slides;
  }

  const plan = planCarousel({
    ...opts,
    format: { width: pw, height: slideHeight, label: 'Prancheta existente', safe: opts.safe },
    slides,
    gutter
  });

  const drift = canvasWidth - plan.canvas.width;
  if (Math.abs(drift) > 0.5) {
    plan.warnings.push(
      `A prancheta tem ${round2(canvasWidth)} px, mas ${slides} paginas de ` +
        `${round2(pw)} px somam ${round2(plan.canvas.width)} px ` +
        `(diferenca de ${round2(drift)} px). As fatias saem no tamanho exato do formato; ` +
        'a sobra fica de fora.'
    );
  }
  plan.source = { canvasWidth, canvasHeight, drift };
  return plan;
}

/**
 * Move um plano inteiro para outro canto do documento.
 *
 * O planejamento sempre nasce em (0,0). Quando as paginas vao por cima de
 * uma prancheta que esta em outro lugar (caso do Illustrator, onde o
 * documento pode ter varias), paginas E guias precisam andar juntas: se so
 * as paginas andassem, as guias cairiam no lugar errado.
 */
function offsetPlan(plan, dx = 0, dy = 0) {
  plan.origin = { x: dx, y: dy };
  if (!dx && !dy) return plan;

  for (const page of plan.pages) {
    for (const rect of [page, page.cut, page.export, page.safe]) {
      rect.x += dx;
      rect.y += dy;
    }
  }
  plan.guides.vertical = plan.guides.vertical.map((x) => round2(x + dx));
  plan.guides.horizontal = plan.guides.horizontal.map((y) => round2(y + dy));
  return plan;
}

function dedupe(values) {
  return [...new Set(values.map((v) => round2(v)))].sort((a, b) => a - b);
}

function round2(v) {
  return Math.round(v * 100) / 100;
}

module.exports = { planCarousel, planFromExistingCanvas, offsetPlan, MAX_CANVAS_PX, clampRect, round2 };

  });

  registrar("naming", function (module, exports, require) {
/**
 * Nomes de prancheta e de arquivo exportado.
 *
 * Tokens aceitos no padrao:
 *   {projeto} {n} {nn} {nnn} {total} {formato} {escala} {data}
 *
 * O zero a esquerda importa: sem ele o Instagram e o Finder ordenam
 * 1, 10, 11, 2 ... e o carrossel sobe fora de ordem.
 */

const DEFAULT_PATTERN = '{projeto}_{nn}';

function pad(value, size) {
  return String(value).padStart(size, '0');
}

function sanitize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // acentos
    .replace(/[^a-zA-Z0-9._-]+/g, '-')    // qualquer coisa que quebre em disco
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function formatDate(date = new Date()) {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1, 2);
  const d = pad(date.getDate(), 2);
  return `${y}-${m}-${d}`;
}

/**
 * @param {string} pattern
 * @param {object} ctx {projeto, number, total, formato, escala, date}
 */
function buildName(pattern, ctx = {}) {
  const p = pattern || DEFAULT_PATTERN;
  const n = ctx.number ?? 1;
  const out = p
    .replace(/\{projeto\}/gi, ctx.projeto ?? 'carrossel')
    .replace(/\{nnn\}/gi, pad(n, 3))
    .replace(/\{nn\}/gi, pad(n, 2))
    .replace(/\{n\}/gi, String(n))
    .replace(/\{total\}/gi, String(ctx.total ?? 1))
    .replace(/\{formato\}/gi, ctx.formato ?? '')
    .replace(/\{escala\}/gi, ctx.escala && ctx.escala !== 1 ? `@${ctx.escala}x` : '')
    .replace(/\{data\}/gi, formatDate(ctx.date));
  return sanitize(out) || 'pagina';
}

/** Preenche plan.pages[].name a partir do padrao. Devolve o proprio plano. */
function applyNames(plan, pattern = DEFAULT_PATTERN) {
  const used = new Map();
  for (const page of plan.pages) {
    let base = buildName(pattern, {
      projeto: plan.name,
      number: page.number,
      total: plan.slides,
      formato: plan.format.id,
      escala: plan.scale
    });
    // colisao de nome sobrescreve arquivo em disco sem avisar: evitamos aqui
    if (used.has(base)) {
      const next = used.get(base) + 1;
      used.set(base, next);
      base = `${base}-${next}`;
    } else {
      used.set(base, 1);
    }
    page.name = base;
  }
  return plan;
}

module.exports = { DEFAULT_PATTERN, buildName, applyNames, sanitize, pad };

  });

  registrar("seams", function (module, exports, require) {
/**
 * Conferencia de emendas.
 *
 * No carrossel continuo a arte atravessa o corte de proposito. O problema
 * nao e atravessar: e atravessar o que nao pode ser cortado - rosto, logo,
 * palavra, CTA. Esta funcao recebe os retangulos dos objetos do documento
 * e aponta quem cruza uma linha de corte, para o painel avisar antes de
 * exportar.
 */

/** Linhas de corte de um plano (fim de cada pagina, exceto a ultima). */
function cutLines(plan) {
  const lines = [];
  for (let i = 0; i < plan.pages.length - 1; i++) {
    const page = plan.pages[i];
    lines.push(page.x + page.width);
    if (plan.gutter > 0) lines.push(page.x + page.width + plan.gutter);
  }
  return lines;
}

/**
 * @param {Array<{name?:string,kind?:string,x:number,y:number,width:number,height:number,critical?:boolean}>} items
 * @param {object} plan
 * @param {object} [opts]
 * @param {number} [opts.tolerance=1] folga em px para encostar sem contar como cruzamento
 * @param {string[]} [opts.criticalKinds] tipos que nunca deveriam ser cortados
 */
function findCrossings(items = [], plan, opts = {}) {
  const tolerance = opts.tolerance ?? 1;
  const criticalKinds = opts.criticalKinds ?? ['text', 'texto', 'logo', 'cta', 'face', 'rosto'];
  const lines = cutLines(plan);
  const results = [];

  for (const item of items) {
    const left = item.x;
    const right = item.x + item.width;
    const crossed = lines.filter((line) => left < line - tolerance && right > line + tolerance);
    if (!crossed.length) continue;

    const isCritical =
      item.critical === true ||
      (item.critical !== false && criticalKinds.includes(String(item.kind || '').toLowerCase()));

    results.push({
      item,
      lines: crossed,
      severity: isCritical ? 'error' : 'info',
      message: isCritical
        ? `"${item.name || item.kind || 'objeto'}" e cortado pela emenda em x=${crossed.join(', ')}. ` +
          'Mova para dentro de uma pagina.'
        : `"${item.name || item.kind || 'objeto'}" atravessa a emenda em x=${crossed.join(', ')} ` +
          '(pode ser intencional).'
    });
  }

  // dentro da area segura? so vale para itens criticos
  return results;
}

/** Um item esta inteiramente dentro da area segura da sua pagina? */
function inSafeArea(item, plan) {
  const page = plan.pages.find(
    (p) => item.x >= p.x - 0.5 && item.x + item.width <= p.x + p.width + 0.5
  );
  if (!page) return null;
  const s = page.safe;
  return (
    item.x >= s.x &&
    item.y >= s.y &&
    item.x + item.width <= s.x + s.width &&
    item.y + item.height <= s.y + s.height
  );
}

module.exports = { cutLines, findCrossings, inSafeArea };

  });

  registrar("index", function (module, exports, require) {
/**
 * Nucleo compartilhado entre o plugin do Photoshop (UXP) e o do
 * Illustrator (CEP). Nao importa nada de host: e JavaScript puro,
 * roda no Node (testes), no UXP e no Chromium do CEP.
 */
const presets = require('./src/presets');
const layout = require('./src/layout');
const naming = require('./src/naming');
const seams = require('./src/seams');

module.exports = { ...presets, ...layout, ...naming, ...seams };

  });

  global.CarrosselCore = require('index');
})(typeof window !== 'undefined' ? window : this);
