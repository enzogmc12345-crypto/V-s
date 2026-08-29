# Arquitetura

## A ideia central

O cálculo do carrossel é **um só**, escrito uma vez, com testes. Cada programa
ganha uma casca fina que traduz esse cálculo para a linguagem dele.

```
                 packages/core  (JavaScript puro, 29 testes)
                 planCarousel · planFromExistingCanvas
                 applyNames · findCrossings · presets
                        │                    │
        copiado como    │                    │   empacotado como
        CommonJS        │                    │   core.bundle.js
                        ▼                    ▼
        plugins/photoshop-uxp        plugins/illustrator-cep
        painel UXP (JS)              painel CEP (HTML/JS no Chromium)
                │                            │
          photoshop API                 evalScript
          batchPlay                          │
                │                            ▼
                ▼                    host/carrossel.jsx (ExtendScript)
          documento PS                       │
                                             ▼
                                     documento AI          ← → serviço local
                                                              (remoção de fundo)
```

Regra que vale para os dois plugins: **nenhuma conta de layout mora na casca.**
Se um número precisa ser calculado, ele é calculado no núcleo e chega pronto.
É o que permite testar o comportamento de verdade sem abrir o Adobe.

## O sistema de coordenadas

O núcleo trabalha em **pixels a 72 dpi**, origem no canto superior esquerdo,
Y crescendo para baixo — a convenção do Photoshop.

O Illustrator usa pontos com Y crescendo para cima. A conversão acontece num
lugar só, em `host/carrossel.jsx`:

```js
function paraArtboardRect(pagina) {
    return [pagina.x, -pagina.y, pagina.x + pagina.width, -(pagina.y + pagina.height)];
}
```

Como 1 px a 72 dpi = 1 pt, os números do núcleo entram direto no Illustrator
sem fator de conversão. A escala (@2x, @3x) é aplicada só na exportação.

## Os dois modos de trabalho

**Contínuo** (`mode: 'continuous'`) — uma tela/prancheta de `N × largura`.
É o modo que resolve o que você descreveu: a foto começa na página 1 e termina
na 2 porque ela é um objeto só, desenhado por cima da emenda. O corte acontece
na exportação, sempre no mesmo pixel.

**Páginas** (`mode: 'pages'`) — uma prancheta por página. Melhor quando cada
slide é independente.

Os dois usam o mesmo plano; muda só o que a casca faz com ele.

## Respiro e sangria

Dois conceitos que parecem iguais e não são:

- **Respiro** (`gutter`): espaço entre as páginas **na hora de desenhar**, para
  o designer enxergar onde uma acaba e a outra começa. Ele entra na largura da
  prancheta e **não** entra na fatia exportada. Arte desenhada dentro do respiro
  desaparece — por isso o núcleo emite aviso quando respiro > 0 no modo contínuo.
- **Sangria** (`bleed`): a fatia sai **maior** que a página, puxando pixels da
  vizinha. Serve para impressão. Em rede social deve ficar em 0. O núcleo
  garante que a sangria nunca ultrapasse a borda do documento
  (`clampRect`) — a primeira e a última página sangram só do lado interno.

## Conferência de emendas

`findCrossings` recebe os retângulos dos objetos do documento e aponta quem
cruza uma linha de corte:

- texto, logo, CTA em cima da emenda → **erro** (ninguém quer a palavra cortada);
- imagem em cima da emenda → **informação** (provavelmente é de propósito).

No Photoshop os retângulos vêm de `layer.bounds`; no Illustrator, de
`item.visibleBounds`. O mesmo código julga os dois.

## Onde cada coisa mora

```
packages/core/          o cálculo, com testes            ← mexa aqui primeiro
  src/presets.js        formatos e área segura
  src/layout.js         planCarousel, planFromExistingCanvas
  src/naming.js         nomes de arquivo e prancheta
  src/seams.js          conferência de emendas
  test/                 29 testes (node --test)

plugins/photoshop-uxp/  plugin UXP
  manifest.json         v5, host PS 24+
  index.js              painel: lê o formulário, chama o núcleo
  src/ps-doc.js         criar documento, guias, ler camadas
  src/ps-export.js      duplicar → cortar → salvar → fechar
  src/ps-removebg.js    removeBackground / autoCutout + máscara
  lib/core/             cópia do núcleo (gerada)

plugins/illustrator-cep/ extensão CEP
  CSXS/manifest.xml     host ILST 24+, Node habilitado
  js/main.js            painel
  js/cep.js             ponte com evalScript (sem CSInterface.js)
  host/carrossel.jsx    ExtendScript: pranchetas, export, religar imagem
  lib/core.bundle.js    núcleo empacotado (gerado)

tools/bgremove/         serviço local de remoção de fundo (Python)
scripts/build.mjs       gera os dois artefatos acima
```

## Fluxo de alteração

1. Mexeu no cálculo? Altere `packages/core`, escreva o teste, rode `npm test`.
2. `npm run build` — regenera `lib/core/` e `lib/core.bundle.js`.
3. Recarregue o painel no Adobe.

Nunca edite `lib/` à mão: o build sobrescreve.
