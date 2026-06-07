import re

def revert():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Revert titles and names
    content = content.replace('Antigravity | Agência Criativa 72h', 'Vós | Agência Criativa 72h')
    content = content.replace('A Antigravity é a agência', 'A Vós é a agência')
    content = content.replace('Antigravity · Agência Criativa', 'Vós · Agência Criativa')
    content = content.replace('na Antigravity.', 'na Vós.')
    content = content.replace('da Antigravity', 'da Vós')
    content = content.replace('A Antigravity me surpreendeu', 'A Vós me surpreendeu')
    
    # Revert Logo
    logo_pattern = r'<a href="#" class="nav-logo"[^>]*>.*?ANTIGRAVITY.*?</a>'
    logo_replacement = '<a href="#" class="nav-logo">Vós</a>'
    content = re.sub(logo_pattern, logo_replacement, content, flags=re.IGNORECASE|re.DOTALL)
    
    # CSS pseudo elements
    content = content.replace('content: "ANTIGRAVITY";', 'content: "VÓS";')
    content = content.replace("content: 'ANTIGRAVITY';", "content: 'VÓS';")
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    revert()
    print("Reverted to Vós.")
