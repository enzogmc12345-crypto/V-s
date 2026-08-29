# Remoção de fundo

## Antes de tudo: nada aqui roda na nuvem

Vale separar duas coisas que costumam ser confundidas, porque a diferença é o
que decide custo e privacidade do projeto:

| | Onde processa | Precisa de internet | Custo por imagem | A imagem sai da máquina |
|---|---|---|---|---|
| **O que este projeto usa** | CPU do próprio computador | não | zero | não |
| Serviço de nuvem (Firefly, remove.bg…) | servidor da empresa | sim | sim | sim |

Os dois caminhos deste projeto — o motor nativo do Photoshop e o serviço local
do Illustrator — estão na primeira linha. Rodam no processamento do PC, offline,
sem conta, sem crédito e sem custo por imagem.

Um detalhe técnico que não muda nada disso, mas evita mal-entendido: o
"Remover fundo" do Photoshop é reconhecimento de imagem treinado (Adobe Sensei),
e o serviço local também usa modelo treinado. **Modelo treinado rodando na sua
máquina não é serviço de nuvem** — é o que permite recortar cabelo bem sem pagar
por imagem. Recorte de qualidade sem nenhum modelo treinado só funciona com fundo
liso e contrastante (intervalo de cores, chroma key, canais); para foto real,
com cabelo e fundo bagunçado, o resultado não se sustenta.

## Photoshop: nativo

O plugin chama o motor do próprio Photoshop, na ordem:

1. **`removeBackground`** — a ação "Remover fundo". Já entrega máscara de camada.
2. **`autoCutout` + máscara** — "Selecionar objeto" seguido de máscara de
   revelação. Entra quando a primeira falha (versão antiga, tipo de camada
   que a ação não aceita).

O relatório do painel diz qual dos dois foi usado em cada camada.

Extras que o botão nativo não faz:

- **Encolher** (0–10 px): tira a franja clara que sobra do fundo antigo.
  Valor alto come cabelo — comece em 1.
- **Suavizar** (0–10 px): amacia a borda.
- **Aparar transparência**: recorta o documento no objeto.
- **Todas as camadas**: aplica em lote, pulando camadas de texto.
- **Abrir Selecionar e aplicar máscara**: para o ajuste fino de cabelo, quando
  o automático não basta.

Nada sai da máquina, nada gasta crédito de IA generativa.

## Illustrator: serviço local

O Illustrator tem "Remover fundo" nas versões recentes, mas é recurso de IA
generativa e **não é exposto para script**. Nenhum plugin consegue acionar
aquele botão. Como o Illustrator é vetorial, também não há motor de recorte
próprio para reaproveitar.

A solução: `tools/bgremove/servidor.py`, um serviço que roda na máquina.

```
Painel CEP  ──POST /remover-fundo──▶  127.0.0.1:8765
                                            │ rembg + BiRefNet/ISNet (ONNX)
            ◀──{"saida": "/…_sem-fundo.png"}┘
     │
     └─ evalScript ▶ carrosselReligarImagem() ▶ a imagem no .ai aponta
                                                para a versão recortada
```

### Instalação

```bash
cd tools/bgremove
python3 -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python servidor.py --pre-carregar birefnet-general
```

O primeiro uso baixa os pesos do modelo (algumas centenas de MB). Depois é
offline. `--pre-carregar` evita a espera do primeiro clique.

### Modelos

| Modelo | Quando usar | Velocidade |
|---|---|---|
| `birefnet-general` | melhor borda e cabelo; foto de pessoa e produto | mais lento |
| `isnet-general-use` | equilíbrio; bom padrão do dia a dia | médio |
| `u2net_human_seg` | só pessoas, recorte rápido | rápido |
| `u2net` | genérico clássico | rápido |

O **alpha matting** (caixa no painel) melhora borda de cabelo e de objeto
translúcido, e custa alguns segundos a mais por imagem.

### Vinculada × incorporada

O plugin recorta **imagens vinculadas** — o arquivo existe em disco, o serviço
grava `nome_sem-fundo.png` ao lado, e o painel religa a imagem.

Imagem **incorporada** no `.ai` não pode ser extraída por script. O painel
avisa e indica o caminho: Janela > Links > Desincorporar, ou remover o fundo
antes de colocar a imagem no documento.

### Segurança

O serviço lê e grava arquivos de imagem sob pedido. Por isso ele:

- escuta **só em `127.0.0.1`** — não aceita conexão de fora da máquina;
- confere o cabeçalho `Host` (barra ataque de DNS rebinding vindo do navegador);
- aceita **só extensões de imagem**;
- grava **só ao lado do arquivo de origem**, com sufixo `_sem-fundo`.

Não abra essa porta na rede e não a exponha por túnel.

## As alternativas, se o cliente não quiser instalar nada

**API de nuvem** (Adobe Firefly Services, remove.bg e afins): não precisa
instalar, qualidade boa, mas é custo por imagem e a imagem sai da máquina do
cliente — o que precisa ser combinado se o material for de terceiros.
A troca é pequena no código: só o `pedirRecorte()` em `js/main.js` muda.

**Ida e volta pelo Photoshop**: o painel do Illustrator manda a imagem para o
Photoshop recortar e recebe de volta. Zero custo e zero instalação extra, mas
exige os dois programas abertos e é mais frágil.
