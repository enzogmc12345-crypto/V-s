# O que dá pra fazer, o que não dá

Resposta curta: **a automação do carrossel dá pra fazer inteira nos dois programas.**
A remoção de fundo dá pra fazer muito bem no Photoshop e dá pra fazer bem no
Illustrator, mas por um caminho diferente — e é isso que muda o orçamento do projeto.

## 1. A parte do carrossel

| O que você pediu | Photoshop | Illustrator |
|---|---|---|
| Criar as páginas por botão | sim | sim |
| Uma tela larga com a arte inteira | sim | sim |
| Fatiar a tela em páginas exatas | sim | sim |
| Arte que começa na página 1 e termina na 2 | sim | sim |
| Exportar cada página numerada | sim | sim |
| Exportar PDF de várias páginas (LinkedIn) | não direto | sim |
| Conferir o que está em cima da emenda | sim | sim |

Nada aqui depende de nuvem, de conta Adobe paga ou de crédito. É tudo
conta de chegada em cima do documento aberto, e é o que já está implementado
em `packages/core` — com 29 testes automatizados cobrindo o corte, o respiro,
a sangria, a área segura e a numeração.

O ponto que você descreveu como "milimétrico" é justamente onde o plugin ganha
da mão: a fatia sai sempre com a largura exata do formato, o corte cai sempre
no mesmo pixel, e a numeração sai com zero à esquerda (`_01`, `_02`) para o
carrossel não subir fora de ordem.

## 2. A parte que muda o projeto: são duas tecnologias diferentes

Não dá pra fazer um plugin só que roda nos dois. E, mais importante, **não dá
pra fazer os dois na mesma tecnologia** — o Illustrator ainda não abriu a
plataforma nova para quem é de fora da Adobe.

**Photoshop → UXP.** Plataforma atual da Adobe, pública desde 2021, madura.
É o que este projeto usa. Instala como plugin normal (`.ccx`), distribui pelo
Adobe Exchange ou por arquivo.

**Illustrator → CEP + ExtendScript.** Até agosto de 2026 a UXP do Illustrator
segue **interna da Adobe**: não existe API pública nem documentação para
desenvolvedor terceiro. O único caminho público de painel no Illustrator hoje
é o CEP, que é a geração anterior. Ele funciona, é o que praticamente todo
plugin de Illustrator do mercado usa, e a Adobe não anunciou data para desligar.

Três consequências práticas disso, que precisam estar no contrato:

1. **Vai ter duas bases de código.** Elas compartilham o miolo (o cálculo do
   layout é o mesmo arquivo nos dois), mas a camada que fala com o programa é
   escrita duas vezes.
2. **Quando a UXP do Illustrator abrir, o painel dele vai ter que ser
   reescrito.** O miolo compartilhado sobrevive; a camada de host, não. Foi
   por isso que separei as duas coisas desde o começo.
3. **Tem um risco a validar na primeira semana:** há relatos recorrentes de
   painel CEP abrindo em branco no macOS a partir do Illustrator 2025. Antes
   de escrever mais código do Illustrator, vale instalar o painel vazio na
   máquina que o cliente usa de verdade e confirmar que ele aparece. Se não
   aparecer, o plano B é entregar a mesma automação como **script `.jsx`**
   (File > Scripts), que funciona em qualquer versão — perde o painel, mantém
   a automação inteira.

## 3. A parte difícil: remover o fundo

Aqui os dois programas são mundos diferentes.

### Photoshop: resolvido, e bem

O Photoshop já tem o motor de recorte embutido (Remover fundo / Selecionar
objeto), e ele é chamável por plugin. É o que o plugin faz. Isso significa:

- roda no processamento do próprio computador, offline;
- não gasta crédito nem tem custo por imagem;
- a imagem do cliente não sai do computador;
- a qualidade é a mesma do botão nativo — que é boa, e ainda dá pra abrir o
  "Selecionar e aplicar máscara" pelo próprio plugin quando o cabelo pedir
  ajuste fino.

O plugin ainda adiciona o que o botão nativo não faz: aplicar em várias
camadas de uma vez, encolher/suavizar a máscara e aparar a transparência.

### Illustrator: precisa de um serviço local

O Illustrator tem "Remover fundo" desde as versões recentes, **mas é recurso
de IA generativa da Adobe e não é exposto para script**. Nenhum plugin
consegue apertar aquele botão programaticamente.

Como o Illustrator é vetor, ele também não tem motor de recorte próprio para
usar. Então, para ter remoção de fundo de verdade dentro do painel, sobram
três caminhos:

| Caminho | Qualidade | Custo por imagem | Offline | Instalação |
|---|---|---|---|---|
| **Serviço local** (implementado) | muito boa | zero | sim | precisa de um instalador |
| API de nuvem (Adobe Firefly, remove.bg…) | boa a muito boa | por imagem | não | nenhuma |
| Ida e volta pelo Photoshop | boa | zero | sim | exige os dois programas abertos |

Implementei o **serviço local**: um programinha que roda na máquina do
designer, escuta só em `127.0.0.1` e devolve a imagem recortada. Usa os
modelos BiRefNet / ISNet — em foto de pessoa e produto o BiRefNet costuma
segurar cabelo melhor que o recorte nativo do Photoshop.

O preço disso é honesto e precisa ser dito ao cliente: **é mais um programa
para instalar na máquina**, e o primeiro uso baixa o modelo (algumas centenas
de MB). Depois disso, é offline e ilimitado. Se o cliente não topar instalar
nada, o caminho é a API de nuvem — aí é custo por imagem e a imagem sai da
máquina.

Detalhe importante do fluxo no Illustrator: o plugin recorta **imagens
vinculadas** (o arquivo existe em disco, o plugin religa a versão recortada).
Imagem **incorporada** no `.ai` não dá pra extrair por script — o painel
avisa e explica o caminho (Links > Desincorporar).

## 4. Resumo pra passar ao cliente

- O carrossel automatizado: sim, nos dois programas, sem depender de nada externo.
- Um plugin para cada programa, com o cálculo compartilhado.
- Remover fundo no Photoshop: nativo, offline, sem custo por imagem.
- Remover fundo no Illustrator: possível e com boa qualidade, mas exige
  instalar um serviço junto — ou aceitar custo por imagem numa API.
- Risco a testar logo: painel CEP no macOS com Illustrator 2025/2026.

## Fontes

- [BatchPlay — UXP para Photoshop](https://developer.adobe.com/photoshop/uxp/2022/ps-reference/media/batchplay)
- [Remover fundo de imagens no Illustrator (Adobe)](https://helpx.adobe.com/illustrator/desktop/use-generative-ai/remove-background-from-images.html)
- [UXP é público para Illustrator em 2026? (Adobe Community)](https://community.adobe.com/questions-652/clarification-needed-is-uxp-publicly-available-for-illustrator-in-2026-1548811)
- [UXP for Illustrator: Status & What to Use Today](https://mapsoft.com/posts/illustrator-uxp-status.html)
- [Illustrator CEP Extensions: HTML Panels in 2026](https://mapsoft.com/posts/illustrator-cep-extensions.html)
- [Illustrator 2025 e CEP no macOS: painel em branco](https://community.adobe.com/questions-652/illustrator-2025-and-cep-on-macos-blank-panel-817513)
