/**
 * Criacao do documento do carrossel no Photoshop.
 *
 * Tudo aqui roda dentro de core.executeAsModal (quem chama e responsavel
 * por abrir o escopo modal). Usamos batchPlay em vez de app.documents.add
 * porque batchPlay aceita a unidade explicitamente em pixels: com a regua
 * do usuario em centimetros, o metodo do DOM cria o documento no tamanho
 * errado sem reclamar.
 */

const { app, action, constants } = require('photoshop');

const px = (value) => ({ _unit: 'pixelsUnit', _value: value });

async function createCarouselDocument(plan) {
  await action.batchPlay(
    [
      {
        _obj: 'make',
        new: {
          _obj: 'document',
          artboard: false,
          autoPromoteBackgroundLayer: false,
          preset: 'Custom',
          width: px(plan.canvas.width),
          height: px(plan.canvas.height),
          resolution: { _unit: 'densityUnit', _value: 72 },
          mode: { _class: 'RGBColorMode' },
          fill: { _enum: 'fill', _value: 'white' },
          depth: 8,
          profile: 'sRGB IEC61966-2.1'
        },
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    { synchronousExecution: false }
  );

  const doc = app.activeDocument;
  doc.name = plan.name;
  await addGuides(doc, plan);
  return doc;
}

/** Guias de corte e de area segura. Sao o "milimetro" visivel do layout. */
async function addGuides(doc, plan) {
  const descriptors = [];
  for (const x of plan.guides.vertical) {
    descriptors.push(guideDescriptor('vertical', x));
  }
  for (const y of plan.guides.horizontal) {
    descriptors.push(guideDescriptor('horizontal', y));
  }
  if (!descriptors.length) return;
  await action.batchPlay(descriptors, { synchronousExecution: false });
}

function guideDescriptor(orientation, position) {
  return {
    _obj: 'make',
    new: {
      // "good" e mesmo o nome interno da guia no Action Manager do Photoshop.
      _obj: 'good',
      position: { _unit: 'pixelsUnit', _value: position },
      orientation: { _enum: 'orientation', _value: orientation },
      kind: { _enum: 'kind', _value: 'document' }
    },
    _options: { dialogOptions: 'dontDisplay' }
  };
}

/** Remove todas as guias do documento (antes de refazer o layout). */
async function clearGuides() {
  await action.batchPlay(
    [
      {
        _obj: 'delete',
        _target: [{ _ref: 'guide', _enum: 'ordinal', _value: 'allEnum' }],
        _options: { dialogOptions: 'dontDisplay' }
      }
    ],
    { synchronousExecution: false }
  );
}

/**
 * Modo pranchetas (opcional). O Photoshop cria pranchetas por batchPlay,
 * mas o descritor varia entre versoes; se falhar, o painel volta para o
 * modo tela continua + guias, que e o caminho principal do plugin.
 */
async function tryCreateArtboards(plan) {
  try {
    for (const page of plan.pages) {
      await action.batchPlay(
        [
          {
            _obj: 'make',
            _target: [{ _ref: 'artboardSection' }],
            using: {
              _obj: 'artboardSection',
              artboardRect: {
                _obj: 'classFloatRect',
                top: page.y,
                left: page.x,
                bottom: page.y + page.height,
                right: page.x + page.width
              },
              name: page.name
            },
            _options: { dialogOptions: 'dontDisplay' }
          }
        ],
        { synchronousExecution: false }
      );
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: String(error && error.message ? error.message : error) };
  }
}

/** Bounds das camadas, no formato que o modulo de emendas espera. */
function readLayerRects(doc) {
  const items = [];
  const walk = (layers) => {
    for (const layer of layers) {
      if (layer.layers && layer.layers.length) {
        walk(layer.layers);
        continue;
      }
      if (!layer.visible) continue;
      const b = layer.bounds;
      if (!b) continue;
      const width = b.right - b.left;
      const height = b.bottom - b.top;
      if (width <= 0 || height <= 0) continue;
      items.push({
        name: layer.name,
        kind: mapKind(layer.kind),
        x: b.left,
        y: b.top,
        width,
        height
      });
    }
  };
  walk(doc.layers);
  return items;
}

function mapKind(kind) {
  if (kind === constants.LayerKind.TEXT) return 'text';
  if (kind === constants.LayerKind.SMARTOBJECT) return 'image';
  if (kind === constants.LayerKind.NORMAL) return 'image';
  return String(kind || 'objeto');
}

module.exports = {
  createCarouselDocument,
  addGuides,
  clearGuides,
  tryCreateArtboards,
  readLayerRects
};
