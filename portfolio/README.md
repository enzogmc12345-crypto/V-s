# Portfólio — Enzo Giuseppe

Site de portfólio em HTML, CSS e JavaScript puro. Não precisa instalar nada,
não precisa de build. É só abrir o `index.html` no navegador.

---

## Como rodar

**Jeito rápido:** dê dois cliques em `index.html`.

**Jeito recomendado** (o vídeo do avatar e algumas coisas só funcionam
direito servindo por HTTP). No terminal, dentro da pasta `portfolio/`:

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000> no navegador.

---

## Onde eu troco o conteúdo?

**Só num arquivo: `js/data.js`.** Ele é todo comentado em português e está
dividido em 8 blocos:

| Bloco | O que controla |
|---|---|
| 1. `PERFIL` | Nome, cargo, bio, e-mail, WhatsApp, redes, avatar do hero |
| 2. `FERRAMENTAS` | O carrossel de ícones abaixo do hero |
| 3. `PROJETOS` | Carrossel de projetos + conteúdo do popup do Mac |
| 4. `PASTAS` | As pastas da seção "Meus arquivos" |
| 5. `POLAROIDS` | Suas fotos na seção "Sobre" |
| 6. `SERVIÇOS` | A grade "o que eu faço" |
| 7. `EXPERIÊNCIA` | A linha do tempo (vinda do currículo) |
| 8. `NÚMEROS` | Os três destaques da seção "Sobre" |

Textos maiores e fixos (títulos das seções, manifesto, contato) estão no
`index.html` — é só procurar o texto e trocar.

---

## O vídeo 3D que olha para o mouse

O hero já está **preparado** para o vídeo. Hoje ele mostra a imagem
`assets/hero/avatar.png` com uma inclinação 3D que segue o mouse.

Quando o vídeo estiver pronto:

1. Salve o arquivo como **`assets/hero/avatar-look.mp4`**.
2. Só isso. O site detecta o arquivo sozinho, troca a imagem pelo vídeo,
   some com o selo "espaço reservado" e passa a controlar o vídeo pela
   posição do mouse.

### Como gravar o vídeo para funcionar bem

O site **rebobina o vídeo** conforme o mouse: mouse na esquerda = começo do
vídeo, mouse no centro = meio, mouse na direita = fim. Então:

- Grave o personagem começando **olhando totalmente para a esquerda**,
  passando pelo **centro** e terminando **olhando totalmente para a direita**.
  Um movimento só, contínuo, sem voltar.
- Duração curta: **2 a 4 segundos** é o ideal.
- Mantenha o enquadramento igual ao da foto atual (rosto na parte de cima,
  ombros embaixo), para o nome "enzo" continuar caindo no peito.
- Fundo escuro combina com o site. Fundo transparente não funciona em MP4 —
  se quiser fundo vazado, exporte em `.webm` e troque a extensão no
  `data.js` (campo `avatarVideo`).
- Exporte com **muitos keyframes** (ou "todos os frames como keyframe" /
  "all intra"). Sem isso o navegador engasga ao rebobinar.
  No HandBrake é a opção de keyframe interval = 1. No FFmpeg:

  ```bash
  ffmpeg -i entrada.mp4 -c:v libx264 -g 1 -crf 20 -an assets/hero/avatar-look.mp4
  ```

  (`-g 1` = todo frame é keyframe, `-an` = sem áudio)
- Deixe o arquivo leve, abaixo de ~4 MB se possível.

Se o vídeo não existir ou falhar, o site volta sozinho para a imagem.
Nada quebra.

---

## Como adiciono meus projetos

1. Coloque as imagens em `assets/projetos/`.
   Recomendado: uma **capa vertical** (proporção 3:4, ex.: 900×1200) e uma ou
   mais **imagens internas** horizontais (ex.: 1600×1000).
2. Abra `js/data.js`, bloco 3 (`PROJETOS`), copie um bloco `{ ... }` inteiro,
   cole embaixo e troque os valores:

```js
{
  id: 'meu-projeto',                       // único, sem espaço nem acento
  titulo: 'Nome do Projeto',
  categoria: 'Editorial',                  // aparece na etiqueta do card
  pasta: 'editorial',                      // id de uma pasta do bloco 4
  ano: '2026',
  cliente: 'Nome do cliente',
  papel: 'O que você fez',
  resumo: 'Uma ou duas frases que aparecem logo abaixo do título.',
  descricao: 'O texto grande do case, dentro do popup.',
  tags: ['Ilustração', 'Diagramação'],
  capa: 'assets/projetos/minha-capa.jpg',
  galeria: [
    'assets/projetos/minha-imagem-1.jpg',
    'assets/projetos/minha-imagem-2.jpg'
  ],
  link: ''                                 // link externo opcional (Behance etc.)
}
```

A primeira imagem da `galeria` vira o topo do popup. As demais aparecem
empilhadas no final.

> O projeto aparece automaticamente no carrossel **e** dentro da pasta
> indicada. O contador de itens da pasta se atualiza sozinho.

### Pastas
Para criar uma pasta nova, adicione no bloco 4 (`PASTAS`) e use o mesmo `id`
no campo `pasta` dos projetos.

---

## Como troco as fotos das polaroids

Salve as fotos em `assets/polaroids/` (quadradas ficam melhores) e aponte os
caminhos no bloco 5 do `data.js`. O campo `giro` é a inclinação em graus —
valores entre `-8` e `8` funcionam bem.

---

## Como troco os ícones das ferramentas

Os ícones em `assets/tools/` são placeholders desenhados à mão (monogramas).
Para usar os logos reais, salve os arquivos nessa mesma pasta e troque o
caminho no bloco 2 do `data.js`. Funciona com `.svg`, `.png` ou `.webp` —
o ideal é imagem quadrada.

---

## Estrutura das pastas

```
portfolio/
├── index.html              ← estrutura da página
├── css/style.css           ← todo o visual
├── js/
│   ├── data.js             ← ⭐ SEU CONTEÚDO (edite aqui)
│   └── main.js             ← comportamento (carrossel, popup, avatar)
├── assets/
│   ├── hero/
│   │   ├── avatar.png      ← imagem 3D atual
│   │   └── avatar-look.mp4 ← ⬅ coloque o vídeo aqui quando gravar
│   ├── tools/              ← ícones das ferramentas
│   ├── projetos/           ← capas e imagens dos projetos
│   ├── polaroids/          ← suas fotos
│   └── favicon.svg
├── PROJETOS/               ← arquivos-fonte dos projetos (não vão pro site)
└── CURRICULO/              ← currículo em PDF (o botão "Baixar currículo" aponta aqui)
```

As pastas `PROJETOS/` e `CURRICULO/` são para você guardar os originais.
Só o que estiver em `assets/` aparece no site.

---

## Cores

Todas as cores ficam no topo do `css/style.css`, no bloco `:root`.
Para trocar o verde da marca inteira, mude só esta linha:

```css
--accent: #b8e01f;
```

---

## O que já está funcionando

- Hero com avatar 3D que acompanha o mouse (e aceita o vídeo depois)
- Carrossel de ferramentas em loop infinito
- Carrossel de projetos em leque, girando sozinho, com arraste, setas,
  bolinhas e teclado (← →)
- Popup em formato de janela do Mac, com botão de voltar quando você
  entra por uma pasta
- Pastas estilo computador que abrem e mostram os arquivos de dentro
- Polaroids com fita crepe na seção "Sobre"
- Arco de imagens na seção de contato
- Linha do tempo com a experiência do currículo
- Responsivo até 390px de largura
- Acessibilidade: navegação por teclado, `Esc` fecha o popup, foco preso
  dentro da janela, respeita "reduzir movimento" do sistema
