/**
 * Remocao de fundo no Photoshop.
 *
 * Usa o motor do proprio Photoshop (Remover fundo / Selecionar objeto).
 * Roda na maquina, sem servico externo, sem credito de IA generativa e
 * sem enviar a imagem do cliente para lugar nenhum.
 *
 * Ordem de tentativa:
 *   1. removeBackground  - acao rapida "Remover fundo", ja entrega mascara
 *   2. autoCutout        - "Selecionar objeto" + mascara de camada
 * Se as duas falharem, o erro sobe para o painel com o motivo.
 */

const { app, action, core, constants } = require('photoshop');

async function removeBackground(opts = {}) {
  const doc = app.activeDocument;
  if (!doc) throw new Error('Abra um documento antes de remover o fundo.');

  const targets = opts.allLayers
    ? doc.layers.filter((l) => l.visible && l.kind !== constants.LayerKind.TEXT)
    : doc.activeLayers.slice();

  if (!targets.length) {
    throw new Error('Selecione ao menos uma camada de imagem.');
  }

  const report = [];
  for (const layer of targets) {
    await core.executeAsModal(
      async () => {
        doc.activeLayers = [layer];
        await promoteBackgroundLayer(layer);

        let method = 'removeBackground';
        try {
          await action.batchPlay([{ _obj: 'removeBackground' }], {});
        } catch (primaryError) {
          method = 'autoCutout';
          await selectSubjectAndMask();
        }

        if (opts.refine) await refineMask(opts.refine);
        if (opts.trim) await doc.trim(constants.TrimType.TRANSPARENT);

        report.push({ layer: layer.name, method });
      },
      { commandName: `Removendo fundo: ${layer.name}` }
    );
  }

  return report;
}

/** A camada "Plano de fundo" e travada: sem promover, a mascara nao entra. */
async function promoteBackgroundLayer(layer) {
  if (!layer.isBackgroundLayer) return;
  await action.batchPlay(
    [
      {
        _obj: 'set',
        _target: [{ _ref: 'layer', _property: 'background' }],
        to: { _obj: 'layer', opacity: { _unit: 'percentUnit', _value: 100 }, mode: { _enum: 'blendMode', _value: 'normal' } },
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    {}
  );
}

/** Caminho alternativo: Selecionar objeto e transformar a selecao em mascara. */
async function selectSubjectAndMask() {
  await action.batchPlay([{ _obj: 'autoCutout', sampleAllLayers: false }], {});
  await action.batchPlay(
    [
      {
        _obj: 'make',
        new: { _class: 'channel' },
        at: { _ref: 'channel', _enum: 'channel', _value: 'mask' },
        using: { _enum: 'userMaskEnabled', _value: 'revealSelection' },
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    {}
  );
}

/**
 * Ajuste fino da borda, aplicado NA MASCARA.
 * contract encolhe a mascara (tira a franja clara do fundo antigo),
 * feather suaviza. Valores altos comem cabelo: o padrao e conservador.
 */
async function refineMask({ contract = 0, feather = 0 } = {}) {
  if (!contract && !feather) return;
  await action.batchPlay(
    [
      {
        _obj: 'select',
        _target: [{ _ref: 'channel', _enum: 'channel', _value: 'mask' }],
        makeVisible: false,
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    {}
  );
  if (contract) {
    await action.batchPlay(
      [
        {
          _obj: 'minimum',
          radius: { _unit: 'pixelsUnit', _value: contract },
          preserveShape: { _enum: 'preserveShape', _value: 'roundness' },
          _options: { dialogOptions: 'dontDisplay' }
        }
      ],
      {}
    );
  }
  if (feather) {
    await action.batchPlay(
      [
        {
          _obj: 'gaussianBlur',
          radius: { _unit: 'pixelsUnit', _value: feather },
          _options: { dialogOptions: 'dontDisplay' }
        }
      ],
      {}
    );
  }
  await action.batchPlay(
    [
      {
        _obj: 'select',
        _target: [{ _ref: 'channel', _enum: 'channel', _value: 'RGB' }],
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    {}
  );
}

/** Abre "Selecionar e aplicar mascara" para o ajuste manual de cabelo. */
async function openSelectAndMask() {
  await core.executeAsModal(
    async () => {
      await action.batchPlay([{ _obj: 'smartBrushWorkspace' }], {});
    },
    { commandName: 'Selecionar e aplicar mascara' }
  );
}

module.exports = { removeBackground, openSelectAndMask };
