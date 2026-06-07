import re
import subprocess
import os

def render_cover():
    html_path = "/Users/usermac/Downloads/portifólio/vós/index.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract <g id="cristan-sheep-icon">...</g>
    sheep_match = re.search(r'(<g id="cristan-sheep-icon">.*?</g>)', html, re.DOTALL)
    if not sheep_match:
        print("Error: Could not find cristan-sheep-icon in index.html")
        return
    sheep_svg = sheep_match.group(1)

    # Extract <clipPath id="cristan-logo-clip">...</clipPath>
    clip_match = re.search(r'(<clipPath id="cristan-logo-clip">.*?</clipPath>)', html, re.DOTALL)
    if not clip_match:
        print("Error: Could not find cristan-logo-clip in index.html")
        return
    clip_svg = clip_match.group(1)

    # Extract <g id="cristan-master-logo-negative">...</g>
    logo_match = re.search(r'(<g id="cristan-master-logo-negative">.*?</g>)', html, re.DOTALL)
    if not logo_match:
        print("Error: Could not find cristan-master-logo-negative in index.html")
        return
    logo_svg = logo_match.group(1)

    # Let's construct a beautiful SVG for the cover!
    svg_content = f"""<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    {clip_svg}
    {sheep_svg}
    {logo_svg}
  </defs>

  <!-- Warm Off-white Custard background -->
  <rect width="1024" height="1024" fill="#F5F4EE" />

  <!-- Logo nested in center with scaling -->
  <g transform="translate(362, 160) scale(1.0)">
    <use href="#cristan-master-logo-negative" transform="scale(1.0)" />
  </g>

  <!-- Title "Café do Cordeiro" in Georgia serif font -->
  <text x="512" y="580" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="bold" fill="#3A1A12" text-anchor="middle">Café do Cordeiro</text>

  <!-- Wavy color palette at the bottom -->
  <g transform="translate(0, 720)">
    <!-- Swatch 1: Espresso Dark (#3A1A12) -->
    <path d="M 0 0 L 256 0 C 226 80, 286 240, 256 304 L 0 304 Z" fill="#3A1A12" />

    <!-- Swatch 2: Terracota Red (#B32000) -->
    <path d="M 256 0 C 226 80, 286 240, 256 304 L 512 304 C 542 240, 482 80, 512 0 Z" fill="#B32000" />

    <!-- Swatch 3: Custard Creme (#F0E7C8) -->
    <path d="M 512 0 C 482 80, 542 240, 512 304 L 768 304 C 798 240, 738 80, 768 0 Z" fill="#F0E7C8" />

    <!-- Swatch 4: Warm Off-White (#FBFBF9) -->
    <path d="M 768 0 C 738 80, 798 240, 768 304 L 1024 304 L 1024 0 Z" fill="#FBFBF9" />
  </g>
</svg>
"""

    temp_svg_path = "cover.svg"
    with open(temp_svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("SVG generated successfully. Rendering PNG with qlmanage...")
    
    # Render using qlmanage
    subprocess.run(["qlmanage", "-t", "-s", "1024", "-o", ".", temp_svg_path])
    
    # Rename generated file to cristan_brandbook_cover.png
    generated_png = "cover.svg.png"
    target_png = "cristan_brandbook_cover.png"
    if os.path.exists(generated_png):
        if os.path.exists(target_png):
            os.remove(target_png)
        os.rename(generated_png, target_png)
        print("Success! Cover image rendered and updated at cristan_brandbook_cover.png")
    else:
        print("Error: cover.svg.png was not generated.")

if __name__ == "__main__":
    render_cover()
