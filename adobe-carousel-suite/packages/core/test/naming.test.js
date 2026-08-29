const test = require('node:test');
const assert = require('node:assert');
const { planCarousel } = require('../src/layout');
const { buildName, applyNames } = require('../src/naming');

test('zero a esquerda mantem a ordem no disco e no upload', () => {
  const plan = applyNames(planCarousel({ format: 'ig-4x5', slides: 12, name: 'lancamento' }));
  assert.equal(plan.pages[0].name, 'lancamento_01');
  assert.equal(plan.pages[9].name, 'lancamento_10');
  const ordenado = plan.pages.map((p) => p.name).slice().sort();
  assert.deepEqual(ordenado, plan.pages.map((p) => p.name));
});

test('acento e espaco no nome do projeto nao vazam para o arquivo', () => {
  assert.equal(buildName('{projeto}_{nn}', { projeto: 'Promoção de Verão', number: 3 }), 'Promocao-de-Verao_03');
});

test('tokens de total, formato e escala', () => {
  const nome = buildName('{projeto}-{n}de{total}-{formato}{escala}', {
    projeto: 'x',
    number: 2,
    total: 5,
    formato: 'ig-4x5',
    escala: 2
  });
  assert.equal(nome, 'x-2de5-ig-4x5-2x');
});

test('nomes repetidos ganham sufixo em vez de sobrescrever arquivo', () => {
  const plan = applyNames(planCarousel({ format: 'ig-4x5', slides: 3 }), 'fixo');
  assert.deepEqual(plan.pages.map((p) => p.name), ['fixo', 'fixo-2', 'fixo-3']);
});
