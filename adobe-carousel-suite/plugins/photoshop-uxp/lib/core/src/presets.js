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
