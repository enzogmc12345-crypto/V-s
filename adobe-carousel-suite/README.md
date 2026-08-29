# Carrossel Suite — plugins Adobe

Automação de carrossel e post para **Adobe Photoshop** e **Adobe Illustrator**:
criar as páginas por botão, desenhar a arte numa tela contínua, fatiar no pixel
exato e exportar numerado. Mais remoção de fundo nos dois programas.

> **Comece por [`docs/01-viabilidade.md`](docs/01-viabilidade.md)** — é a
> resposta técnica sobre o que dá e o que não dá pra fazer, e o que isso muda
> no projeto.

## O que ele faz

- **Cria o documento do carrossel** no formato escolhido (Instagram 4:5 e 1:1,
  Stories, LinkedIn, TikTok, A4 ou medida livre), com guias de corte e de área segura.
- **Tela contínua**: a arte é desenhada atravessando as páginas. Uma foto começa
  na página 1 e termina na 2 porque é um objeto só — o corte acontece na exportação.
- **Fatia prancheta que já existe**: descobre quantas páginas cabem pela largura
  e avisa quantos pixels sobram.
- **Confere as emendas** antes de exportar: texto e logo em cima do corte viram
  erro; imagem atravessando vira aviso.
- **Exporta** PNG/JPG por página em @1x/@2x/@3x, numerado com zero à esquerda,
  e PDF de várias páginas no Illustrator (o formato do carrossel do LinkedIn).
- **Remove o fundo**: no Photoshop pelo motor nativo; no Illustrator por um
  serviço local que roda offline.

## Estrutura

| Pasta | O que é |
|---|---|
| `packages/core` | O cálculo do carrossel. JavaScript puro, 29 testes. |
| `plugins/photoshop-uxp` | Plugin UXP do Photoshop. |
| `plugins/illustrator-cep` | Extensão CEP do Illustrator (painel + ExtendScript). |
| `tools/bgremove` | Serviço local de remoção de fundo (Python). |
| `scripts/build.mjs` | Copia/empacota o núcleo dentro dos plugins. |

## Começar

```bash
npm test        # roda os 29 testes do núcleo
npm run build   # prepara os plugins
```

Instalação nos programas: [`docs/04-instalacao.md`](docs/04-instalacao.md).

## Documentação

- [`01-viabilidade.md`](docs/01-viabilidade.md) — o que dá, o que não dá, e por quê
- [`02-arquitetura.md`](docs/02-arquitetura.md) — como as peças se encaixam
- [`03-remocao-de-fundo.md`](docs/03-remocao-de-fundo.md) — os dois caminhos e os modelos
- [`04-instalacao.md`](docs/04-instalacao.md) — instalar, depurar, distribuir

## Estado atual

O núcleo está pronto e testado. As cascas do Photoshop e do Illustrator estão
escritas e com caminho alternativo para as APIs que variam entre versões, mas
**ainda precisam de uma passada dentro dos programas** — a lista do que
conferir primeiro está no fim de [`04-instalacao.md`](docs/04-instalacao.md).
