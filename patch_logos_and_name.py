import re

def update_file():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update CSS pseudo-element content
    content = content.replace("content: 'Vós';", "content: 'Antigravity';")
    
    # 2. Update FAQ text
    content = content.replace("A Vós atende fora de São Paulo?", "A Antigravity atende fora de São Paulo?")
    
    # 3. Update Footer
    content = content.replace('<a href="#" class="footer-logo">Vós</a>', '<a href="#" class="footer-logo">Antigravity</a>')
    content = content.replace('Vós Agência. Todos os direitos reservados.', 'Antigravity. Todos os direitos reservados.')
    
    # 4. Update Developer credits in demo Modals
    content = content.replace('Desenvolvido com excelência por Vós Agência', 'Desenvolvido com excelência por Antigravity')
    
    # 5. Update Floating WhatsApp CTA URL & Label
    old_wa = 'https://wa.me/5511922129185?text=Ol%C3%A1%21%20Acessei%20o%20site%20da%20V%C3%B3s%20Ag%C3%AAncia%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20sobre%20os%20servi%C3%A7os.'
    new_wa = 'https://wa.me/5511999999999?text=Ol%C3%A1%21%20Acessei%20o%20site%20da%20Antigravity%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20sobre%20o%20meu%20projeto.'
    content = content.replace(old_wa, new_wa)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    update_file()
