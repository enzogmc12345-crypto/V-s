/**
 * Exportacao das fatias no Photoshop.
 *
 * Estrategia: duplicar o documento, cortar na fatia, redimensionar se a
 * escala pedir, salvar, fechar sem salvar. E lento comparado a "Exportar
 * como", mas e o unico caminho que garante corte exato ao pixel e que
 * funciona igual em tela continua, com respiro e com sangria.
 */

const { app, core, constants } = require('photoshop');

/**
 * @param {object} plan          plano vindo do nucleo (com nomes aplicados)
 * @param {object} folder        pasta UXP escolhida pelo usuario
 * @param {object} [opts]
 * @param {'png'|'jpg'} [opts.format='png']
 * @param {number} [opts.quality=90]  1..100 para jpg
 * @param {function} [opts.onProgress] (feito, total, nome)
 */
async function exportPages(plan, folder, opts = {}) {
  const format = opts.format === 'jpg' ? 'jpg' : 'png';
  const quality = clamp(opts.quality ?? 90, 1, 100);
  const source = app.activeDocument;
  const results = [];

  for (let i = 0; i < plan.pages.length; i++) {
    const page = plan.pages[i];
    const rect = page.export;
    const fileName = `${page.name}.${format}`;

    await core.executeAsModal(
      async () => {
        const copy = await source.duplicate(`${page.name}__tmp`, true);
        try {
          await copy.crop({
            left: rect.x,
            top: rect.y,
            right: rect.x + rect.width,
            bottom: rect.y + rect.height
          });

          if (plan.scale && plan.scale !== 1) {
            await copy.resizeImage(
              Math.round(rect.width * plan.scale),
              Math.round(rect.height * plan.scale),
              72,
              constants.ResampleMethod.AUTOMATIC
            );
          }

          const file = await folder.createFile(fileName, { overwrite: true });
          if (format === 'png') {
            await copy.saveAs.png(file, { compression: 6 }, true);
          } else {
            await copy.saveAs.jpg(file, { quality: Math.round((quality / 100) * 12) }, true);
          }
          results.push({ page: page.number, name: fileName, path: file.nativePath });
        } finally {
          await copy.closeWithoutSaving();
        }
      },
      { commandName: `Exportando ${fileName}` }
    );

    if (opts.onProgress) opts.onProgress(i + 1, plan.pages.length, fileName);
  }

  return results;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

module.exports = { exportPages };
