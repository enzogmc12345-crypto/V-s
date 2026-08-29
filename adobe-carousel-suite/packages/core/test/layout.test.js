const test = require('node:test');
const assert = require('node:assert');
const { planCarousel, planFromExistingCanvas } = require('../src/layout');

test('carrossel continuo de 5 paginas em 4:5 monta uma tela de 5400x1350', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 5 });
  assert.equal(plan.canvas.width, 5400);
  assert.equal(plan.canvas.height, 1350);
  assert.equal(plan.pages.length, 5);
});

test('as paginas sao contiguas: o fim de uma e o inicio da seguinte', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 4 });
  for (let i = 1; i < plan.pages.length; i++) {
    const anterior = plan.pages[i - 1];
    const atual = plan.pages[i];
    assert.equal(anterior.x + anterior.width, atual.x, `emenda ${i} tem folga`);
  }
});

test('sem respiro, a soma das fatias cobre a tela inteira sem sobra', () => {
  const plan = planCarousel({ format: 'ig-1x1', slides: 7 });
  const soma = plan.pages.reduce((acc, p) => acc + p.width, 0);
  assert.equal(soma, plan.canvas.width);
});

test('respiro entra na tela mas nao na fatia exportada', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 3, gutter: 100 });
  assert.equal(plan.canvas.width, 3 * 1080 + 2 * 100);
  assert.equal(plan.pitch, 1180);
  assert.deepEqual(
    plan.pages.map((p) => p.x),
    [0, 1180, 2360]
  );
  for (const page of plan.pages) assert.equal(page.width, 1080);
});

test('a sangria nunca sai da tela', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 3, bleed: 40 });
  const primeira = plan.pages[0];
  const ultima = plan.pages[2];
  assert.equal(primeira.export.x, 0, 'a primeira pagina nao pode exportar x negativo');
  assert.equal(primeira.export.width, 1080 + 40, 'sangria so do lado interno');
  assert.equal(ultima.export.x + ultima.export.width, plan.canvas.width);
  assert.equal(plan.pages[1].export.width, 1080 + 80, 'pagina do meio sangra dos dois lados');
});

test('area segura respeita as margens do preset em cada pagina', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 2 });
  const segunda = plan.pages[1].safe;
  assert.equal(segunda.x, 1080 + 60);
  assert.equal(segunda.y, 60);
  assert.equal(segunda.width, 1080 - 120);
  assert.equal(segunda.height, 1350 - 60 - 160);
});

test('guias marcam os dois lados de cada corte', () => {
  const plan = planCarousel({ format: 'ig-1x1', slides: 3 });
  for (const x of [0, 1080, 2160, 3240]) {
    assert.ok(plan.guides.vertical.includes(x), `falta guia em x=${x}`);
  }
});

test('numeracao pode comecar em outro numero (continuar um carrossel)', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 3, startIndex: 4 });
  assert.deepEqual(plan.pages.map((p) => p.number), [4, 5, 6]);
});

test('passar do limite de paginas da rede vira aviso, nao erro', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 25 });
  assert.equal(plan.pages.length, 25);
  assert.ok(plan.warnings.some((w) => w.includes('20 paginas')));
});

test('respiro no modo continuo avisa que a arte no respiro se perde', () => {
  const plan = planCarousel({ format: 'ig-4x5', slides: 3, gutter: 80, mode: 'continuous' });
  assert.ok(plan.warnings.some((w) => w.includes('respiro')));
});

test('formato personalizado e aceito', () => {
  const plan = planCarousel({ format: { width: 1200, height: 1500 }, slides: 2 });
  assert.equal(plan.canvas.width, 2400);
  assert.equal(plan.format.id, 'custom');
});

test('fatiar prancheta existente descobre o numero de paginas pela largura', () => {
  const plan = planFromExistingCanvas({ canvasWidth: 6480, canvasHeight: 1350, slideWidth: 1080 });
  assert.equal(plan.slides, 6);
  assert.equal(plan.warnings.filter((w) => w.includes('diferenca')).length, 0);
});

test('fatiar prancheta existente com respiro descobre o numero certo', () => {
  const plan = planFromExistingCanvas({
    canvasWidth: 5 * 1080 + 4 * 120,
    canvasHeight: 1350,
    slideWidth: 1080,
    gutter: 120
  });
  assert.equal(plan.slides, 5);
});

test('prancheta com sobra avisa quantos px ficam de fora', () => {
  const plan = planFromExistingCanvas({ canvasWidth: 6500, canvasHeight: 1350, slideWidth: 1080 });
  assert.equal(plan.slides, 6);
  assert.ok(plan.warnings.some((w) => w.includes('diferenca')));
});

test('fatiar por numero de paginas divide a largura igualmente', () => {
  const plan = planFromExistingCanvas({ canvasWidth: 4320, canvasHeight: 1080, slides: 4 });
  assert.equal(plan.format.width, 1080);
  assert.equal(plan.pages[3].x, 3240);
});

test('deslocar o plano move paginas e guias juntas', () => {
  const { offsetPlan } = require('../src/layout');
  const plan = offsetPlan(planCarousel({ format: 'ig-4x5', slides: 3 }), 500, 200);

  assert.deepEqual(plan.origin, { x: 500, y: 200 });
  assert.equal(plan.pages[0].x, 500);
  assert.equal(plan.pages[0].y, 200);
  assert.equal(plan.pages[2].x, 500 + 2160);
  assert.equal(plan.pages[0].safe.x, 500 + 60);
  assert.equal(plan.pages[0].export.x, 500);
  // a guia do primeiro corte tem que acompanhar a pagina, senao corta errado
  assert.ok(plan.guides.vertical.includes(500 + 1080));
  assert.ok(plan.guides.horizontal.includes(200 + 60));
});

test('deslocar por zero nao mexe em nada, mas registra a origem', () => {
  const { offsetPlan } = require('../src/layout');
  const base = planCarousel({ format: 'ig-1x1', slides: 2 });
  const antes = JSON.stringify(base.pages);
  const plan = offsetPlan(base, 0, 0);
  assert.equal(JSON.stringify(plan.pages), antes);
  assert.deepEqual(plan.origin, { x: 0, y: 0 });
});

test('depois de deslocar, as paginas continuam contiguas', () => {
  const { offsetPlan } = require('../src/layout');
  const plan = offsetPlan(planCarousel({ format: 'ig-4x5', slides: 4 }), 337, -91);
  for (let i = 1; i < plan.pages.length; i++) {
    assert.equal(plan.pages[i - 1].x + plan.pages[i - 1].width, plan.pages[i].x);
  }
});
