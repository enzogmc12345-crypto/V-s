import re

def process():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Extract and delete `#pacotes`
    pacotes_pattern = r'    <!-- PACOTES & PLANOS -->.*?id="pacotes".*?</section>\n'
    pacotes_match = re.search(pacotes_pattern, content, flags=re.DOTALL)
    if pacotes_match:
        pacotes_html = pacotes_match.group(0)
        content = content.replace(pacotes_html, '')
    else:
        pacotes_html = ''

    # 2. Extract and delete `#comprar`
    comprar_pattern = r'    <!-- AREA DE COMPRA \(PIX\) -->.*?id="comprar".*?</section>\n'
    comprar_match = re.search(comprar_pattern, content, flags=re.DOTALL)
    if comprar_match:
        comprar_html = comprar_match.group(0)
        content = content.replace(comprar_html, '')
    else:
        comprar_html = ''

    # 3. Create the Modal HTML
    if pacotes_html:
        pacotes_html = pacotes_html.replace('fade-up', '')
        pacotes_html = pacotes_html.replace('style="padding-top:2rem;"', 'style="padding-top:2rem; background:transparent;"')
    if comprar_html:
        comprar_html = comprar_html.replace('fade-up', '')
        comprar_html = comprar_html.replace('style="background:var(--clr-bg); border-top:none;"', 'style="background:transparent; border-top:none; padding:0 0 4rem 0;"')

    modal_html = f"""
    <!-- DEMO MODAL — Service Checkout -->
    <div class="demo-modal-overlay" id="demo-service" onclick="if(event.target===this)this.classList.remove('active')" style="z-index:9999;">
        <div class="demo-modal" style="background:#0F0F0F; color:#FFF; max-width:900px; height:85vh; border-radius:16px;">
            <div class="demo-modal-bar" style="background:#171717; border-bottom:1px solid #262626; display:flex; justify-content:space-between; padding:0 1rem; align-items:center; height:45px;">
                <div class="demo-modal-dots" style="display:flex; gap:6px;">
                    <span style="width:12px; height:12px; background:#FF5F56; border-radius:50%;"></span>
                    <span style="width:12px; height:12px; background:#FFBD2E; border-radius:50%;"></span>
                    <span style="width:12px; height:12px; background:#27C93F; border-radius:50%;"></span>
                </div>
                <div class="demo-modal-url" style="background:#262626; border:1px solid #333; color:#AAA; padding:4px 12px; border-radius:6px; font-size:0.85rem; flex:1; max-width:300px; text-align:center;"><i class="fas fa-shopping-cart"></i> vos.com.br/checkout</div>
                <button class="demo-modal-close" onclick="document.getElementById('demo-service').classList.remove('active')" aria-label="Fechar" style="color:#888; background:none; border:none; font-size:1.2rem; cursor:pointer;">✕</button>
            </div>
            <div class="demo-modal-body" style="padding:0; display:flex; flex-direction:column; background:#080808; overflow-y:auto; height:calc(100% - 45px);">
{pacotes_html}
{comprar_html}
            </div>
        </div>
    </div>
"""

    content = content.replace('<!-- SCRIPTS -->', modal_html + '\n    <!-- SCRIPTS -->')

    # 4. Update "Ver detalhes ->" links
    services_map = [
        ('Criação de Sites', 'Criação de Site Completo'),
        ('Edição de Vídeo', 'Edição de Vídeo'),
        ('Edição de Imagem', 'Identidade Visual / Ilustração'),
        ('Ilustrações', 'Identidade Visual / Ilustração'),
        ('Posts para Instagram', 'Pacote Social Media'),
        ('Criação de Aplicativos', 'Aplicativo Native')
    ]
    
    def replace_ver_detalhes(match):
        block = match.group(0)
        title_match = re.search(r'<h3>(.*?)</h3>', block)
        if title_match:
            title = title_match.group(1)
            mapped_service = 'Pacote Social Media'
            for key, val in services_map:
                if key in title:
                    mapped_service = val
                    break
            
            new_link = f'<a href="javascript:void(0)" onclick="openServiceModal(\'{mapped_service}\')" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>'
            block = re.sub(r'<a href="#contato"[^>]*>Ver detalhes →</a>', new_link, block)
            return block
        return block

    card_pattern = r'<div class="service-card fade-up.*?</div>'
    content = re.sub(card_pattern, replace_ver_detalhes, content, flags=re.DOTALL)
    
    # 5. Add the JS function openServiceModal
    js_func = """
    function openServiceModal(serviceName) {
        document.getElementById('demo-service').classList.add('active');
        const pixSelect = document.getElementById('pix-service');
        if (pixSelect && serviceName) {
            pixSelect.value = serviceName;
            pixSelect.dispatchEvent(new Event('change'));
        }
    }
</script>
"""
    content = content.replace('</script>\n</body>', js_func + '</body>')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    process()
    print("Done moving sections.")
