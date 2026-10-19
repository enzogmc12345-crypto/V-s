# Vós · Motion (Remotion)

Projeto [Remotion](https://remotion.dev) que gera o showreel do site — as peças
em vídeo da frente de **motion graphics**.

Criado com `npx create-video@latest` (template em branco) e a skill oficial
`remotion-best-practices` instalada em `.agents/skills/`.

## Rodar

```bash
cd motion
npm install
npx remotion studio          # pré-visualização interativa em http://localhost:3000
```

## Renderizar

```bash
# MP4 (H.264) — o que a maioria dos navegadores e o Safari tocam
npx remotion render Showreel ../media/showreel.mp4 --codec=h264 --crf=23

# WebM (VP9) — fallback para Chromium sem codecs proprietários
npx remotion render Showreel ../media/showreel.webm --codec=vp9 --crf=36
```

Em máquina sem Chrome completo (contêiner, CI), aponte o binário headless:

```bash
npx remotion render Showreel ../media/showreel.mp4 \
  --browser-executable=/caminho/para/chrome-headless-shell
```

O site usa os dois arquivos em `media/`, com `media/showreel-poster.jpg` como
pôster enquanto o vídeo carrega.

## Estrutura

```
src/
├── index.ts       registra a raiz
├── Root.tsx       <Composition id="Showreel"> 1280×720, 30fps, 12s
├── Showreel.tsx   as cinco cenas e os componentes de texto
└── paleta.ts      cores — as mesmas do site
```

Cenas: marca → motion graphics → sites e aplicativos → social media → fecho.

Toda animação é dirigida por `useCurrentFrame()` + `interpolate()`. Não use
`transition` nem `animation` do CSS aqui: não renderiza no vídeo.
