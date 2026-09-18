# Estúdio de Identidade

Plataforma para desenhar **identidades visuais de sites de software** a partir das
características que o cliente sente — não das que o designer acha bonitas.

> O cliente não compra a sua opinião de design. Ele compra o mundo que reconhece.
> A ferramenta serve para emprestar os olhos dele: descreve-se o mundo em sete
> eixos e todo o acervo (cor, símbolo, tipo, textura, foto, persona) se reorganiza
> em volta dessa descrição.

## Como abrir

Arquivos estáticos, sem build e sem dependência:

```bash
cd estudio-identidade
python3 -m http.server 8899
# abre http://localhost:8899
```

Abrir o `index.html` direto pelo navegador também funciona.

## O percurso

| # | Etapa | O que decide |
|---|-------|--------------|
| 01 | Briefing | Nome do produto, vertical de software e uma frase do cliente sobre o mundo dele |
| 02 | Características | Os sete eixos — é aqui que o resto do estúdio é calibrado |
| 03 | Cor | Família de tons e paleta de quatro papéis: A base, B tinta, C destaque, D apoio |
| 04 | Símbolo | Sete estilos (linear, sólido, orgânico, maximalista, dimensional, artesanal, mecânico) × três variantes |
| 05 | Tipografia | Par display + texto, com escala |
| 06 | Composição | Até quatro elementos gráficos + a grade |
| 07 | Fotografia | Direção de imagem, com termo de busca pronto para banco de fotos |
| 08 | Persona | Personagem pré-estabelecido por vertical — quem julga a peça |
| 09 | Entrega | Argumento escrito, JSON, link compartilhável e impressão do painel |

O painel da direita monta a identidade a cada clique e alterna entre **painel de
marca** (A B C D, tipo, símbolo em positivo/negativo/reduzido, grade, textura,
persona) e **prévia do site** — o mundo já habitável, com navegação, hero, cards
e CTA no desenho escolhido.

## Os sete eixos

`elegancia` · `densidade` · `humor` · `tempo` · `origem` · `energia` · `luz`

Cada item do acervo carrega um perfil nesses mesmos eixos. A afinidade é a
distância ponderada entre o perfil do item e o vetor do cliente: quanto mais o
cliente puxa um eixo para a ponta, mais aquele eixo pesa (`peso()` em
`js/motor.js`). O número no canto de cada cartão é esse cálculo, e as etiquetas
abaixo do título dizem *por que* aquele item subiu.

## Decisões de desenho

- **Sem degradê.** Cor chapada com papel fixo. Volume, quando existe, é feito com
  faces chapadas (estilo `dimensional`); textura é feita com ruído e retícula.
- **Contraste medido.** O painel mostra a razão de contraste entre base e tinta e
  a nota WCAG correspondente.
- **Símbolo gerado, não ilustrado.** Todo símbolo é SVG montado na hora a partir
  da paleta e da tipografia escolhidas — troque a cor e a marca inteira se move.
- **Nada é obrigatório.** O ranking sugere; qualquer opção continua clicável. A
  sensação de autoria depende de o designer poder discordar do motor.

## Arquivos

```
estudio-identidade/
├── index.html          estrutura da interface
├── css/app.css         interface (escura, laranja só onde decide) + regras de impressão
└── js/
    ├── dados.js        acervo: eixos, atalhos, verticais, paletas, tipos, símbolos,
    │                   elementos, grades, fotografia e personas
    ├── motor.js        cor (HSL, mistura, luminância, WCAG) e afinidade
    ├── simbolos.js     gerador de símbolos em SVG + lockup
    ├── painel.js       painel de marca e prévia do site
    └── app.js          etapas, estado, persistência, exportação
```

## Ampliar o acervo

Tudo mora em `js/dados.js` e segue o mesmo formato. Uma paleta nova:

```js
{ id: 'cinza-vidro', nome: 'Cinza Vidro', familia: 'sobrio',
  cores: [{ r: 'A', papel: 'Base', hex: '#EDEFF1' }, { r: 'B', papel: 'Tinta', hex: '#15181B' },
          { r: 'C', papel: 'Destaque', hex: '#3E7C8A' }, { r: 'D', papel: 'Apoio', hex: '#9AA5AC' }],
  perfil: { elegancia: 76, densidade: 18, humor: 34, tempo: 82, origem: 78, energia: 30, luz: 74 },
  combina: 'Grotesca neutra e fotografia de arquitetura.' }
```

O ranking, o painel, a prévia e o argumento passam a considerá-la sem mais
nenhuma alteração. Personas novas precisam de `vertical` apontando para um id de
`VERTICAIS`. Fontes novas precisam entrar também no `<link>` do Google Fonts em
`index.html`.

## Estado e compartilhamento

As escolhas ficam em `localStorage` e sobrevivem ao recarregamento. O botão
**Copiar link** serializa a identidade inteira no hash da URL — quem abrir o link
vê exatamente a mesma identidade, sem servidor no meio.
