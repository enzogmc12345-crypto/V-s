import re

modals = """    <!-- DEMO SITE MODAL — Clínica Sorria+ -->
    <div class="demo-modal-overlay" id="demo-sorria" onclick="if(event.target===this)this.classList.remove('active')">
        <div class="demo-modal">
            <div class="demo-modal-bar">
                <div class="demo-modal-dots"><span></span><span></span><span></span></div>
                <div class="demo-modal-url"><i class="fas fa-lock"></i> clinicasorria.com.br</div>
                <button class="demo-modal-close" onclick="document.getElementById('demo-sorria').classList.remove('active')" aria-label="Fechar">✕</button>
            </div>
            <div class="demo-modal-body">
                
                                <div class="dds">
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
                            <img src="sobre_dentista_1775337611467.png" style="width:100%; border-radius:12px; box-shadow:0 15px 30px rgba(0,0,0,0.1);" alt="Clínica Moderna">
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
                                    <img src="dr_gustavo_1775337624982.png" style="width:100%; height:100%; object-fit:cover;" alt="Dr. Gustavo">
                                </div>
                                <h4>Dr. Gustavo Andrade</h4>
                                <span>Cirurgião Dentista Chefe</span>
                                <p>Especialista em implantes guiados e reabilitação oral com mais de 10 anos de experiência.</p>
                            </div>
                            <div class="dds-member">
                                <div style="width:100%; height:280px; border-radius:12px; overflow:hidden; margin-bottom:15px; background:#eee;">
                                    <img src="dra_aline_1775337900526.png" style="width:100%; height:100%; object-fit:cover; object-position:top;" alt="Dra. Aline">
                                </div>
                                <h4>Dra. Aline Costa</h4>
                                <span>Especialista em Ortodontia</span>
                                <p>Focada em alinhadores invisíveis de alta precisão e odontologia estética funcional.</p>
                            </div>
                            <div class="dds-member">
                                <div style="width:100%; height:280px; border-radius:12px; overflow:hidden; margin-bottom:15px; background:#eee;">
                                    <img src="dra_camila_1775337915492.png" style="width:100%; height:100%; object-fit:cover; object-position:top;" alt="Dra. Camila">
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
                            <img src="sorriso_perfeito_1775337928675.png" style="width:100%; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.15);" alt="Sorriso Perfeito Pexels">
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
                </div>
            </div>
        </div>
    </div>

    <!-- DEMO SITE MODAL — Personal de Sena -->
    <div class="demo-modal-overlay" id="demo-sena" onclick="if(event.target===this)this.classList.remove('active')">
        <div class="demo-modal">
            <div class="demo-modal-bar">
                <div class="demo-modal-dots"><span></span><span></span><span></span></div>
                <div class="demo-modal-url"><i class="fas fa-lock"></i> personalsena.com.br</div>
                <button class="demo-modal-close" onclick="document.getElementById('demo-sena').classList.remove('active')" aria-label="Fechar">✕</button>
            </div>
            <div class="demo-modal-body" style="padding:0; overflow-y:auto; overflow-x:hidden;">
                <iframe src="Site personal the sena/index.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
            </div>
        </div>
    </div>

    <!-- DEMO SITE MODAL — Site Ronald -->
    <div class="demo-modal-overlay" id="demo-ronald" onclick="if(event.target===this)this.classList.remove('active')">
        <div class="demo-modal">
            <div class="demo-modal-bar">
                <div class="demo-modal-dots"><span></span><span></span><span></span></div>
                <div class="demo-modal-url"><i class="fas fa-lock"></i> ronald.dev.br</div>
                <button class="demo-modal-close" onclick="document.getElementById('demo-ronald').classList.remove('active')" aria-label="Fechar">✕</button>
            </div>
            <div class="demo-modal-body" style="padding:0; overflow-y:auto; overflow-x:hidden;">
                <iframe src="Site-ronald/index.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
            </div>
        </div>
    </div>\n\n"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert the modals right before demo-moda
content = content.replace('    <!-- DEMO SITE MODAL — Élise Moda -->', modals + '    <!-- DEMO SITE MODAL — Élise Moda -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
