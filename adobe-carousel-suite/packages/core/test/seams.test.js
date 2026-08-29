const test = require('node:test');
const assert = require('node:assert');
const { planCarousel } = require('../src/layout');
const { cutLines, findCrossings, inSafeArea } = require('../src/seams');

const plan = planCarousel({ format: 'ig-4x5', slides: 3 });

test('as linhas de corte sao os fins das paginas, menos a ultima', () => {
  assert.deepEqual(cutLines(plan), [1080, 2160]);
});

test('foto que atravessa a emenda e apontada como informacao, nao erro', () => {
  const [achado] = findCrossings([{ name: 'foto', kind: 'image', x: 800, y: 0, width: 700, height: 1350 }], plan);
  assert.equal(achado.severity, 'info');
  assert.deepEqual(achado.lines, [1080]);
});

test('texto em cima da emenda e erro', () => {
  const [achado] = findCrossings([{ name: 'titulo', kind: 'text', x: 1000, y: 200, width: 300, height: 120 }], plan);
  assert.equal(achado.severity, 'error');
});

test('objeto encostado na emenda nao conta como cruzamento', () => {
  assert.equal(findCrossings([{ kind: 'text', x: 500, y: 0, width: 580, height: 100 }], plan).length, 0);
});

test('objeto dentro de uma unica pagina nao aparece', () => {
  assert.equal(findCrossings([{ kind: 'text', x: 1200, y: 0, width: 300, height: 100 }], plan).length, 0);
});

test('area segura reprova elemento colado na borda inferior', () => {
  assert.equal(inSafeArea({ x: 1140, y: 1250, width: 200, height: 80 }, plan), false);
  assert.equal(inSafeArea({ x: 1140, y: 200, width: 200, height: 80 }, plan), true);
});
