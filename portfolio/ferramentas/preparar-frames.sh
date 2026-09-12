#!/bin/bash
# =============================================================================
#  preparar-frames.sh
#
#  Pega a pasta com os frames originais do vídeo do avatar (aqueles 180 MB),
#  reduz a quantidade, redimensiona, comprime, renomeia em ordem e salva tudo
#  em portfolio/assets/hero/frames/ — pronto para o site usar.
#
#  COMO USAR (no Terminal do Mac):
#
#     bash portfolio/ferramentas/preparar-frames.sh "/caminho/da/pasta/frames"
#
#  Dica: em vez de digitar o caminho, arraste a pasta do Finder para dentro
#  do Terminal que ele preenche sozinho.
#
#  Opcional — mudar largura e quantidade de frames:
#     bash preparar-frames.sh "/pasta" 700 60
#                              origem  largura  qtd-de-frames
# =============================================================================

set -euo pipefail

ORIGEM="${1:-}"
LARGURA="${2:-700}"
ALVO="${3:-60}"

# pasta de destino: sempre assets/hero/frames/, relativa a este script
AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINO="$(cd "$AQUI/.." && pwd)/assets/hero/frames"

# ---------------------------------------------------------------- validações
if [ -z "$ORIGEM" ]; then
  echo "❌ Faltou dizer onde estão os frames."
  echo
  echo "   Use:  bash $0 \"/caminho/da/pasta/frames\""
  echo "   (ou arraste a pasta do Finder para o Terminal depois do comando)"
  exit 1
fi

ORIGEM="${ORIGEM%/}"                       # tira a barra final, se tiver

if [ ! -d "$ORIGEM" ]; then
  echo "❌ Não encontrei a pasta: $ORIGEM"
  exit 1
fi

# ------------------------------------------------------- lista os frames
# aceita png, jpg, jpeg e webp, em ordem alfabética (= ordem do vídeo)
ARQUIVOS=()
while IFS= read -r linha; do
  ARQUIVOS+=("$linha")
done < <(find "$ORIGEM" -maxdepth 1 -type f \
           \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) \
         | LC_ALL=C sort)

TOTAL=${#ARQUIVOS[@]}

if [ "$TOTAL" -eq 0 ]; then
  echo "❌ Não achei nenhuma imagem em: $ORIGEM"
  echo "   (procuro por .png, .jpg, .jpeg e .webp)"
  exit 1
fi

echo "📁 Origem : $ORIGEM"
echo "🖼  Frames : $TOTAL encontrados"

# ------------------------------------------- de quantos em quantos vamos pegar
PASSO=$(( (TOTAL + ALVO - 1) / ALVO ))
[ "$PASSO" -lt 1 ] && PASSO=1
echo "✂️  Usando 1 a cada $PASSO frame(s) → aproximadamente $(( TOTAL / PASSO )) frames"

# ------------------------------------------------------ escolhe a ferramenta
if command -v ffmpeg >/dev/null 2>&1; then
  MOTOR="ffmpeg"; EXT="webp"
elif command -v sips >/dev/null 2>&1; then
  MOTOR="sips";   EXT="jpg"
else
  echo "❌ Preciso do ffmpeg ou do sips (o sips já vem no macOS)."
  echo "   Para instalar o ffmpeg:  brew install ffmpeg"
  exit 1
fi
echo "⚙️  Motor  : $MOTOR (saída .$EXT, $LARGURA px de largura)"
echo

# ------------------------------------------------------------ limpa e converte
rm -rf "$DESTINO"
mkdir -p "$DESTINO"

N=0
for (( i=0; i<TOTAL; i+=PASSO )); do
  N=$(( N + 1 ))
  SAIDA=$(printf "%s/frame_%04d.%s" "$DESTINO" "$N" "$EXT")

  if [ "$MOTOR" = "ffmpeg" ]; then
    ffmpeg -loglevel error -y -i "${ARQUIVOS[$i]}" \
           -vf "scale=${LARGURA}:-2" -quality 82 "$SAIDA"
  else
    sips -Z "$LARGURA" -s format jpeg -s formatOptions 80 \
         "${ARQUIVOS[$i]}" --out "$SAIDA" >/dev/null
  fi

  printf "\r   convertendo... %d" "$N"
done
echo
echo

TAMANHO=$(du -sh "$DESTINO" | cut -f1)

echo "✅ Pronto! $N frames em assets/hero/frames/ ($TAMANHO no total)"
echo
echo "───────────────────────────────────────────────────────────────"
echo " Agora confira estas duas linhas em portfolio/js/data.js,"
echo " dentro de 'avatarFrames':"
echo
echo "     extensao: '$EXT',"
echo "     quantidade: $N,"
echo
echo " Recarregue a página e o avatar já acompanha o mouse."
echo "───────────────────────────────────────────────────────────────"

if [ "$MOTOR" = "sips" ]; then
  echo
  echo "ℹ️  Rodou com sips e gerou .jpg. Com o ffmpeg os arquivos ficam"
  echo "   bem menores (.webp). Se quiser: brew install ffmpeg"
fi
