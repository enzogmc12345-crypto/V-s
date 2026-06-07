import re

def check_balance():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # remove comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    # remove scripts
    content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)
    # remove svg
    content = re.sub(r'<svg.*?>.*?</svg>', '', content, flags=re.DOTALL)

    div_open = len(re.findall(r'<div\b[^>]*>', content))
    div_close = len(re.findall(r'</div>', content))
    
    section_open = len(re.findall(r'<section\b[^>]*>', content))
    section_close = len(re.findall(r'</section>', content))

    print(f"div: open {div_open}, close {div_close}")
    print(f"section: open {section_open}, close {section_close}")

if __name__ == '__main__':
    check_balance()
