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
