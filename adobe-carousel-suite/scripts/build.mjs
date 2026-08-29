/**
 * "Build" do projeto:
 *  1. copia o nucleo compartilhado (CommonJS) para o plugin do Photoshop,
 *     que carrega CommonJS nativamente pelo UXP;
 *  2. gera um bundle de arquivo unico para o painel CEP do Illustrator,
 *     que roda em Chromium e nao deve depender de Node estar habilitado.
 *
 *   node scripts/build.mjs
 */
import { cp, rm, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'packages/core');

const AVISO = '// GERADO POR scripts/build.mjs - NAO EDITE. Fonte: packages/core/\n';

/* 1. Photoshop: copia direta ------------------------------------------- */

const psTarget = resolve(root, 'plugins/photoshop-uxp/lib/core');
await rm(psTarget, { recursive: true, force: true });
await mkdir(dirname(psTarget), { recursive: true });
await cp(source, psTarget, {
  recursive: true,
  filter: (src) => !src.includes('/test') && !src.endsWith('package.json')
});
await writeFile(resolve(psTarget, 'GERADO.txt'), AVISO);
console.log('nucleo copiado -> plugins/photoshop-uxp/lib/core');

/* 2. Illustrator: bundle unico para o Chromium do CEP ------------------- */

const MODULES = ['src/presets.js', 'src/layout.js', 'src/naming.js', 'src/seams.js', 'index.js'];

const parts = [];
for (const rel of MODULES) {
  const code = await readFile(resolve(source, rel), 'utf8');
  const id = rel === 'index.js' ? 'index' : basename(rel, '.js');
  parts.push(`  registrar(${JSON.stringify(id)}, function (module, exports, require) {\n${code}\n  });`);
}

const bundle = `${AVISO}/**
 * Nucleo do carrossel empacotado para o painel CEP.
 * Expoe window.CarrosselCore. Os modulos tem nomes unicos, entao o
 * require interno resolve pelo nome do arquivo, sem caminho.
 */
(function (global) {
  'use strict';
  var fabricas = {};
  var cache = {};

  function registrar(id, fabrica) {
    fabricas[id] = fabrica;
  }

  function require(caminho) {
    var id = String(caminho).replace(/^.*\\//, '').replace(/\\.js$/, '');
    if (cache[id]) return cache[id].exports;
    if (!fabricas[id]) throw new Error('Modulo nao encontrado no bundle: ' + caminho);
    var module = { exports: {} };
    cache[id] = module;
    fabricas[id](module, module.exports, require);
    return module.exports;
  }

${parts.join('\n\n')}

  global.CarrosselCore = require('index');
})(typeof window !== 'undefined' ? window : this);
`;

const aiLib = resolve(root, 'plugins/illustrator-cep/lib');
await mkdir(aiLib, { recursive: true });
await writeFile(resolve(aiLib, 'core.bundle.js'), bundle);
await rm(resolve(aiLib, 'core'), { recursive: true, force: true });
console.log('bundle gerado  -> plugins/illustrator-cep/lib/core.bundle.js');
