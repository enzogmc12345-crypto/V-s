with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

services_map = {
    'Criação de Sites': 'Criação de Site Completo',
    'Edição de Vídeo': 'Edição de Vídeo',
    'Edição de Imagem': 'Identidade Visual / Ilustração',
    'Ilustrações': 'Identidade Visual / Ilustração',
    'Posts para Instagram': 'Pacote Social Media',
    'Criação de Aplicativos': 'Aplicativo Native'
}

current_service = None
for i, line in enumerate(lines):
    if '<h3>' in line:
        for key in services_map:
            if key in line:
                current_service = services_map[key]
                break
    
    if 'Ver detalhes →' in line and current_service:
        lines[i] = line.replace('href="#contato"', f'href="javascript:void(0)" onclick="openServiceModal(\'{current_service}\')"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
