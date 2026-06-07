import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pacotes_pattern = r'    <!-- PACOTES & PLANOS -->.*?id="pacotes".*?</section>'
pacotes_match = re.search(pacotes_pattern, content, flags=re.DOTALL)
if pacotes_match:
    print("Found pacotes:", len(pacotes_match.group(0)))
else:
    print("pacotes NOT found")

comprar_pattern = r'    <!-- AREA DE COMPRA \(PIX\) -->.*?id="comprar".*?</section>'
comprar_match = re.search(comprar_pattern, content, flags=re.DOTALL)
if comprar_match:
    print("Found comprar:", len(comprar_match.group(0)))
else:
    print("comprar NOT found")

card_pattern = r'<div class="s-card dark-card fade-up">.*?Ver detalhes →</a>\n                </div>'
cards = re.findall(card_pattern, content, flags=re.DOTALL)
print("Found cards:", len(cards))
