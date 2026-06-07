import re

original_grid = """            <div class="portfolio-grid">
                <!-- Item 1 — Clínica Sorria+ (Saúde, azul clean) -->
                <div class="ptf-item mix site" data-cat="site" id="sorria-card" onclick="document.getElementById('demo-sorria').classList.add('active')">
                    <div class="ptf-img" id="sorria-thumb-container" style="padding:0; overflow:hidden; display:flex; justify-content:center; align-items:center; background-color:#000;">
                        <img src="capa_sorria.png" alt="Capa Site Clínica Sorria+" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="ptf-info">
                        <h3>Site Clínica Sorria+</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🏥 Saúde</span>
                            <span class="ptf-srv">Site Institucional</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">👁️ Visualizar site →</div></div></div>
                </div>

                <!-- Item 1.1 — The Sena -->
                <div class="ptf-item mix site" data-cat="site" id="sena-card" onclick="document.getElementById('demo-sena').classList.add('active')">
                    <div class="ptf-img" id="sena-thumb-container" style="padding:0; overflow:hidden; display:flex; justify-content:center; align-items:center; background-color:#000;">
                        <img src="capa_sena.png" alt="Capa Site The Sena" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="ptf-info">
                        <h3>The Sena</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🏋️ Fitness</span>
                            <span class="ptf-srv">Site Institucional</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">👁️ Visualizar site →</div></div></div>
                </div>

                <!-- Item 1.2 — Site Ronald -->
                <div class="ptf-item mix site" data-cat="site" id="ronald-card" onclick="document.getElementById('demo-ronald').classList.add('active')">
                    <div class="ptf-img" id="ronald-thumb-container" style="padding:0; overflow:hidden; display:flex; justify-content:center; align-items:center; background-color:#000;">
                        <img src="capa_ronald.png" alt="Capa Site Barbearia Ronald" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="ptf-info">
                        <h3>Site Barbearia Ronald</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">💻 Portfólio</span>
                            <span class="ptf-srv">Site Institucional</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">👁️ Visualizar site →</div></div></div>
                </div>

                <!-- Item 2 — Élise Moda (Moda, elegante) -->
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

                <!-- Item 3 — Bela Hair (Estética, rosa/nude) -->
                <div class="ptf-item mix idv" data-cat="idv">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#d4637a;--mca:#fdf2f5;--mct:#3d1a22;--mcbg:#fff9fb;">
                            <div class="ms-nav" style="background:#fff9fb;border-bottom:1px solid #f9d0d8"><span class="ms-logo" style="color:var(--mc);font-style:italic">Bela Hair</span><div class="ms-links"><span style="background:#f9d0d8"></span><span style="background:#f9d0d8"></span><span style="background:#f9d0d8"></span></div><div class="ms-btn" style="background:var(--mc)"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#fff9fb 40%,#fde8ed 100%)">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#fde8ed;color:var(--mc)">Studio de Beleza</div>
                                    <div class="ms-h1" style="color:var(--mct);font-style:italic">Realce sua<br><span style="color:var(--mc)">beleza</span></div>
                                    <div class="ms-sub" style="color:#a07080">Cabelo, maquiagem & tratamentos</div>
                                    <div style="display:flex;gap:3px;margin-top:4px"><div style="width:16px;height:3px;border-radius:2px;background:var(--mc)"></div><div style="width:8px;height:3px;border-radius:2px;background:#f9d0d8"></div></div>
                                    <div class="ms-cta" style="background:var(--mc);margin-top:6px"></div>
                                </div>
                                <div style="font-size:30px;opacity:.2;margin-left:auto">💇</div>
                            </div>
                            <div class="ms-colors-row" style="display:flex;gap:4px;padding:6px 8px;background:#fff9fb">
                                <div style="width:18px;height:18px;border-radius:50%;background:#d4637a"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#f5b8c4"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#e8c9a0"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#3d1a22"></div>
                                <div style="flex:1;display:flex;align-items:center;gap:3px;padding-left:4px"><div style="height:5px;flex:1;background:#f9d0d8;border-radius:2px"></div><div style="height:5px;width:30%;background:#f9d0d8;border-radius:2px"></div></div>
                            </div>
                            <div class="ms-features" style="background:#fff9fb">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fde8ed;color:var(--mc)">💄</div><div class="ms-feat-lines"><div style="background:#f9d0d8"></div><div style="background:#f9d0d8"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fde8ed;color:var(--mc)">✂️</div><div class="ms-feat-lines"><div style="background:#f9d0d8"></div><div style="background:#f9d0d8"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fde8ed;color:var(--mc)">🌸</div><div class="ms-feat-lines"><div style="background:#f9d0d8"></div><div style="background:#f9d0d8"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Identidade Visual Bela Hair</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">💇 Estética</span>
                            <span class="ptf-srv">Identidade Visual</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 4 — Restaurante Raízes (Gastronomia, terracota/quente) -->
                <div class="ptf-item mix site" data-cat="site">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#c0522a;--mca:#fef5ee;--mct:#2d1206;--mcbg:#1a0900;">
                            <div class="ms-nav" style="background:#1a0900"><span class="ms-logo" style="color:#e8956d;font-family:Georgia,serif">Raízes</span><div class="ms-links"><span style="background:#2d1206"></span><span style="background:#2d1206"></span><span style="background:#2d1206"></span></div><div class="ms-btn" style="background:#c0522a"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#2d1206 0%,#3d1a08 60%,#4a220a 100%)">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#c0522a22;color:#e8956d;border:1px solid #c0522a44">Gastronomia Brasileira</div>
                                    <div class="ms-h1" style="color:#fff;font-family:Georgia,serif">Sabores que<br><span style="color:#e8956d">tocam a alma</span></div>
                                    <div class="ms-sub" style="color:#a07060">Culinária regional, ingredientes frescos</div>
                                    <div class="ms-cta" style="background:#c0522a"></div>
                                </div>
                                <div style="font-size:28px;opacity:.2;margin-left:auto">🍽️</div>
                            </div>
                            <div style="display:flex;gap:4px;padding:5px 8px;background:#2d1206">
                                <div style="flex:1;aspect-ratio:1;background:#3d1a08;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px">🥘</div>
                                <div style="flex:1;aspect-ratio:1;background:#3d1a08;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px">🥗</div>
                                <div style="flex:1;aspect-ratio:1;background:#3d1a08;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px">🍖</div>
                                <div style="flex:1;aspect-ratio:1;background:#3d1a08;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px">🍰</div>
                            </div>
                            <div class="ms-features" style="background:#1a0900">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2d1206;color:#e8956d">📍</div><div class="ms-feat-lines"><div style="background:#2d1206"></div><div style="background:#2d1206"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2d1206;color:#e8956d">🕐</div><div class="ms-feat-lines"><div style="background:#2d1206"></div><div style="background:#2d1206"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2d1206;color:#e8956d">📱</div><div class="ms-feat-lines"><div style="background:#2d1206"></div><div style="background:#2d1206"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Site Restaurante Raízes</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🍕 Gastronomia</span>
                            <span class="ptf-srv">Site + Posts</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 5 — Coach Renata (Coaching, roxo/energia) -->
                <div class="ptf-item mix lp" data-cat="lp">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#7c3aed;--mca:#f5f3ff;--mct:#1e0048;--mcbg:#0d0020;">
                            <div class="ms-nav" style="background:#0d0020"><span class="ms-logo" style="color:#a78bfa">Renata</span><div class="ms-links"><span style="background:#1e0048"></span><span style="background:#1e0048"></span><span style="background:#1e0048"></span></div><div class="ms-btn" style="background:#7c3aed"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#0d0020 0%,#1e0048 60%,#2d0070 100%)">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#7c3aed22;color:#a78bfa;border:1px solid #7c3aed44">Life & Business Coach</div>
                                    <div class="ms-h1" style="color:#fff">Transforme sua<br><span style="color:#a78bfa">vida agora</span></div>
                                    <div class="ms-sub" style="color:#8866aa">Método comprovado para alta performance</div>
                                    <div class="ms-stats" style="display:flex;gap:6px;margin-top:5px">
                                        <div style="background:#1e0048;border:1px solid #7c3aed33;border-radius:4px;padding:2px 5px;text-align:center"><div style="color:#a78bfa;font-size:7px;font-weight:700">500+</div><div style="color:#8866aa;font-size:5px">Alunos</div></div>
                                        <div style="background:#1e0048;border:1px solid #7c3aed33;border-radius:4px;padding:2px 5px;text-align:center"><div style="color:#a78bfa;font-size:7px;font-weight:700">94%</div><div style="color:#8866aa;font-size:5px">Resultado</div></div>
                                    </div>
                                    <div class="ms-cta" style="background:linear-gradient(90deg,#7c3aed,#a78bfa);margin-top:5px"></div>
                                </div>
                                <div style="font-size:24px;opacity:.2;margin-left:auto">🚀</div>
                            </div>
                            <div class="ms-features" style="background:#0d0020">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1e0048;color:#a78bfa">🎯</div><div class="ms-feat-lines"><div style="background:#1e0048"></div><div style="background:#1e0048"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1e0048;color:#a78bfa">💡</div><div class="ms-feat-lines"><div style="background:#1e0048"></div><div style="background:#1e0048"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1e0048;color:#a78bfa">⭐</div><div class="ms-feat-lines"><div style="background:#1e0048"></div><div style="background:#1e0048"></div></div></div>
                            </div>
                            <div class="ms-cta-bar" style="background:linear-gradient(90deg,#7c3aed,#a78bfa)"><div class="ms-cta-line"></div><div class="ms-cta-btn" style="background:#fff3"></div></div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Landing Page Coach Renata</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🎓 Coaching</span>
                            <span class="ptf-srv">Landing Page</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 6 — Construtech (Construção, cinza/laranja industrial) -->
                <div class="ptf-item mix site" data-cat="site">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#f97316;--mca:#fff7ed;--mct:#1c1c1c;--mcbg:#111">
                            <div class="ms-nav" style="background:#111"><span class="ms-logo" style="color:#f97316;font-weight:900;letter-spacing:-1px">CONSTRUTECH</span><div class="ms-links"><span style="background:#222"></span><span style="background:#222"></span><span style="background:#222"></span></div><div class="ms-btn" style="background:#f97316"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#111 0%,#1c1c1c 100%);position:relative">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#f9731622;color:#f97316;border:1px solid #f9731644">Engenharia & Construção</div>
                                    <div class="ms-h1" style="color:#fff;font-weight:900">Construindo<br><span style="color:#f97316">resultados</span></div>
                                    <div class="ms-sub" style="color:#888">Obras residenciais e comerciais</div>
                                    <div class="ms-cta" style="background:#f97316"></div>
                                </div>
                                <div style="font-size:28px;opacity:.15;margin-left:auto">🏗️</div>
                            </div>
                            <div style="display:flex;gap:3px;padding:5px 8px;background:#1c1c1c">
                                <div style="flex:1;height:20px;background:#222;border-radius:3px;border-left:2px solid #f97316"></div>
                                <div style="flex:1;height:20px;background:#222;border-radius:3px;border-left:2px solid #f97316"></div>
                                <div style="flex:1;height:20px;background:#222;border-radius:3px;border-left:2px solid #f97316"></div>
                            </div>
                            <div class="ms-features" style="background:#111">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1c1c1c;color:#f97316">🔨</div><div class="ms-feat-lines"><div style="background:#222"></div><div style="background:#222"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1c1c1c;color:#f97316">📐</div><div class="ms-feat-lines"><div style="background:#222"></div><div style="background:#222"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#1c1c1c;color:#f97316">🏆</div><div class="ms-feat-lines"><div style="background:#222"></div><div style="background:#222"></div></div></div>
                            </div>
                            <div class="ms-cta-bar" style="background:#f97316"><div class="ms-cta-line"></div><div class="ms-cta-btn" style="background:#fff3"></div></div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Site Construtech</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🏗️ Construção</span>
                            <span class="ptf-srv">Site Institucional</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 7 — Studio Forma (Fitness, verde neon/escuro) -->
                <div class="ptf-item mix site" data-cat="site">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#22c55e;--mca:#f0fdf4;--mct:#052e16;--mcbg:#030f06;">
                            <div class="ms-nav" style="background:#030f06"><span class="ms-logo" style="color:#22c55e;font-weight:900">FORMA</span><div class="ms-links"><span style="background:#052e16"></span><span style="background:#052e16"></span><span style="background:#052e16"></span></div><div class="ms-btn" style="background:#22c55e"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#030f06 0%,#052e16 100%)">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#22c55e22;color:#22c55e;border:1px solid #22c55e44">Studio de Fitness</div>
                                    <div class="ms-h1" style="color:#fff;font-weight:900;text-transform:uppercase">Transforme<br><span style="color:#22c55e">seu corpo</span></div>
                                    <div class="ms-sub" style="color:#4ade80">Personal training & grupos</div>
                                    <div class="ms-cta" style="background:#22c55e"></div>
                                </div>
                                <div style="font-size:28px;opacity:.2;margin-left:auto">💪</div>
                            </div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:4px 8px;background:#052e16">
                                <div style="background:#030f06;border:1px solid #22c55e22;border-radius:3px;padding:3px 5px"><div style="color:#22c55e;font-size:6px;font-weight:700">300+</div><div style="color:#4ade80;font-size:5px">Alunos ativos</div></div>
                                <div style="background:#030f06;border:1px solid #22c55e22;border-radius:3px;padding:3px 5px"><div style="color:#22c55e;font-size:6px;font-weight:700">5★</div><div style="color:#4ade80;font-size:5px">Avaliação</div></div>
                            </div>
                            <div class="ms-features" style="background:#030f06">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#052e16;color:#22c55e">🏋️</div><div class="ms-feat-lines"><div style="background:#052e16"></div><div style="background:#052e16"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#052e16;color:#22c55e">🧘</div><div class="ms-feat-lines"><div style="background:#052e16"></div><div style="background:#052e16"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#052e16;color:#22c55e">🥗</div><div class="ms-feat-lines"><div style="background:#052e16"></div><div style="background:#052e16"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Link de Bio Studio Forma</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">💪 Fitness</span>
                            <span class="ptf-srv">Link de Bio</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 8 — Advocacia Silva (Jurídico IDV, cinza/vermelho) -->
                <div class="ptf-item mix idv" data-cat="idv">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#991b1b;--mca:#fef2f2;--mct:#1a0606;--mcbg:#fff;">
                            <div class="ms-nav" style="background:#fff;border-bottom:1px solid #fee2e2"><span class="ms-logo" style="color:#991b1b;font-family:Georgia,serif">Silva & Advogados</span><div class="ms-links"><span style="background:#fee2e2"></span><span style="background:#fee2e2"></span></div><div class="ms-btn" style="background:#991b1b"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#fff 50%,#fef2f2 100%)">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#fee2e2;color:#991b1b">Advocacia</div>
                                    <div class="ms-h1" style="color:#1a0606;font-family:Georgia,serif">Excelência<br><span style="color:#991b1b">jurídica</span></div>
                                    <div class="ms-sub" style="color:#888">Tradição e modernidade no Direito</div>
                                    <div class="ms-cta" style="background:#991b1b"></div>
                                </div>
                                <div style="font-size:28px;opacity:.1;margin-left:auto">🏛️</div>
                            </div>
                            <div class="ms-colors-row" style="display:flex;gap:4px;padding:6px 8px;background:#fff;border-top:1px solid #fee2e2">
                                <div style="width:18px;height:18px;border-radius:50%;background:#991b1b"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#1a0606"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#d4b896"></div>
                                <div style="width:18px;height:18px;border-radius:50%;background:#f5f5f5;border:1px solid #eee"></div>
                                <div style="flex:1;display:flex;align-items:center;gap:3px;padding-left:4px"><div style="height:5px;flex:1;background:#fee2e2;border-radius:2px"></div></div>
                            </div>
                            <div class="ms-features" style="background:#fff">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fee2e2;color:#991b1b">⚖️</div><div class="ms-feat-lines"><div style="background:#fee2e2"></div><div style="background:#fee2e2"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fee2e2;color:#991b1b">🏛️</div><div class="ms-feat-lines"><div style="background:#fee2e2"></div><div style="background:#fee2e2"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#fee2e2;color:#991b1b">📄</div><div class="ms-feat-lines"><div style="background:#fee2e2"></div><div style="background:#fee2e2"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Identidade Visual Advocacia Silva</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">⚖️ Jurídico</span>
                            <span class="ptf-srv">Identidade Visual</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>

                <!-- Item 9 — Loja Moda Única (Varejo, preto/bege fashion) -->
                <div class="ptf-item mix site idv" data-cat="site">
                    <div class="ptf-img">
                        <div class="mini-site" style="--mc:#1a1a1a;--mca:#faf7f2;--mct:#1a1a1a;--mcbg:#faf7f2;">
                            <div class="ms-nav" style="background:#1a1a1a"><span class="ms-logo" style="color:#d4b896;letter-spacing:2px;font-size:6px;text-transform:uppercase">MODA ÚNICA</span><div class="ms-links"><span style="background:#2a2a2a"></span><span style="background:#2a2a2a"></span><span style="background:#2a2a2a"></span></div><div class="ms-btn" style="background:#d4b896;border-radius:2px"></div></div>
                            <div class="ms-hero" style="background:linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 100%);position:relative">
                                <div class="ms-hero-text">
                                    <div class="ms-badge" style="background:#d4b89622;color:#d4b896;letter-spacing:1px;font-size:4.5px;text-transform:uppercase">Nova Coleção</div>
                                    <div class="ms-h1" style="color:#fff;letter-spacing:-0.5px">Estilo que<br><span style="color:#d4b896">define você</span></div>
                                    <div class="ms-sub" style="color:#888">Moda feminina exclusiva</div>
                                    <div class="ms-cta" style="background:#d4b896;border-radius:2px"></div>
                                </div>
                                <div style="font-size:26px;opacity:.15;margin-left:auto">🛍️</div>
                            </div>
                            <div style="display:flex;gap:3px;padding:4px 8px;background:#111">
                                <div style="flex:1;height:24px;background:#1a1a1a;border-radius:2px;border-top:2px solid #d4b896"></div>
                                <div style="flex:1;height:24px;background:#1a1a1a;border-radius:2px;border-top:2px solid #d4b896"></div>
                                <div style="flex:1;height:24px;background:#1a1a1a;border-radius:2px;border-top:2px solid #d4b896"></div>
                                <div style="flex:1;height:24px;background:#1a1a1a;border-radius:2px;border-top:2px solid #d4b896"></div>
                            </div>
                            <div class="ms-features" style="background:#1a1a1a">
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2a2a2a;color:#d4b896">👗</div><div class="ms-feat-lines"><div style="background:#2a2a2a"></div><div style="background:#2a2a2a"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2a2a2a;color:#d4b896">💎</div><div class="ms-feat-lines"><div style="background:#2a2a2a"></div><div style="background:#2a2a2a"></div></div></div>
                                <div class="ms-feat"><div class="ms-feat-icon" style="background:#2a2a2a;color:#d4b896">🛒</div><div class="ms-feat-lines"><div style="background:#2a2a2a"></div><div style="background:#2a2a2a"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ptf-info">
                        <h3>Site Loja Moda Única</h3>
                        <div class="ptf-meta">
                            <span class="ptf-tag">🛍️ Varejo</span>
                            <span class="ptf-srv">Site + IDV</span>
                        </div>
                    </div>
                    <div class="ptf-overlay"><div class="glass-container glass-primary-btn"><div class="glass-filter"></div><div class="glass-overlay"></div><div class="glass-specular"></div><div class="glass-content" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ver projeto →</div></div></div>
                </div>
            </div>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<div class="portfolio-grid">.*?</div>\n            \n            <div style="text-align: center; margin-top: 3rem;">', original_grid + '\n            \n            <div style="text-align: center; margin-top: 3rem;">', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
