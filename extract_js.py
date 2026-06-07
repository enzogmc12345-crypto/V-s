import re

def extract_js():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    scripts = re.findall(r'<script.*?>(.*?)</script>', content, flags=re.DOTALL)
    
    with open('all_scripts.js', 'w', encoding='utf-8') as f:
        for idx, script in enumerate(scripts):
            f.write(f"// Script {idx}\n")
            f.write(script + "\n")

if __name__ == '__main__':
    extract_js()
