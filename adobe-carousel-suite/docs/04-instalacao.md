# Instalação e desenvolvimento

## Pré-requisitos

- Node.js 18+ (só para rodar os testes e o build; os plugins não precisam dele)
- Photoshop 2023 (24.0) ou mais novo
- Illustrator 2020 (24.0) ou mais novo
- Python 3.9+ apenas se for usar a remoção de fundo no Illustrator

## Preparar o projeto

```bash
npm test        # 29 testes do núcleo
npm run build   # gera lib/core/ e lib/core.bundle.js dentro dos plugins
```

O `build` precisa rodar **antes de instalar os plugins** e sempre que
`packages/core` mudar.

## Photoshop (UXP)

### Desenvolvimento

1. Instale o [UXP Developer Tool](https://developer.adobe.com/photoshop/uxp/guides/devtool/) (gratuito, conta Adobe).
2. **Add Plugin…** → escolha `plugins/photoshop-uxp/manifest.json`.
3. **Load** com o Photoshop aberto.
4. O painel aparece em **Plugins > Carrossel Suite**.
5. Depois de alterar o código: **Reload** no UDT.

Para depurar, **Debug** no UDT abre o DevTools do painel (`console.log`
aparece lá).

### Distribuição

No UDT, **Package** gera um `.ccx`. Duplo clique instala pelo Creative Cloud.
Para publicar no Adobe Exchange é preciso conta de desenvolvedor e revisão da
Adobe; para uso interno do cliente, o `.ccx` direto basta.

## Illustrator (CEP)

### Desenvolvimento

1. Ligue o modo de depuração (uma vez por máquina):

   **macOS**
   ```bash
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   defaults write com.adobe.CSXS.12 PlayerDebugMode 1
   ```

   **Windows** — em `HKEY_CURRENT_USER\Software\Adobe\CSXS.11` (e `.12`),
   crie a string `PlayerDebugMode` = `1`.

2. Copie ou linke a pasta `plugins/illustrator-cep` para:

   **macOS** `~/Library/Application Support/Adobe/CEP/extensions/carrossel-suite`
   **Windows** `%APPDATA%\Adobe\CEP\extensions\carrossel-suite`

   ```bash
   # macOS, link simbólico para não ter que copiar a cada alteração
   ln -s "$PWD/plugins/illustrator-cep" \
     "$HOME/Library/Application Support/Adobe/CEP/extensions/carrossel-suite"
   ```

3. Reinicie o Illustrator. O painel fica em **Janela > Extensões > Carrossel Suite**.

### Se o painel abrir em branco

É o problema conhecido do CEP no macOS a partir do Illustrator 2025. Na ordem:

1. Confirme o `PlayerDebugMode` para a **versão de CSXS certa** — o Illustrator
   novo usa CSXS 11 ou 12; ligar só na 9 não adianta.
2. Confirme que a pasta tem `CSXS/manifest.xml` no primeiro nível.
3. Teste no Windows: se funcionar lá e não no macOS, é o bug do CEP.
4. Não resolvendo, use o **plano B**: a mesma automação como script `.jsx`
   (`host/carrossel.jsx` roda por File > Scripts com pequenas adaptações no
   ponto de entrada). Perde o painel, mantém a automação.

### Distribuição

Extensão CEP para instalar na máquina de outra pessoa precisa ser assinada
(`.zxp`) com o [ZXPSignCmd](https://github.com/Adobe-CEP/CEP-Resources) e
instalada com o [Anastasiy's Extension Manager](https://install.anastasiy.com/)
ou o ExManCmd. Sem assinatura, só funciona com `PlayerDebugMode` ligado —
aceitável na máquina do designer, não para venda.

## Serviço de remoção de fundo

Veja [`03-remocao-de-fundo.md`](03-remocao-de-fundo.md). Resumo:

```bash
cd tools/bgremove
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python servidor.py --pre-carregar birefnet-general
```

Para o cliente não precisar abrir terminal todo dia, empacote com PyInstaller
e coloque no login items (macOS) ou na pasta Inicializar (Windows).

## O que ainda não foi validado dentro do Adobe

Este repositório foi escrito e testado fora dos programas: o núcleo tem testes
automatizados e o serviço local foi testado de ponta a ponta, mas a camada que
fala com o Photoshop e com o Illustrator **precisa de uma passada na máquina
real**. Os pontos a conferir primeiro, em ordem de risco:

1. Painel CEP abre no Illustrator do cliente (o risco do macOS acima).
2. `tryCreateArtboards` no Photoshop — o descritor de prancheta muda entre
   versões. Se falhar, o painel avisa e segue no modo tela contínua, que é o
   caminho principal.
3. `exportForScreens` no Illustrator — se a versão não aceitar as opções, o
   código cai sozinho no `exportFile`, uma prancheta por vez.
4. `removeBackground` no Photoshop — se a versão não tiver a ação, cai no
   `autoCutout`.

Os quatro já têm caminho alternativo no código. O que precisa é confirmar qual
caminho cada versão usa.
