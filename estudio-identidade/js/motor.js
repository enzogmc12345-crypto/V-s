/* ============================================================
   MOTOR — cor, contraste e afinidade
   A afinidade é o coração: o cliente descreve o mundo dele em
   eixos, e cada opção do acervo é ranqueada por proximidade.
   ============================================================ */

/* ---------- COR ---------- */
function hexRgb(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

function rgbHex(r, g, b) {
  const t = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + t(r) + t(g) + t(b);
}

function hexHsl(hex) {
  let [r, g, b] = hexRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = (h * 60 + 360) % 360;
  const l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  return [h, s * 100, l * 100];
}

function hslHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

function clarear(hex, qtd) { const [h, s, l] = hexHsl(hex); return hslHex(h, s, Math.min(100, l + qtd)); }
function escurecer(hex, qtd) { const [h, s, l] = hexHsl(hex); return hslHex(h, s, Math.max(0, l - qtd)); }
function dessaturar(hex, qtd) { const [h, s, l] = hexHsl(hex); return hslHex(h, Math.max(0, s - qtd), l); }

function misturar(a, b, t) {
  const [r1, g1, b1] = hexRgb(a), [r2, g2, b2] = hexRgb(b);
  return rgbHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function luminancia(hex) {
  const [r, g, b] = hexRgb(hex).map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a, b) {
  const l1 = luminancia(a), l2 = luminancia(b);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
}

/* Preto ou branco — o que for legível sobre a cor dada. */
function tintaLegivel(hex) { return contraste(hex, '#000000') >= contraste(hex, '#FFFFFF') ? '#000000' : '#FFFFFF'; }

/* Nota de acessibilidade de um par de cores. */
function notaContraste(a, b) {
  const c = contraste(a, b);
  if (c >= 7) return { razao: c, nota: 'AAA', ok: true };
  if (c >= 4.5) return { razao: c, nota: 'AA', ok: true };
  if (c >= 3) return { razao: c, nota: 'AA grande', ok: true };
  return { razao: c, nota: 'insuficiente', ok: false };
}

/* Atalhos de papel dentro da paleta. */
function papel(paleta, letra) {
  const c = paleta.cores.find(x => x.r === letra);
  return c ? c.hex : '#000000';
}
function papeis(paleta) {
  return { base: papel(paleta, 'A'), tinta: papel(paleta, 'B'), destaque: papel(paleta, 'C'), apoio: papel(paleta, 'D') };
}

/* ---------- AFINIDADE ---------- */
const POLOS = {
  elegancia: ['despojamento', 'elegância'],
  densidade: ['minimalismo', 'densidade'],
  humor:     ['seriedade', 'alegria'],
  tempo:     ['referência antiga', 'modernidade'],
  origem:    ['feitura manual', 'precisão artificial'],
  energia:   ['calma', 'intensidade'],
  luz:       ['penumbra', 'luminosidade']
};

const ADJETIVOS = {
  elegancia: ['despojada', 'elegante'],
  densidade: ['minimalista', 'densa'],
  humor:     ['séria', 'alegre'],
  tempo:     ['antiga', 'moderna'],
  origem:    ['artesanal', 'artificial'],
  energia:   ['calma', 'intensa'],
  luz:       ['sombria', 'luminosa']
};

/* Quanto mais o usuário puxa um eixo para a ponta, mais aquele
   eixo pesa na conta. Indiferença (50) quase não conta. */
function peso(valorUsuario) { return 0.4 + (Math.abs(valorUsuario - 50) / 50) * 1.6; }

function afinidade(perfil, vetor) {
  let soma = 0, pesos = 0;
  for (const eixo in perfil) {
    if (!(eixo in vetor)) continue;
    const p = peso(vetor[eixo]);
    soma += p * Math.abs(perfil[eixo] - vetor[eixo]);
    pesos += p;
  }
  if (!pesos) return 50;
  return Math.max(0, Math.round(100 - (soma / pesos) * 1.25));
}

function ordenar(lista, vetor) {
  return lista
    .map(item => ({ ...item, score: afinidade(item.perfil, vetor) }))
    .sort((a, b) => b.score - a.score);
}

/* Por que este item apareceu no topo: no máximo duas razões,
   sempre onde o item é extremo e o cliente concorda. */
function motivo(perfil, vetor) {
  const razoes = [];
  for (const eixo in perfil) {
    if (!(eixo in vetor) || !POLOS[eixo]) continue;
    const v = perfil[eixo];
    const extremo = Math.abs(v - 50);
    const acordo = 100 - Math.abs(v - vetor[eixo]);
    if (extremo > 18 && acordo > 68) razoes.push({ texto: POLOS[eixo][v > 50 ? 1 : 0], forca: extremo + acordo });
  }
  razoes.sort((a, b) => b.forca - a.forca);
  return razoes.slice(0, 2).map(r => r.texto);
}

/* Os três adjetivos que resumem o vetor — vira o subtítulo da identidade. */
function adjetivosDoVetor(vetor, quantos = 3) {
  return Object.keys(ADJETIVOS)
    .map(eixo => ({ eixo, dist: Math.abs(vetor[eixo] - 50), adj: ADJETIVOS[eixo][vetor[eixo] > 50 ? 1 : 0] }))
    .filter(x => x.dist > 8)
    .sort((a, b) => b.dist - a.dist)
    .slice(0, quantos)
    .map(x => x.adj);
}

function frase(lista) {
  if (!lista.length) return 'equilibrada em todos os eixos';
  if (lista.length === 1) return lista[0];
  return lista.slice(0, -1).join(', ') + ' e ' + lista[lista.length - 1];
}
