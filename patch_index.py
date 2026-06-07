import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace portfolio-grid
new_grid = """            <div class="portfolio-grid">
                <!-- Item 1 — Élise Moda -->
                <div class="ptf-item mix site" data-cat="site" id="moda-card" onclick="document.getElementById('demo-moda').classList.add('active')">
                    <div class="ptf-img" id="moda-thumb-container" style="padding:0; overflow:hidden; display:flex; justify-content:center; align-items:center; background-color:#f9f9f9;">
                        <img src="site de moda/logo.png" alt="Capa Site Élise Moda" style="width:100%; height:100%; object-fit:contain; padding:2rem;">
                    </div>
                    <div class="ptf-info">
                        <h3>Élise — Loja de Moda</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🛍️ Moda</span>
                            <span class="ptf-srv">E-commerce</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">👁️ Visualizar site →</div></div></div>
                </div>
            </div>"""

content = re.sub(r'<div class="portfolio-grid">.*?</div>\n            \n            <div style="text-align: center; margin-top: 3rem;">', new_grid + '\n            \n            <div style="text-align: center; margin-top: 3rem;">', content, flags=re.DOTALL)

# Replace existing demo modals (from line 1905 to 2232 roughly)
new_modal = """    <!-- DEMO SITE MODAL — Élise Moda -->
    <div class="demo-modal-overlay" id="demo-moda" onclick="if(event.target===this)this.classList.remove('active')">
        <div class="demo-modal">
            <div class="demo-modal-bar">
                <div class="demo-modal-dots"><span></span><span></span><span></span></div>
                <div class="demo-modal-url"><i class="fas fa-lock"></i> elise.com.br</div>
                <button class="demo-modal-close" onclick="document.getElementById('demo-moda').classList.remove('active')" aria-label="Fechar">✕</button>
            </div>
            <div class="demo-modal-body" style="padding:0; overflow-y:auto; overflow-x:hidden;">
                <iframe src="site de moda/index.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
            </div>
        </div>
    </div>"""

content = re.sub(r'<!-- DEMO SITE MODAL — Clínica Sorria\+ -->.*?<!-- DEMO SITE MODAL — Site Ronald -->\n.*?</div>\n    </div>', new_modal, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

