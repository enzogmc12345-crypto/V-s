import re

def fix_feimage():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <feImage ... > that do not end with />
    # We'll use regex: <feImage([^>]*[^\/])>
    # And replace with <feImage\1 />
    
    new_content = re.sub(r'<feImage([^>]*[^\/])>', r'<feImage\1 />', content)
    
    if new_content != content:
        with open('index.html', 'w', encoding='utf-8') as fw:
            fw.write(new_content)
        print("Fixed feImage tags!")
    else:
        print("No unclosed feImage tags found.")

if __name__ == '__main__':
    fix_feimage()
