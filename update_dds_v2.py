import sys

# Definindo o novo conteúdo HTML
html_content = """                <div class="dds">
                    <!-- TOP CONTACT BAR -->
                    <div class="dds-topbar">
                        <div class="dds-topbar-left">
                            <span><i class="fas fa-phone-alt"></i> +55 (11) 3456-7890</span>
                            <span><i class="fas fa-envelope"></i> contato@clinicasorria.com.br</span>
                            <span><i class="fas fa-map-marker-alt"></i> Av. Paulista, 1234 - São Paulo</span>
                        </div>
                        <div class="dds-topbar-right">
                            <span><i class="fas fa-clock"></i> Seg - Qui: 08:00 - 19:00 | Sex: 08:00 - 18:00</span>
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
                            <h1>Tecnologia de ponta para<br><span>Sorrisos Perfeitos</span></h1>
                            <p>Experimente o melhor tratamento odontológico. Nossa equipe está pronta para cuidar do seu sorriso com tecnologia avançada, excelência clínica e muito conforto.</p>
                            <div class="dds-hero-btns">
                                <button class="dds-btn-primary">Ver Nossos Serviços</button>
                                <button class="dds-btn-outline">Conhecer a Equipe</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dds-hero-bottom-bar">
                        <div class="dds-hbb-text">
                            <h3>Avaliação Gratuita</h3>
                            <p>Deixe seu número, ligamos para você!</p>
                        </div>
                        <div class="dds-bottom-icons">
                            <div><i class="fas fa-calendar-check"></i> Rápido</div>
                            <div><i class="fas fa-shield-alt"></i> Seguro</div>
                        </div>
                        <div class="dds-hbb-form">
                            <input type="text" placeholder="Seu Telefone" style="padding:12px; border:none; border-radius:4px; margin-right:10px; width:200px;">
                            <button style="background:#1a498b; color:#fff; border:none; padding:12px 25px; border-radius:4px; font-weight:bold; cursor:pointer;">Ligar Agora</button>
                        </div>
                    </div>

                    <!-- SOBRE NÓS -->
                    <div class="dds-about" style="padding:80px 40px; background:#fff; display:flex; gap:40px; align-items:center;">
                        <div style="flex:1;">
                            <img src="Gemini_Generated_Image_laz8e1laz8e1laz8.png" style="width:100%; border-radius:12px; box-shadow:0 15px 30px rgba(0,0,0,0.1);" alt="Clínica Moderna">
                        </div>
                        <div style="flex:1;">
                            <h3 style="color:#00bfa5; font-size:1.1rem; text-transform:uppercase; margin-bottom:10px;">Sobre Nós</h3>
                            <h2 style="font-size:2.8rem; color:#1a498b; margin-bottom:20px; line-height:1.2;">Cuidado além dos dentes, foco em você.</h2>
                            <p style="color:#555; font-size:1.05rem; margin-bottom:25px; line-height:1.7;">A Clínica Sorria+ é reconhecida por aliar atendimento humanizado às mais recentes tecnologias da odontologia mundial. Nosso objetivo não é apenas tratar dentes, mas recuperar a autoestima e promover qualidade de vida.</p>
                            <ul style="list-style:none; padding:0; color:#444; font-weight:600;">
                                <li style="margin-bottom:12px;"><i class="fas fa-check-circle" style="color:#00bfa5; margin-right:10px; font-size:1.2rem;"></i> Profissionais altamente qualificados</li>
                                <li style="margin-bottom:12px;"><i class="fas fa-check-circle" style="color:#00bfa5; margin-right:10px; font-size:1.2rem;"></i> Equipamentos de última geração</li>
                                <li style="margin-bottom:12px;"><i class="fas fa-check-circle" style="color:#00bfa5; margin-right:10px; font-size:1.2rem;"></i> Ambiente acolhedor e moderno</li>
                            </ul>
                            <button style="margin-top:20px; background:none; color:#1a498b; font-weight:bold; border:2px solid #1a498b; padding:12px 30px; border-radius:4px; font-size:1rem; cursor:pointer;">Saiba mais sobre a clínica ↑</button>
                        </div>
                    </div>

                    <!-- SERVICES SECTION -->
                    <div style="background:#f4f7fb; padding:80px 40px;">
                        <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
                            <h3 style="color:#00bfa5; font-size:1.1rem; text-transform:uppercase; margin-bottom:10px;">O Que Fazemos</h3>
                            <h2 style="font-size:2.6rem; color:#1a498b; margin-bottom:15px;">Tratamentos Odontológicos Completos</h2>
                            <p style="color:#666; font-size:1.05rem;">Oferecemos uma gama completa de serviços para garantir a saúde e a estética do seu sorriso, tudo em um só lugar.</p>
                        </div>
                        <div class="dds-services-row">
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-tooth"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Clínica Geral</h4>
                                    <p>Prevenção, limpeza, restaurações e tratamentos essenciais para saúde bucal.</p>
                                </div>
                            </div>
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-teeth"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Implantes</h4>
                                    <p>Recupere seu sorriso com segurança. Implantes de titânio de alta qualidade.</p>
                                </div>
                            </div>
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-user-md"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Cirurgia</h4>
                                    <p>Procedimentos seguros, precisos e com foco no conforto e sem dor.</p>
                                </div>
                            </div>
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-smile"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Ortodontia</h4>
                                    <p>Alinhadores transparentes e aparelhos modernos para um sorriso reto.</p>
                                </div>
                            </div>
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-magic"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Clareamento</h4>
                                    <p>Dentes visivelmente mais brancos e brilhantes em poucas sessões.</p>
                                </div>
                            </div>
                            <div class="dds-srv-item">
                                <div class="dds-srv-icon"><i class="fas fa-gem"></i></div>
                                <div class="dds-srv-text">
                                    <h4>Lentes de Contato</h4>
                                    <p>Facelas de porcelana finíssimas para corrigir forma e cor dos dentes.</p>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center; margin-top:40px;">
                            <button style="background:#00bfa5; color:#fff; font-weight:bold; border:none; padding:14px 40px; border-radius:4px; font-size:1.05rem; cursor:pointer;">Ver Todos os Tratamentos</button>
                        </div>
                    </div>

                    <!-- QUOTE E CONTATO -->
                    <div class="dds-quote-section">
                        <div class="dds-quote-form">
                            <h3 style="color:#a8fdf0; font-size:1rem; text-transform:uppercase; margin-bottom:10px;">Contato</h3>
                            <h2 style="font-size:2.2rem;">Faça um Orçamento<br>Gratuito</h2>
                            <p style="margin-bottom:30px;">Pronto para transformar seu sorriso? Preencha os campos abaixo e nossa equipe entrará em contato em menos de 1 hora.</p>
                            <input type="text" placeholder="Seu Nome Completo">
                            <input type="email" placeholder="Seu E-mail Melhor">
                            <input type="text" placeholder="Seu Telefone (WhatsApp)">
                            <select>
                                <option>Qual o tratamento de interesse?</option>
                                <option>Implantes Dentários</option>
                                <option>Clareamento a Laser</option>
                                <option>Ortodontia (Aparelhos)</option>
                                <option>Lentes de Contato</option>
                                <option>Outros / Dúvida</option>
                            </select>
                            <textarea placeholder="Mensagem ou Detalhes (Opcional)" style="width:100%; padding:12px; margin-bottom:15px; border:none; border-radius:4px; font-family:inherit; height:100px; resize:none;"></textarea>
                            <button style="width:100%; font-size:1.1rem; letter-spacing:1px; background:#1a498b; box-shadow:0 8px 20px rgba(0,0,0,0.1);">Enviar Solicitação Especial</button>
                        </div>
                        <div class="dds-quote-img" style="background-image: url('https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=800');">
                        </div>
                    </div>

                    <!-- TEAM SECTION -->
                    <div class="dds-team">
                        <div class="dds-team-container">
                            <div class="dds-team-content">
                                <h3>Quem cuida de você</h3>
                                <h2>Nossos Profissionais</h2>
                                <p>Temos orgulho de contar com uma equipe de especialistas renomados, apaixonados pelo que fazem. Combinando anos de experiência e constante especialização em congressos internacionais.</p>
                                
                                <div style="display:flex; gap:15px; margin-top:20px;">
                                    <div style="padding:10px 20px; border:2px solid #eee; border-radius:8px; color:#00bfa5; font-weight:bold; background:#f4f7fb;">Registro CRO Nacional</div>
                                    <div style="padding:10px 20px; border:2px solid #eee; border-radius:8px; color:#00bfa5; font-weight:bold; background:#f4f7fb;">Certificado ABO Brasil</div>
                                </div>
                            </div>
                            <div class="dds-team-img" style="max-height: 250px;">
                                <img src="https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&cs=tinysrgb&w=800" style="width:100%; height:100%; object-fit:cover; border-radius:8px;" alt="Dentista Atendendo">
                            </div>
                        </div>

                        <div class="dds-team-members">
                            <div class="dds-member">
                                <div style="width:100%; height:280px; border-radius:12px; overflow:hidden; margin-bottom:15px;">
                                    <img src="Gemini_Generated_Image_laz8e1laz8e1laz8.png" style="width:100%; height:100%; object-fit:cover;" alt="Dr. Gustavo">
                                </div>
                                <h4>Dr. Gustavo Andrade</h4>
                                <span>Cirurgião Dentista Chefe</span>
                                <p>Especialista em implantes guiados e reabilitação oral com mais de 10 anos de experiência.</p>
                            </div>
                            <div class="dds-member">
                                <div style="width:100%; height:280px; border-radius:12px; overflow:hidden; margin-bottom:15px; background:#eee;">
                                    <img src="https://images.pexels.com/photos/3779711/pexels-photo-3779711.jpeg?auto=compress&cs=tinysrgb&w=800" style="width:100%; height:100%; object-fit:cover; object-position:top;" alt="Dra. Aline">
                                </div>
                                <h4>Dra. Aline Costa</h4>
                                <span>Especialista em Ortodontia</span>
                                <p>Focada em alinhadores invisíveis de alta precisão e odontologia estética funcional.</p>
                            </div>
                            <div class="dds-member">
                                <div style="width:100%; height:280px; border-radius:12px; overflow:hidden; margin-bottom:15px; background:#eee;">
                                    <img src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=800" style="width:100%; height:100%; object-fit:cover; object-position:top;" alt="Dra. Camila">
                                </div>
                                <h4>Dra. Camila Marques</h4>
                                <span>Odontopediatra</span>
                                <p>O cuidado gentil, lúdico e seguro para garantir o sorriso perfeito dos pequenos.</p>
                            </div>
                        </div>
                    </div>

                    <!-- TESTIMONIALS -->
                    <div class="dds-testimonials">
                        <div class="dds-test-header">
                            <h3>Pacientes Satisfeitos</h3>
                            <h2>Razões para Sorrir Novamente</h2>
                        </div>
                        <div class="dds-test-grid">
                            <div class="dds-test-card">
                                <div style="color:#f39c12; font-size:1.2rem; margin-bottom:15px;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                <p>"Instalei meus implantes na Sorria+ e o resultado foi divinamente fantástico. Atendimento super humano, clínica impecável e recuperei a confiança para sorrir nas fotos."</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/men/32.jpg') center/cover;"></div>
                                    <div>
                                        <h4>Roberto Castro</h4>
                                        <span>Reabilitação Total</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dds-test-card">
                                <div style="color:#f39c12; font-size:1.2rem; margin-bottom:15px;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                <p>"Sempre tive até pânico de dentista, mas a Dra. Aline me deixou tão à vontade! Fizemos o clareamento a laser e ficou digno de cinema. Totalmente sem dor!"</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/women/44.jpg') center/cover;"></div>
                                    <div>
                                        <h4>Laura Mendes</h4>
                                        <span>Estética Dental</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dds-test-card">
                                <div style="color:#f39c12; font-size:1.2rem; margin-bottom:15px;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                <p>"Comecei meu tratamento com alinhador invisível há apenas alguns meses e todo mundo nota. Profissionais muito bons e o preço foi bem direto ao ponto."</p>
                                <div class="dds-test-author">
                                    <div class="dds-test-avatar" style="background: url('https://randomuser.me/api/portraits/men/67.jpg') center/cover;"></div>
                                    <div>
                                        <h4>André Silva</h4>
                                        <span>Ortodontia Tecnológica</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- EXCELLENCE SECTION -->
                    <div class="dds-excellence">
                        <div class="dds-exc-text">
                            <h2>Sorriso Perfeito,<br><span style="color:#00bfa5;">Excelência Comprovada</span></h2>
                            <p>Na Sorria+, utilizamos materiais de alto padrão, certificação FDA Americana e protocolos rigorosos de biossegurança para oferecer os melhores resultados da odontologia moderna.</p>
                            
                            <div class="dds-exc-bars">
                                <div>
                                    <span style="display:flex; justify-content:space-between;"><span>Satisfação dos Pacientes</span> <span>99%</span></span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:99%;"></div></div>
                                </div>
                                <div style="margin-top: 15px;">
                                    <span style="display:flex; justify-content:space-between;"><span>Sucesso em Implantes e Lentes</span> <span>95%</span></span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:95%;"></div></div>
                                </div>
                                <div style="margin-top: 15px;">
                                    <span style="display:flex; justify-content:space-between;"><span>Avaliações 5 Estrelas no Google</span> <span>4.9</span></span>
                                    <div class="dds-bar"><div class="dds-bar-fill" style="width:98%;"></div></div>
                                </div>
                            </div>
                        </div>
                        <div class="dds-exc-img">
                            <img src="https://images.pexels.com/photos/3845554/pexels-photo-3845554.jpeg?auto=compress&cs=tinysrgb&w=800" style="width:100%; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.15);" alt="Sorriso Perfeito Pexels">
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div class="dds-footer" style="padding:60px 40px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:40px; margin-bottom:30px; text-align:left;">
                            <div style="flex:1;">
                                <h2 style="color:#00bfa5; font-size:2rem; margin-bottom:15px; display:flex; align-items:center; gap:8px;"><i class="fas fa-tooth"></i> Sorria+</h2>
                                <p style="opacity:0.8; max-width:300px; line-height:1.7;">A clínica odontológica mais bem avaliada de São Paulo. Seu bem-estar é o nosso compromisso número 1.</p>
                            </div>
                            <div style="flex:1;">
                                <h4 style="font-size:1.1rem; margin-bottom:20px; color:#fff;">Contato Direto</h4>
                                <p style="margin-bottom:10px; opacity:0.8;"><i class="fas fa-map-marker-alt"></i> Av. Paulista, 1234 - Bela Vista - SP</p>
                                <p style="margin-bottom:10px; opacity:0.8;"><i class="fas fa-phone-alt"></i> +55 (11) 3456-7890</p>
                                <p style="margin-bottom:10px; opacity:0.8;"><i class="fas fa-envelope"></i> contato@clinicasorria.com.br</p>
                            </div>
                            <div style="flex:1;">
                                <h4 style="font-size:1.1rem; margin-bottom:20px; color:#fff;">Links Úteis</h4>
                                <p style="margin-bottom:10px;"><a href="#" style="color:#00bfa5; text-decoration:none;">Agendar Online</a></p>
                                <p style="margin-bottom:10px;"><a href="#" style="color:#00bfa5; text-decoration:none;">Nossos Casos e Resultados</a></p>
                                <p style="margin-bottom:10px;"><a href="#" style="color:#00bfa5; text-decoration:none;">Dúvidas Frequentes (FAQ)</a></p>
                            </div>
                        </div>
                        <p style="font-size:0.9rem; opacity:0.6;">© 2026 Clínica Odontológica Sorria+. Todos os direitos reservados. CRO-SP 98765.</p>
                        <p style="margin-top:5px; font-size:0.8rem; opacity:0.5;">Desenvolvido com excelência por Vós Agência</p>
                    </div>
                </div>"""

css_content = """/* ====== DEMO DENTIST SITE STYLES ====== */
.dds { font-family: 'DM Sans', sans-serif; color: #333; line-height: 1.6; background: #fff; text-align: left; }
.dds * { box-sizing: border-box; margin: 0; padding: 0; }
.dds h1, .dds h2, .dds h3 { font-family: 'DM Sans', sans-serif; font-weight: 700; color: #1a498b; }
.dds img { max-width: 100%; height: auto; display: block; min-height:10px; }
.dds-topbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 40px; background: #1a498b; color: #fff; font-size: 0.85rem; letter-spacing:0.3px;}
.dds-topbar-left { display: flex; gap: 20px; align-items: center; }
.dds-topbar-left span { display: flex; align-items: center; gap: 6px; }
.dds-topbar-right { display: flex; gap: 12px; }
/* Force un-breaking the nav sticky */
.dds-nav { display: flex; align-items: center; padding: 0 40px; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 100; height: 85px; box-shadow:0 3px 15px rgba(0,0,0,0.03); }
.dds-nav-logo { font-size: 2rem; font-weight: 800; color: #1a498b; display: flex; align-items: center; gap: 10px; }
.dds-nav-logo span { color: #00bfa5; }
.dds-nav-links { display: flex; gap: 25px; margin-left: auto; margin-right: 30px; }
.dds-nav-links a { text-decoration: none; color: #444; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; transition: color 0.2s; }
.dds-nav-links a:hover { color: #00bfa5; }
.dds-nav-cta { background: #00bfa5; color: #fff; border: none; padding: 14px 28px; border-radius: 6px; font-weight: 800; cursor: pointer; text-transform: uppercase; font-size: 0.85rem; letter-spacing:0.5px; box-shadow:0 4px 15px rgba(0,191,165,0.3); transition:transform 0.2s;}
.dds-nav-cta:hover{transform:translateY(-2px);}
.dds-hero { display: flex; align-items: center; justify-content: space-between; padding: 80px 40px; background: #f0f4f8 url('https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=1200') no-repeat center center / cover; position: relative; min-height: 550px;}
.dds-hero::before { content:''; position:absolute; inset:0; background: linear-gradient(90deg, rgba(26,73,139,0.95) 0%, rgba(26,73,139,0.85) 40%, rgba(26,73,139,0.3) 100%); z-index:1; }
.dds-hero-content { position: relative; z-index: 2; max-width: 550px; color: #fff; }
.dds-hero h1 { font-size: 3.8rem; color: #fff; line-height: 1.15; margin-bottom: 20px; }
.dds-hero h1 span { color: #00bfa5; }
.dds-hero p { font-size: 1.15rem; margin-bottom: 35px; color: #e0e0e0; line-height:1.6;}
.dds-hero-btns { display: flex; gap: 15px; }
.dds-hero-btns button { padding: 15px 30px; border-radius: 6px; font-weight: 700; font-size: 1rem; cursor: pointer; border: none; transition:all 0.2s; }
.dds-btn-primary { background: #00bfa5; color: #fff; box-shadow:0 4px 15px rgba(0,191,165,0.3); }
.dds-btn-primary:hover { background: #00a690; transform:translateY(-2px); }
.dds-btn-outline { background: transparent; color: #fff; border: 2px solid #fff !important; }
.dds-btn-outline:hover { background: rgba(255,255,255,0.1); }
.dds-hero-bottom-bar { display: flex; background: #00bfa5; color: #fff; padding: 25px 40px; justify-content: space-between; align-items: center; position: relative; z-index: 2; margin-top: -35px; margin-inline: 40px; border-radius: 8px; box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
.dds-hbb-text h3 { color: #fff; margin-bottom: 5px; font-size: 1.4rem; }
.dds-hbb-text p { font-size:0.95rem; opacity:0.9; }
.dds-bottom-icons { display: flex; gap: 30px; }
.dds-bottom-icons div { display: flex; align-items: center; gap: 10px; font-size: 1.4rem; font-weight: bold;}
.dds-hbb-form { display:flex; align-items:center; }
.dds-services-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width:1100px; margin:0 auto; }
.dds-srv-item { display: flex; align-items: flex-start; gap: 15px; background:#fff; padding:25px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.04); transition:transform 0.3s; border:1px solid #eef2f6;}
.dds-srv-item:hover{ transform:translateY(-5px); box-shadow:0 15px 30px rgba(0,0,0,0.08); }
.dds-srv-icon { width: 55px; height: 55px; flex-shrink: 0; background: #e0f2f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #00bfa5; font-size: 1.5rem; }
.dds-srv-text h4 { font-size: 1.15rem; color: #1a498b; margin-bottom: 8px; }
.dds-srv-text p { font-size: 0.95rem; color: #666; }
.dds-quote-section { display: flex; padding: 80px 40px; background: #fff; gap: 40px; }
.dds-quote-form { flex: 1; background: #00bfa5; padding: 50px; border-radius: 12px; color: #fff; box-shadow:0 15px 40px rgba(0,191,165,0.2); }
.dds-quote-form h2 { color: #fff; margin-bottom: 15px; font-size: 2.2rem; }
.dds-quote-form p { margin-bottom: 30px; font-size: 1rem; opacity: 0.9; }
.dds-quote-form input, .dds-quote-form select { width: 100%; padding: 14px; margin-bottom: 18px; border: none; border-radius: 6px; font-family: inherit; font-size:0.95rem;}
.dds-quote-form button { background: #1a498b; color: #fff; border: none; padding: 16px 30px; font-weight: 700; border-radius: 6px; cursor: pointer; transition:background 0.3s;}
.dds-quote-form button:hover{background:#113366;}
.dds-quote-img { flex: 1; background: url('https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=800') center/cover; border-radius: 12px; min-height: 400px; box-shadow:0 15px 30px rgba(0,0,0,0.1); }
.dds-testimonials { padding: 80px 40px; background: #f4f7fb; text-align: center; }
.dds-test-header { margin-bottom: 50px; }
.dds-test-header h3 { color: #00bfa5; font-size: 1.1rem; text-transform: uppercase; margin-bottom: 10px; }
.dds-test-header h2 { font-size: 2.6rem; color: #1a498b; }
.dds-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: left; }
.dds-test-card { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position:relative;}
.dds-test-card::before{content:'"'; position:absolute; top:20px; right:30px; font-size:5rem; color:#e0f2f1; font-family:serif; line-height:1;}
.dds-test-card p { font-style: italic; color: #555; margin-bottom: 25px; font-size: 1.05rem; position:relative; z-index:2;}
.dds-test-author { display: flex; align-items: center; gap: 15px; border-top:1px solid #eee; padding-top:20px;}
.dds-test-avatar { width: 55px; height: 55px; border-radius: 50%; background: #ccc; }
.dds-test-author h4 { color: #1a498b; font-size: 1.1rem; margin-bottom: 2px; }
.dds-test-author span { color: #00bfa5; font-size: 0.85rem; font-weight:bold;}
.dds-team { padding: 80px 40px; background: #fff; }
.dds-team-container { display: flex; gap: 50px; align-items: center; }
.dds-team-content { flex: 1; }
.dds-team-content h3 { color: #00bfa5; font-size: 1.1rem; text-transform: uppercase; margin-bottom: 10px; }
.dds-team-content h2 { font-size: 2.6rem; color: #1a498b; margin-bottom: 25px; }
.dds-team-content p { color: #555; margin-bottom: 30px; font-size:1.05rem; }
.dds-team-img { flex: 1; border-radius: 12px; overflow: hidden; box-shadow:0 15px 30px rgba(0,0,0,0.1); }
.dds-team-members { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 50px; }
.dds-member { text-align: left; }
.dds-member h4 { color: #1a498b; font-size: 1.3rem; }
.dds-member span { color: #00bfa5; font-size: 0.95rem; font-weight: bold; display:block; margin-bottom:8px;}
.dds-member p { color: #666; font-size: 0.95rem; margin-top: 5px; }
.dds-excellence { display: flex; padding: 80px 40px; background: #f4f7fb; align-items: center; gap: 50px; }
.dds-exc-text { flex: 1; }
.dds-exc-text h2 { font-size: 2.6rem; margin-bottom: 25px; line-height:1.2;}
.dds-exc-text p { color: #555; margin-bottom: 30px; font-size:1.05rem; }
.dds-exc-bars div { margin-bottom: 20px; }
.dds-exc-bars span { display: block; font-weight: bold; color: #1a498b; margin-bottom: 5px; font-size: 1rem;}
.dds-bar { height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden; }
.dds-bar-fill { height: 100%; background: #00bfa5; border-radius: 5px; }

@media(max-width: 900px) {
  .dds-hero-bottom-bar, .dds-quote-section, .dds-team-container, .dds-excellence, .dds-about { flex-direction: column; }
  .dds-services-row, .dds-test-grid, .dds-team-members { grid-template-columns: 1fr 1fr; }
  .dds-hero-bottom-bar { margin: 20px 0 0 0; }
  .dds-nav-links { display: none; }
  .dds-bottom-icons { display:none;}
}
@media(max-width: 600px) {
  .dds-services-row, .dds-test-grid, .dds-team-members { grid-template-columns: 1fr; }
  .dds-hero h1 { font-size: 2.5rem; }
  .dds-topbar { flex-direction:column; gap:10px; align-items:flex-start; }
}
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace HTML
start_marker_html = '<div class="dds">'
end_marker_html = '<!-- FLOATING ELEMENTS -->'
start_idx_html = content.find(start_marker_html)
end_idx_html = content.find(end_marker_html)

if start_idx_html != -1 and end_idx_html != -1:
    closing_divs = "\\n            </div>\\n        </div>\\n    </div>\\n\\n    "
    content = content[:start_idx_html] + html_content + closing_divs + content[end_idx_html:]

# Replace CSS
start_marker_css = '/* ====== DEMO DENTIST SITE STYLES ====== */'
end_marker_css = '/* TESTIMONIALS */'
start_idx_css = content.find(start_marker_css)
end_idx_css = content.find(end_marker_css)

if start_idx_css != -1 and end_idx_css != -1:
    content = content[:start_idx_css] + css_content + "\\n\\n" + content[end_idx_css:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
