import re

def update_file():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Title and description
    content = re.sub(
        r'<title>.*?</title>',
        '<title>Antigravity | Agência Criativa 72h</title>',
        content
    )
    content = re.sub(
        r'<meta name="description" content=".*?">',
        '<meta name="description" content="A Antigravity é a agência que transforma sua ideia em realidade com design premium, atendimento de verdade e entrega em tempo recorde (até 72 horas).">',
        content
    )

    # 2. Update Nav Logo
    content = re.sub(
        r'<a href="#" class="nav-logo">Vós</a>',
        '<a href="#" class="nav-logo" style="font-size:1.8rem; letter-spacing:1px; font-family:\'Outfit\', sans-serif; font-weight:900;">ANTIGRAVITY</a>',
        content
    )

    # 3. Update Hero
    hero_title_old = r'<h1 class="hero-title">Seu site profissional <span class="highlight">em até 72 horas\.</span></h1>'
    hero_title_new = '<h1 class="hero-title">Seu projeto criativo pronto para o mundo. <br><span class="highlight">Em até 72 horas.</span></h1>'
    content = re.sub(hero_title_old, hero_title_new, content)

    hero_sub_old = r'<p class="hero-subtitle">\s*Criamos sites que vendem, identidades visuais que impressionam e conteúdo que engaja — com quem realmente entende do mercado brasileiro\.\s*</p>'
    hero_sub_new = '<p class="hero-subtitle">\n                    Velocidade que impressiona. Qualidade que converte. A Antigravity é a agência que transforma sua ideia em realidade com design premium, atendimento de verdade e entrega em tempo recorde.\n                </p>'
    content = re.sub(hero_sub_old, hero_sub_new, content)

    # 4. Update Hero CTAs
    hero_cta_old = r'<a href="https://wa.me/5511922129185\?text=.*?</a>\s*<a href="#portfolio".*?</a>'
    hero_cta_new = """<a href="#comprar" class="glass-container glass-primary-btn">
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="glass-content">⚡ Contratar Agora (72h)</div>
</a>
<a href="https://wa.me/5511999999999?text=Ol%C3%A1%21%20Quero%20um%20or%C3%A7amento%20personalizado%20para%20meu%20projeto.%20Pode%20me%20ajudar%3F" class="glass-container" target="_blank">
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="glass-content">💬 Pedir orçamento</div>
</a>"""
    content = re.sub(hero_cta_old, hero_cta_new, content, flags=re.DOTALL)

    # 5. Replace Services Grid
    services_grid_old = r'<div class="services-grid">.*?</div>\n        </div>\n    </section>'
    services_grid_new = """<div class="services-grid">
                <div class="service-card fade-up stagger-1">
                    <div class="service-icon"><i class="fas fa-laptop-code"></i></div>
                    <h3>Criação de Sites</h3>
                    <p>Sites de alta conversão, rápidos e com design premium. Transforme visitantes em clientes.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
                <div class="service-card fade-up stagger-2">
                    <div class="service-icon"><i class="fas fa-video"></i></div>
                    <h3>Edição de Vídeo</h3>
                    <p>Edição dinâmica e profissional para prender a atenção do seu público do primeiro ao último segundo.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
                <div class="service-card fade-up stagger-3">
                    <div class="service-icon"><i class="fas fa-image"></i></div>
                    <h3>Edição de Imagem</h3>
                    <p>Tratamento avançado e alta resolução para valorizar seus produtos e marca.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
                <div class="service-card fade-up stagger-1">
                    <div class="service-icon"><i class="fas fa-paint-brush"></i></div>
                    <h3>Ilustrações</h3>
                    <p>Arte digital sob medida para dar uma identidade única e memorável ao seu negócio.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
                <div class="service-card fade-up stagger-2">
                    <div class="service-icon"><i class="fas fa-hashtag"></i></div>
                    <h3>Posts para Instagram</h3>
                    <p>Carrosséis e artes únicas que engajam e vendem. O visual que seu perfil precisa.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
                <div class="service-card fade-up stagger-3">
                    <div class="service-icon"><i class="fas fa-mobile-alt"></i></div>
                    <h3>Criação de Aplicativos</h3>
                    <p>Apps nativos Android/iOS com design impecável e experiência fluida.</p>
                    <a href="#contato" class="highlight" style="text-decoration:none; font-weight:600;">Ver detalhes →</a>
                </div>
            </div>
            
            <div style="text-align:center; margin-top:3rem;" class="fade-up">
                <p style="color:var(--clr-primary); font-size:1.1rem; font-weight:bold;">Nosso compromisso: Qualquer serviço entregue em até 72 horas, com comunicação direta, sem robôs.</p>
            </div>
        </div>
    </section>"""
    content = re.sub(services_grid_old, services_grid_new, content, flags=re.DOTALL)


    # 6. Insert Pacotes and PIX between Target Section and Portfolio
    pacotes_pix_html = """
    <!-- PACOTES & PLANOS -->
    <section class="why-section fade-up" id="pacotes" style="padding-top:2rem;">
        <div class="container">
            <h2 class="section-title">Monte <span class="highlight">seu pacote</span></h2>
            <p class="section-subtitle">Pacotes de Social Media e Planos de Fidelidade.</p>
            
            <div class="why-grid" style="grid-template-columns: 1fr;">
                <div class="w-card dark-card" style="text-align:center;">
                    <h3>Configurador de Instagram</h3>
                    <p style="margin-bottom:2rem;">Escolha o volume, formato e duração para ver o valor estimado.</p>
                    
                    <div style="display:flex; justify-content:center; gap:2rem; flex-wrap:wrap; text-align:left;">
                        <div>
                            <h4 style="color:var(--clr-primary); margin-bottom:1rem;">Duração</h4>
                            <select id="config-duracao" style="background:rgba(0,0,0,0.5); color:#fff; border:1px solid var(--clr-primary); padding:0.8rem; border-radius:8px; width:200px;">
                                <option value="1">1 Semana</option>
                                <option value="4" selected>1 Mês</option>
                                <option value="12">3 Meses</option>
                                <option value="24">6 Meses</option>
                            </select>
                        </div>
                        <div>
                            <h4 style="color:var(--clr-primary); margin-bottom:1rem;">Volume Semanal</h4>
                            <select id="config-volume" style="background:rgba(0,0,0,0.5); color:#fff; border:1px solid var(--clr-primary); padding:0.8rem; border-radius:8px; width:200px;">
                                <option value="300">3 Posts</option>
                                <option value="450" selected>5 Posts</option>
                                <option value="500">3 Posts + 1 Vídeo</option>
                                <option value="700">2 Posts + 2 Vídeos</option>
                            </select>
                        </div>
                        <div>
                            <h4 style="color:var(--clr-primary); margin-bottom:1rem;">Formato</h4>
                            <select id="config-formato" style="background:rgba(0,0,0,0.5); color:#fff; border:1px solid var(--clr-primary); padding:0.8rem; border-radius:8px; width:200px;">
                                <option value="1.0">Carrosséis</option>
                                <option value="0.85">Posts Únicos</option>
                                <option value="0.7">Stories</option>
                                <option value="1.15">Mix</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="margin-top:3rem;">
                        <h3 style="font-size:2rem;">Investimento: <span id="config-price" class="highlight">R$ 1.800</span></h3>
                    </div>
                </div>
            </div>
            
            <div class="why-grid" style="margin-top:4rem;">
                <div class="w-card dark-card" style="text-align:center;">
                    <h3>Plano Aceleração (3 Meses)</h3>
                    <div style="font-size:2.5rem; font-family:var(--ff-heading); color:var(--clr-primary); margin:1rem 0;">R$ 2.100<span style="font-size:1rem;color:var(--clr-text-muted)">/mês</span></div>
                    <p>Consistência que gera resultados. Prioridade na fila e reunião de alinhamento.</p>
                </div>
                <div class="w-card dark-card" style="text-align:center;">
                    <h3>Plano Dominância (6 Meses)</h3>
                    <div style="font-size:2.5rem; font-family:var(--ff-heading); color:var(--clr-primary); margin:1rem 0;">R$ 1.800<span style="font-size:1rem;color:var(--clr-text-muted)">/mês</span></div>
                    <p>Para marcas que querem dominar. Ajustes ilimitados e relatórios mensais.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- AREA DE COMPRA (PIX) -->
    <section class="why-section fade-up" id="comprar" style="background:var(--clr-bg); border-top:none;">
        <div class="container">
            <div class="cta-box" style="padding:4rem 2rem;">
                <div class="orb-cta"></div>
                <h2>Pronto para decolar? 🚀</h2>
                <p style="margin-bottom:3rem; font-size:1.1rem;">Descreva seu projeto em poucos passos e garanta sua entrega em até 72 horas com pagamento seguro via PIX.</p>
                
                <div style="text-align:left; max-width:600px; margin:0 auto;">
                    <div style="margin-bottom:1.5rem;">
                        <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">O que você precisa hoje?</label>
                        <select id="pix-service" style="width:100%; padding:1rem; border-radius:8px; background:rgba(0,0,0,0.5); color:#fff; border:1px solid rgba(255,255,255,0.2);">
                            <option value="Criação de Site Completo">Criação de Site Completo</option>
                            <option value="Edição de Vídeo">Edição de Vídeo</option>
                            <option value="Pacote Social Media">Pacote Social Media</option>
                            <option value="Identidade Visual / Ilustração">Identidade Visual / Ilustração</option>
                            <option value="Aplicativo Native">Aplicativo Native</option>
                        </select>
                    </div>
                    <div style="margin-bottom:2rem;">
                        <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">Estilo Desejado e Referências</label>
                        <textarea style="width:100%; padding:1rem; border-radius:8px; background:rgba(0,0,0,0.5); color:#fff; border:1px solid rgba(255,255,255,0.2);" rows="3" placeholder="Ex: Quero um site moderno..."></textarea>
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:2rem;">
                        <div>
                            <span style="color:var(--clr-text-muted);">Valor Estimado:</span>
                            <div id="pix-price" style="font-size:1.8rem; font-family:var(--ff-heading); color:var(--clr-primary);">R$ 3.500</div>
                        </div>
                        <button class="btn btn-primary" onclick="alert('Integração Mercado Pago / PagSeguro seria acionada aqui para gerar o QRCode PIX!')">Monte seu projeto e pague agora</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    """
    
    # We'll insert this just before the portfolio section
    content = content.replace('<section class="portfolio-section" id="portfolio">', pacotes_pix_html + '\n    <section class="portfolio-section" id="portfolio">')

    # 7. Update Portfolio Titles
    content = content.replace('<h2><span class="highlight">Projetos</span> de destaque</h2>', '<h2>Não prometemos. <span class="highlight">Nós entregamos.</span></h2>')
    content = content.replace('<p class="section-subtitle">Alguns dos trabalhos que transformaram os resultados dos nossos clientes.</p>', '<p class="section-subtitle">Confira alguns dos projetos reais que transformaram o negócio dos nossos clientes em até 72h.</p>')

    # 8. Update Testimonials (Tests Section)
    tests_grid_old = r'<div class="tests-grid">.*?</div>\n        </div>\n    </section>'
    tests_grid_new = """<div class="tests-grid">
                <div class="test-card">
                    <div class="stars">★★★★★</div>
                    <p class="quote">"A Antigravity me surpreendeu. Prometeram o site em 72h e entregaram uma máquina de vendas muito antes do prazo. O design ficou impecável e o atendimento foi super humano."</p>
                    <div class="client-info">
                        <div class="avatar" style="display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.5rem;">G</div>
                        <div class="client-meta">
                            <h4>Gustavo</h4>
                            <p>Criação de Sites</p>
                        </div>
                    </div>
                </div>
                <div class="test-card">
                    <div class="stars">★★★★★</div>
                    <p class="quote">"Precisávamos de um app rápido para um evento e o resultado foi incrível. UI perfeita e zero bugs."</p>
                    <div class="client-info">
                        <div class="avatar" style="display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.5rem;">C</div>
                        <div class="client-meta">
                            <h4>Camila</h4>
                            <p>App Nativo</p>
                        </div>
                    </div>
                </div>
                <div class="test-card">
                    <div class="stars">★★★★★</div>
                    <p class="quote">"Os criativos para minhas campanhas nunca foram tão bons. Recomendo o plano mensal de olhos fechados!"</p>
                    <div class="client-info">
                        <div class="avatar" style="display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.5rem;">R</div>
                        <div class="client-meta">
                            <h4>Ronald</h4>
                            <p>Social Media</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>"""
    content = re.sub(tests_grid_old, tests_grid_new, content, flags=re.DOTALL)

    # 9. Inject JS for Configurator and PIX at the end of the body
    js_logic = """
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Configurator Logic
    const duracaoSel = document.getElementById('config-duracao');
    const volumeSel = document.getElementById('config-volume');
    const formatoSel = document.getElementById('config-formato');
    const priceDisplay = document.getElementById('config-price');

    if(duracaoSel && volumeSel && formatoSel && priceDisplay) {
        function calcPrice() {
            let dur = parseInt(duracaoSel.value);
            let vol = parseInt(volumeSel.value);
            let form = parseFloat(formatoSel.value);
            
            let base = dur * vol * form;
            if (dur === 4) base *= 0.95;
            if (dur === 12) base *= 0.85;
            if (dur === 24) base *= 0.75;
            
            priceDisplay.textContent = 'R$ ' + Math.round(base).toLocaleString('pt-BR');
        }
        
        duracaoSel.addEventListener('change', calcPrice);
        volumeSel.addEventListener('change', calcPrice);
        formatoSel.addEventListener('change', calcPrice);
        calcPrice();
    }

    // PIX Logic
    const pixSrv = document.getElementById('pix-service');
    const pixPrice = document.getElementById('pix-price');
    const prices = {
        'Criação de Site Completo': 'R$ 3.500',
        'Edição de Vídeo': 'R$ 800',
        'Pacote Social Media': 'A partir de R$ 1.500',
        'Identidade Visual / Ilustração': 'R$ 2.000',
        'Aplicativo Native': 'A partir de R$ 5.000'
    };
    
    if(pixSrv && pixPrice) {
        pixSrv.addEventListener('change', () => {
            pixPrice.textContent = prices[pixSrv.value] || 'R$ A definir';
        });
        pixPrice.textContent = prices[pixSrv.value];
    }
});
</script>
</body>
"""
    content = content.replace('</body>', js_logic)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    update_file()
    print("Patch applied successfully.")
