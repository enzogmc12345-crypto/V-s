import re

css_code = """
/* ====== DEMO DENTIST SITE STYLES ====== */
.dds { font-family: 'DM Sans', sans-serif; color: #333; line-height: 1.6; background: #fff; text-align: left; }
.dds * { box-sizing: border-box; margin: 0; padding: 0; }
.dds h1, .dds h2, .dds h3 { font-family: 'DM Sans', sans-serif; font-weight: 700; color: #1a498b; }
.dds img { max-width: 100%; height: auto; display: block; }
.dds-topbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 40px; background: #1a498b; color: #fff; font-size: 0.85rem; }
.dds-topbar-left { display: flex; gap: 20px; align-items: center; }
.dds-topbar-left span { display: flex; align-items: center; gap: 6px; }
.dds-topbar-right { display: flex; gap: 12px; }
.dds-topbar-right a { color: #fff; font-size: 0.9rem; transition: opacity 0.2s; }
.dds-nav { display: flex; align-items: center; padding: 0 40px; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 10; height: 80px; }
.dds-nav-logo { font-size: 1.8rem; font-weight: 800; color: #1a498b; display: flex; align-items: center; gap: 8px; }
.dds-nav-logo span { color: #00bfa5; }
.dds-nav-links { display: flex; gap: 25px; margin-left: auto; margin-right: 30px; }
.dds-nav-links a { text-decoration: none; color: #555; font-size: 0.95rem; font-weight: 600; text-transform: uppercase; transition: color 0.2s; }
.dds-nav-links a:hover { color: #00bfa5; }
.dds-nav-cta { background: #00bfa5; color: #fff; border: none; padding: 12px 25px; border-radius: 4px; font-weight: 700; cursor: pointer; text-transform: uppercase; font-size: 0.85rem; }
.dds-hero { display: flex; align-items: center; justify-content: space-between; padding: 60px 40px; background: #f0f4f8 url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop') no-repeat center right / cover; position: relative; min-height: 500px;}
.dds-hero::before { content:''; position:absolute; inset:0; background: linear-gradient(90deg, rgba(26,73,139,0.9) 0%, rgba(26,73,139,0.7) 40%, transparent 100%); z-index:1; }
.dds-hero-content { position: relative; z-index: 2; max-width: 500px; color: #fff; }
.dds-hero h1 { font-size: 3.5rem; color: #fff; line-height: 1.1; margin-bottom: 20px; text-transform: capitalize; }
.dds-hero h1 span { color: #00bfa5; }
.dds-hero p { font-size: 1.1rem; margin-bottom: 30px; color: #e0e0e0; }
.dds-hero-btns { display: flex; gap: 15px; }
.dds-hero-btns button { padding: 14px 28px; border-radius: 4px; font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; }
.dds-btn-primary { background: #00bfa5; color: #fff; }
.dds-btn-outline { background: transparent; color: #fff; border: 2px solid #fff !important; }
.dds-hero-bottom-bar { display: flex; background: #00bfa5; color: #fff; padding: 20px 40px; justify-content: space-between; align-items: center; position: relative; z-index: 2; margin-top: -30px; margin-inline: 40px; border-radius: 4px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.dds-hero-bottom-bar h3 { color: #fff; margin-bottom: 5px; font-size: 1.2rem; }
.dds-bottom-icons { display: flex; gap: 30px; }
.dds-bottom-icons div { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; font-weight: bold;}
.dds-services-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 60px 40px; background: #fff; }
.dds-srv-item { display: flex; align-items: flex-start; gap: 15px; }
.dds-srv-icon { width: 45px; height: 45px; flex-shrink: 0; background: #00bfa5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; }
.dds-srv-text h4 { font-size: 1rem; color: #1a498b; margin-bottom: 5px; }
.dds-srv-text p { font-size: 0.85rem; color: #666; }
.dds-quote-section { display: flex; padding: 60px 40px; background: #fff; gap: 40px; }
.dds-quote-form { flex: 1; background: #00bfa5; padding: 40px; border-radius: 8px; color: #fff; }
.dds-quote-form h2 { color: #fff; margin-bottom: 15px; font-size: 2rem; }
.dds-quote-form p { margin-bottom: 25px; font-size: 0.95rem; opacity: 0.9; }
.dds-quote-form input, .dds-quote-form select { width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 4px; font-family: inherit; }
.dds-quote-form button { background: #1a498b; color: #fff; border: none; padding: 12px 30px; font-weight: 700; border-radius: 4px; cursor: pointer; }
.dds-quote-img { flex: 1; background: url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop') center/cover; border-radius: 8px; min-height: 400px; }
.dds-testimonials { padding: 60px 40px; background: #f9f9f9; text-align: center; }
.dds-test-header { margin-bottom: 40px; }
.dds-test-header h3 { color: #00bfa5; font-size: 1rem; text-transform: uppercase; margin-bottom: 10px; }
.dds-test-header h2 { font-size: 2.2rem; color: #1a498b; }
.dds-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: left; }
.dds-test-card { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.dds-test-card p { font-style: italic; color: #555; margin-bottom: 20px; font-size: 0.9rem; }
.dds-test-author { display: flex; align-items: center; gap: 15px; }
.dds-test-avatar { width: 50px; height: 50px; border-radius: 50%; background: #ccc; }
.dds-test-author h4 { color: #1a498b; font-size: 1rem; margin-bottom: 2px; }
.dds-test-author span { color: #888; font-size: 0.8rem; }
.dds-team { padding: 60px 40px; background: #fff; }
.dds-team-container { display: flex; gap: 40px; align-items: center; }
.dds-team-content { flex: 1; }
.dds-team-content h3 { color: #00bfa5; font-size: 1rem; text-transform: uppercase; margin-bottom: 10px; }
.dds-team-content h2 { font-size: 2.2rem; color: #1a498b; margin-bottom: 20px; }
.dds-team-content p { color: #666; margin-bottom: 30px; }
.dds-team-img { flex: 1; border-radius: 8px; overflow: hidden; }
.dds-team-members { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
.dds-member { text-align: center; }
.dds-member img { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; }
.dds-member h4 { color: #1a498b; font-size: 1.1rem; }
.dds-member span { color: #00bfa5; font-size: 0.85rem; font-weight: bold; }
.dds-member p { color: #666; font-size: 0.85rem; margin-top: 10px; }
.dds-excellence { display: flex; padding: 60px 40px; background: #f9f9f9; align-items: center; gap: 40px; }
.dds-exc-text { flex: 1; }
.dds-exc-text h2 { font-size: 2.2rem; margin-bottom: 20px; }
.dds-exc-text p { color: #666; margin-bottom: 20px; }
.dds-exc-bars div { margin-bottom: 15px; }
.dds-exc-bars span { display: block; font-weight: bold; color: #1a498b; margin-bottom: 5px; font-size: 0.9rem;}
.dds-bar { height: 8px; background: #ddd; border-radius: 4px; overflow: hidden; }
.dds-bar-fill { height: 100%; background: #00bfa5; }
.dds-exc-img { flex: 1; border-radius: 8px; overflow: hidden; }
.dds-footer { background: #1a498b; color: #fff; padding: 40px; text-align: center; }
.dds-footer p { font-size: 0.9rem; opacity: 0.8; }
@media(max-width: 900px) {
  .dds-hero-bottom-bar, .dds-quote-section, .dds-team-container, .dds-excellence { flex-direction: column; }
  .dds-services-row, .dds-test-grid, .dds-team-members { grid-template-columns: 1fr 1fr; }
  .dds-hero-bottom-bar { margin: 20px 0 0 0; }
  .dds-nav-links { display: none; }
}
@media(max-width: 600px) {
  .dds-services-row, .dds-test-grid, .dds-team-members { grid-template-columns: 1fr; }
  .dds-hero h1 { font-size: 2.5rem; }
}
"""

html_code = """
                <div class="dds">
                    <!-- TOP CONTACT BAR -->
                    <div class="dds-topbar">
                        <div class="dds-topbar-left">
                            <span><i class="fas fa-phone-alt"></i> +55 (11) 3456-7890</span>
                            <span><i class="fas fa-envelope"></i> contato@clinicasorria.com.br</span>
                        </div>
                        <div class="dds-topbar-right">
                            <span><i class="fas fa-clock"></i> Seg - Sex: 08:00 - 18:00</span>
                        </div>
                    </div>

                    <!-- NAV -->
                    <nav class="dds-nav">
                        <div class="dds-nav-logo"><i class="fas fa-tooth"></i> <span>Sorria+</span></div>
                        <div class="dds-nav-links">
                            <a href="#">Início</a>
                            <a href="#">Sobre</a>
                            <a href="#">Serviços</a>
                            <a href="#">Equipe</a>
                            <a href="#">Depoimentos</a>
                            <a href="#">Contato</a>
                        </div>
                        <button class="dds-nav-cta">Agendar Consulta</button>
                    </nav>

                    <!-- HERO -->
                    <div class="dds-hero">
                        <div class="dds-hero-content">
                            <h1>Criando<br><span>Sorrisos Brilhantes</span></h1>
                            <p>Experimente o melhor tratamento odontológico. Nossa equipe está pronta para cuidar do seu sorriso com tecnologia avançada e muito conforto.</p>
                            <div class="dds-hero-btns">
                                <button class="dds-btn-primary">Ver Nossos Serviços</button>
                                <button class="dds-btn-outline">Conhecer a Clínca</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dds-hero-bottom-bar">
                        <div>
                            <h3>Agende Sua Avaliação</h3>
                            <p>Preencha os dados e entraremos em contato</p>
                        </div>
                        <div class="dds-bottom-icons">
                            <div><i class="fas fa-plane"></i></div>
                            <div><i class="fas fa-bed"></i></div>
                            <div><i class="fas fa-tooth"></i></div>
                        </div>
                        <div>
                            <input type="text" placeholder="Seu Telefone" style="padding:10px; border:none; border-radius:4px; margin-right:10px;">
                            <button style="background:#1a498b; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer;">Enviar</button>
                        </div>
                    </div>

                    <!-- SERVICES ROW -->
                    <div class="dds-services-row">
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-tooth"></i></div>
                            <div class="dds-srv-text">
                                <h4>Clínica Geral</h4>
                                <p>Prevenção e tratamentos essenciais.</p>
                            </div>
                        </div>
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-teeth"></i></div>
                            <div class="dds-srv-text">
                                <h4>Implantes</h4>
                                <p>Recupere seu sorriso com segurança.</p>
                            </div>
                        </div>
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-user-md"></i></div>
                            <div class="dds-srv-text">
                                <h4>Cirurgia</h4>
                                <p>Procedimentos seguros e sem dor.</p>
                            </div>
                        </div>
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-smile"></i></div>
                            <div class="dds-srv-text">
                                <h4>Ortodontia</h4>
                                <p>Alinhamento perfeito para os dentes.</p>
                            </div>
                        </div>
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-magic"></i></div>
                            <div class="dds-srv-text">
                                <h4>Clareamento</h4>
                                <p>Dentes brancos em poucas sessões.</p>
                            </div>
                        </div>
                        <div class="dds-srv-item">
                            <div class="dds-srv-icon"><i class="fas fa-tooth"></i></div>
                            <div class="dds-srv-text">
                                <h4>Extração</h4>
                                <p>Remoção de cisos e dentes danificados.</p>
                            </div>
                        </div>
                    </div>

                    <!-- QUOTE SECTION -->
                    <div class="dds-quote-section">
                        <div class="dds-quote-form">
                            <h2>Faça um Orçamento<br>Gratuito</h2>
                            <p>Preencha nosso formulário simples e rápido para receber uma estimativa dos seus tratamentos com um dos nossos especialistas.</p>
                            <input type="text" placeholder="Nome Completo">
                            <input type="email" placeholder="E-mail">
                            <input type="text" placeholder="Telefone">
                            <select>
                                <option>Qual o tratamento de interesse?</option>
                                <option>Implantes</option>
                                <option>Clareamento</option>
                                <option>Aparelho</option>
                            </select>
                            <button>Enviar Solicitação</button>
                        </div>
                        <div class="dds-quote-img" style="background-image: url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop');">
                        </div>
                    </div>

                    <!-- TESTIMONIALS -->
                    <div class="dds-testimonials">
                        <div class="dds-test-header">
                            <h3>Clientes com</h3>
                            <h2>Razões para Sorrir</h2>
                        </div>
                        <div class="dds-test-grid">
                            <div class="dds-test-card">
                                <p>"Fiz meus implantes na Sorria+ e o resultado foi fantástico. Atendimento humano, clínica impecável e sem nenhuma dor."</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/men/32.jpg') center/cover;"></div>
                                    <div>
                                        <h4>Roberto Castro</h4>
                                        <span>Paciente VIP</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dds-test-card">
                                <p>"Sempre tive muito medo de dentista, mas a equipe daqui me deixou super relaxada. Meu clareamento ficou perfeito!"</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/women/44.jpg') center/cover;"></div>
                                    <div>
                                        <h4>Laura Mendes</h4>
                                        <span>Paciente de Clareamento</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dds-test-card">
                                <p>"Coloquei aparelho invisível na clínica. Em apenas 8 meses já vejo uma diferença absurda. Profissionais super capacitados."</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/men/67.jpg') center/cover;"></div>
                                    <div>
                                        <h4>André Silva</h4>
                                        <span>Paciente de Ortodontia</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TEAM SECTION -->
                    <div class="dds-team">
                        <div class="dds-team-container">
                            <div class="dds-team-content">
                                <h3>Quem cuida de você</h3>
                                <h2>Nossos Profissionais</h2>
                                <p>Temos orgulho de contar com uma equipe de especialistas reconhecidos, sempre buscando atualizações. Oferecemos um atendimento completo para toda a família em um só lugar.</p>
                                
                                <div style="display:flex; gap:15px; margin-top:20px;">
                                    <div style="padding:10px 20px; border:2px solid #eee; border-radius:8px; color:#00bfa5; font-weight:bold;">CRO-SP</div>
                                    <div style="padding:10px 20px; border:2px solid #eee; border-radius:8px; color:#00bfa5; font-weight:bold;">ABO</div>
                                </div>
                            </div>
                            <div class="dds-team-img">
                                <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop" style="width:100%; border-radius:8px;" alt="Dentista Atendendo">
                            </div>
                        </div>

                        <div class="dds-team-members">
                            <div class="dds-member">
                                <img src="https://images.unsplash.com/photo-1612349317150-e410f624c427?q=80&w=400&auto=format&fit=crop" alt="Dr. Marcos">
                                <h4>Dr. Marcos Paulo</h4>
                                <span>Cirurgião Dentista</span>
                                <p>Especialista em implantes e cirurgias complexas com mais de 10 anos de experiência.</p>
                            </div>
                            <div class="dds-member">
                                <img src="https://images.unsplash.com/photo-1594824432258-2901594d2716?q=80&w=400&auto=format&fit=crop" alt="Dra. Aline">
                                <h4>Dra. Aline Costa</h4>
                                <span>Ortodontista</span>
                                <p>Focada em alinhadores estéticos e ortodontia preventiva para adultos e crianças.</p>
                            </div>
                            <div class="dds-member">
                                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop" alt="Dra. Camila">
                                <h4>Dra. Camila Assis</h4>
                                <span>Odontopediatra</span>
                                <p>O cuidado gentil e divertido garantem a saúde bucal das crianças e bebês.</p>
                            </div>
                        </div>
                    </div>

                    <!-- EXCELLENCE SECTION -->
                    <div class="dds-excellence">
                        <div class="dds-exc-text">
                            <h2>Sorriso Perfeito,<br><span style="color:#00bfa5;">Excelência Definida</span></h2>
                            <p>Utilizamos os materiais de mais alta qualidade e protocolos de esterilização rigorosos para garantir sua segurança total e um resultado estético impecável.</p>
                            
                            <div class="dds-exc-bars">
                                <div>
                                    <span>Satisfação dos Pacientes 98%</span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:98%;"></div></div>
                                </div>
                                <div>
                                    <span>Sucesso em Implantes 95%</span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:95%;"></div></div>
                                </div>
                                <div>
                                    <span>Pontualidade 90%</span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:90%;"></div></div>
                                </div>
                            </div>
                        </div>
                        <div class="dds-exc-img">
                            <img src="https://images.unsplash.com/photo-1601612711689-130ab9bbf340?q=80&w=600&auto=format&fit=crop" style="width:100%;" alt="Sorriso Perfeito">
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div class="dds-footer">
                        <h2 style="color:#fff; margin-bottom:10px;">Clínica Sorria+</h2>
                        <p>© 2026 Clínica Odontológica Sorria+. Todos os direitos reservados.</p>
                        <p style="margin-top:10px; font-size:0.8rem; opacity:0.6;">Design e Desenvolvimento por Vós Agência</p>
                    </div>
                </div>
"""

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace CSS
css_pattern = r'/\*\s*====== DEMO DENTIST SITE STYLES ====== \*/(.*?)@media\(max-width:768px\) {[^}]*}[^}]*}'
# Since regex might be tricky with nested curly braces, let's use string split/replace based on markers.

start_marker_css = '/* ====== DEMO DENTIST SITE STYLES ====== */'
end_marker_css = '/* TESTIMONIALS */'
start_idx_css = content.find(start_marker_css)
end_idx_css = content.find(end_marker_css)

if start_idx_css != -1 and end_idx_css != -1:
    new_content = content[:start_idx_css] + css_code + "\n" + content[end_idx_css:]
    content = new_content

# Replace HTML
start_marker_html = '<div class="dds">'
end_marker_html = '<!-- FLOATING ELEMENTS -->'
start_idx_html = content.find(start_marker_html)
# find the last closing div of the modal before floating elements
end_idx_html = content.find(end_marker_html)

if start_idx_html != -1 and end_idx_html != -1:
    # Need to keep the enclosing </div></div></div> etc that are before FLOATING ELEMENTS
    # The actual demo-modal-body ends a bit before.
    # Let's replace just the <div class="dds"> ... </div> segment
    
    # We can match up to the end of <div class="dds">
    # Looking at original code, after <div class="dds-footer">...</div> there is a closing </div> for .dds, then </div> for .demo-modal-body, etc.
    
    # We will replace from <div class="dds"> to the </div> right before </div> <!-- demo-modal-body -->
    # Actually, it's easier to find <div class="dds"> and the next <!-- FLOATING ELEMENTS --> and adjust.
    
    html_to_replace = content[start_idx_html:end_idx_html]
    # We want to keep the closing divs:
    #             </div>
    #         </div>
    #     </div>
    closing_divs = "\n            </div>\n        </div>\n    </div>\n\n    "
    
    new_content = content[:start_idx_html] + html_code + closing_divs + content[end_idx_html:]
    content = new_content

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
