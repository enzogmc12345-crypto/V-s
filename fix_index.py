import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove modal and the openServiceModal script
modal_pattern = r'    <!-- DEMO MODAL — Service Checkout -->.*?</div>\n        </div>\n    </div>\n'
content = re.sub(modal_pattern, '', content, flags=re.DOTALL)

script_pattern = r'    function openServiceModal\(serviceName\) \{.*?\n    \}\n'
content = re.sub(script_pattern, '', content, flags=re.DOTALL)

# 2. Map old links to the new servico.html?id=...
replacements = [
    ("openServiceModal('Criação de Site Completo')", "window.location.href='servico.html?id=criacao-de-sites'"),
    ("openServiceModal('Edição de Vídeo')", "window.location.href='servico.html?id=edicao-de-video'"),
    # The third is Edição de Imagem
    ("openServiceModal('Identidade Visual / Ilustração')", "window.location.href='servico.html?id=edicao-de-imagem'", 1),
    # The fourth is Ilustrações (let's use the same or a new id, we can just use edicao-de-imagem for both for now, or create an ilustracoes id)
    # Actually, in the HTML, they appear in order: Sites, Vídeo, Imagem, Ilustrações, Social Media, App
    ("openServiceModal('Identidade Visual / Ilustração')", "window.location.href='servico.html?id=edicao-de-imagem'", 1),
    ("openServiceModal('Pacote Social Media')", "window.location.href='servico.html?id=social-media'"),
    ("openServiceModal('Aplicativo Native')", "window.location.href='servico.html?id=aplicativos'")
]

# Manual replace to ensure we get exactly what we want in order
content = content.replace("openServiceModal('Criação de Site Completo')", "window.location.href='servico.html?id=criacao-de-sites'")
content = content.replace("openServiceModal('Edição de Vídeo')", "window.location.href='servico.html?id=edicao-de-video'")
content = content.replace("openServiceModal('Pacote Social Media')", "window.location.href='servico.html?id=social-media'")
content = content.replace("openServiceModal('Aplicativo Native')", "window.location.href='servico.html?id=aplicativos'")

# For Identidade Visual / Ilustração, there are two. Let's just point both to edicao-de-imagem.
content = content.replace("openServiceModal('Identidade Visual / Ilustração')", "window.location.href='servico.html?id=edicao-de-imagem'")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
