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
