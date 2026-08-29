const test = require('node:test');
const assert = require('node:assert');
const { FORMATS, listFormats, resolveFormat } = require('../src/presets');

test('todo preset tem medidas positivas e area segura completa', () => {
  for (const [id, f] of Object.entries(FORMATS)) {
    assert.equal(f.id, id);
    assert.ok(f.width > 0 && f.height > 0, `${id} sem medidas`);
    for (const lado of ['top', 'right', 'bottom', 'left']) {
      assert.ok(typeof f.safe[lado] === 'number', `${id} sem safe.${lado}`);
    }
    assert.ok(f.safe.left + f.safe.right < f.width, `${id}: area segura maior que a pagina`);
    assert.ok(f.safe.top + f.safe.bottom < f.height, `${id}: area segura maior que a pagina`);
  }
});

test('listFormats devolve tudo que o painel precisa', () => {
  const lista = listFormats();
  assert.ok(lista.length >= 5);
  assert.ok(lista.every((f) => f.id && f.label && f.width && f.height));
});

test('formato desconhecido falha alto em vez de virar padrao silencioso', () => {
  assert.throws(() => resolveFormat('nao-existe'), /Formato desconhecido/);
});

test('formato personalizado invalido e recusado', () => {
  assert.throws(() => resolveFormat({ width: 0, height: 100 }), /positivos/);
});
