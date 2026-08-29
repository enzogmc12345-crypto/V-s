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
