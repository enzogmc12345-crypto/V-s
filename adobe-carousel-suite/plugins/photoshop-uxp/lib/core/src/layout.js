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
