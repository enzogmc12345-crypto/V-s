// Script 0

            function scrollToSlide(slideNum) {
                const scrollContainer = document.querySelector('#demo-cristan .brandbook-content-scroll');
                const targetSlide = document.getElementById('brandbook-slide-' + slideNum);
                if (scrollContainer && targetSlide) {
                    const containerTop = scrollContainer.getBoundingClientRect().top;
                    const slideTop = targetSlide.getBoundingClientRect().top;
                    const relativeTop = slideTop - containerTop + scrollContainer.scrollTop;
                    scrollContainer.scrollTo({
                        top: relativeTop,
                        behavior: 'smooth'
                    });
                }
            }

            // Standard IntersectionObserver for dynamic sidebar synchronization (ScrollSpy)
            (function() {
                const scrollContainer = document.querySelector('#demo-cristan .brandbook-content-scroll');
                const slides = document.querySelectorAll('#demo-cristan .brandbook-slide');
                
                if (scrollContainer && slides.length > 0) {
                    const observerOptions = {
                        root: scrollContainer,
                        rootMargin: '-10% 0px -50% 0px', // triggers when the top of the slide occupies the center area
                        threshold: 0.15
                    };
                    
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const slideId = entry.target.id;
                                const slideNum = slideId.split('-').pop();
                                
                                // Reset active class across all nav items
                                document.querySelectorAll('#demo-cristan .brandbook-sidebar-item').forEach(item => {
                                    item.classList.remove('active');
                                });
                                
                                // Set active class on target item
                                const activeItem = document.querySelector(`#demo-cristan .brandbook-sidebar-item[data-slide="${slideNum}"]`);
                                if (activeItem) {
                                    activeItem.classList.add('active');
                                    activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                }
                            }
                        });
                    }, observerOptions);
                    
                    slides.forEach(slide => {
                        observer.observe(slide);
                    });
                }
            })();
        
// Script 1

        // 1. Navbar Sticky & Scroll Top
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // 2. Mobile Menu
        const hamburger = document.getElementById('hamburger');
        const closeMenu = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('active'));
        });
        
        // 3. 3D Scroll Cube for Portfolio Section
        (function() {
            const portfolio = document.getElementById('portfolio');
            const cube = document.getElementById('portfolio-cube');
            const hudPct = document.getElementById('portfolio-hud-pct');
            const progFill = document.getElementById('portfolio-prog-fill');
            const cards = document.querySelectorAll('.portfolio-card');
            
            if (!portfolio || !cube) return;
            
            const N = 5; // Exactly 5 projects
            const STOPS = [
                { rx: 90, ry: 0 },    // Top (Café do Cordeiro)
                { rx: 0, ry: 0 },     // Front (Maison Élise)
                { rx: 0, ry: -90 },   // Right (The Sena)
                { rx: 0, ry: -180 },  // Back (Clínica Sorria+)
                { rx: 0, ry: -270 }   // Left (Barbearia Ronald)
            ];
            
            const easeIO = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
            
            const handleScroll = () => {
                const rect = portfolio.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionHeight = rect.height;
                const activeHeight = sectionHeight - window.innerHeight;
                
                if (activeHeight <= 0) return;
                
                // Calculate dynamic progress inside the portfolio section
                let progress = (window.scrollY - sectionTop) / activeHeight;
                progress = Math.max(0, Math.min(1, progress));
                
                // Update HUD
                const pct = Math.round(progress * 100);
                if (hudPct) hudPct.textContent = String(pct).padStart(3, '0') + "%";
                if (progFill) progFill.style.width = `${pct}%`;
                
                // Set transform on cube
                const t = progress * (N - 1);
                const i = Math.min(Math.floor(t), N - 2);
                const f = easeIO(t - i);
                const a = STOPS[i];
                const b = STOPS[i + 1];
                
                const rx = a.rx + (b.rx - a.rx) * f;
                const ry = a.ry + (b.ry - a.ry) * f;
                
                cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
                
                // Reveal the active card and hide others based on which section is active
                const currentIdx = Math.min(Math.floor(progress * N + 0.5), N - 1);
                cards.forEach((card, idx) => {
                    if (idx === currentIdx) {
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                    }
                });
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleScroll);
            
            // Re-trigger layout after complete page rendering and images load
            window.addEventListener('load', () => {
                setTimeout(handleScroll, 100);
            });
            
            handleScroll(); // Trigger initial execution
        })();
        
        // 4. FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-q');
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // 5. Intersection Observer (Fade Up)
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-up').forEach(el => {
            observer.observe(el);
        });
        
        // 6. 3D MacBook Mouse Interaction
        const scene1 = document.querySelector(".scene_1");
        if (scene1) {
            let ticking = false;
            window.addEventListener("mousemove", (e) => {
                if (!ticking && document.visibilityState === 'visible') {
                    window.requestAnimationFrame(() => {
                        let xPos = e.clientX;
                        let yPos = e.clientY;
                        let rotX = -15 - (yPos - window.innerHeight / 2) / 80;
                        let rotY = -351 + (xPos - window.innerWidth / 2) / 80;
                        scene1.style.transform = `scale(1) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
        
        
/* --- Fluid Background: Fluid Synthesizer exact logic --- */
(function() {
    const artboard   = document.getElementById('fluid-artboard');
    const cursorBlob = document.getElementById('cursor-blob');
    if (!artboard || !cursorBlob) return;

    let cursorX = window.innerWidth  / 2;
    let cursorY = window.innerHeight / 2;
    let targetX = cursorX, targetY = cursorY;

    window.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    // Animation loop (same as Fluid Synth)
    function animate() {
        if (document.visibilityState === 'visible') {
            cursorX += (targetX - cursorX) * 0.15;
            cursorY += (targetY - cursorY) * 0.15;
            const pad = 20;
            const x = Math.max(pad, Math.min(cursorX, window.innerWidth  - pad));
            const y = Math.max(pad, Math.min(cursorY, window.innerHeight - pad));
            cursorBlob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // spawnOrbs — exact copy from Fluid Synthesizer source
    function spawnOrbs(count) {
        // Remove old orbs
        artboard.querySelectorAll('.fluid-orb').forEach(o => o.remove());

        // Optimize orbs for mobile processing limit and reduced-motion preference
        const isMobileOrReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768;
        const actualCount = isMobileOrReduced ? Math.min(7, count) : count;

        for (let i = 0; i < actualCount; i++) {
            const orb = document.createElement('div');
            orb.classList.add('fluid-orb');

            const size = Math.max(20, Math.random() * 80);
            orb.style.width  = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.left   = `${Math.random() * 100}%`;
            orb.style.top    = `${Math.random() * 100}%`;

            // Alternate hue offsets like the original
            const hueOffset = i % 2 === 0 ? -30 : 45;
            orb.style.background  = `hsl(calc(var(--hue) + ${hueOffset}), 80%, 60%)`;
            orb.style.boxShadow   = `0 0 20px hsl(calc(var(--hue) + ${hueOffset}), 80%, 50%)`;

            artboard.appendChild(orb);

            const baseDuration = Math.random() * 10 + 10;
            const xDist = (Math.random() > 0.5 ? 1 : -1) * Math.max(50, Math.random() * 250);
            const yDist = (Math.random() > 0.5 ? 1 : -1) * Math.max(50, Math.random() * 250);

            orb.animate(
                [
                    { transform: 'translate3d(0,0,0) scale(1)' },
                    { transform: `translate3d(${xDist}px,${yDist}px,0) scale(${Math.max(0.6, Math.random() * 1.5)})` }
                ],
                { duration: baseDuration * 1000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
            );
        }
    }

    spawnOrbs(20); // 20 orbs filling the full page
})();

// 7. Theme Switcher Logic & Synchronization
    (function() {
        const themeMap = { '1': 'light', '2': 'dark', '3': 'dim' };

        function syncSwitchers(changedRadio) {
            const val = changedRadio.value;
            const optionNum = changedRadio.getAttribute("c-option");
            
            // Find other switcher's radio with same value
            const targetName = changedRadio.name === 'theme' ? 'theme-mobile' : 'theme';
            const otherRadio = document.querySelector(`input[name="${targetName}"][value="${val}"]`);
            
            if (otherRadio && !otherRadio.checked) {
                const otherSwitcher = otherRadio.closest('.switcher');
                if (otherSwitcher) {
                    const currentChecked = otherSwitcher.querySelector('input[type="radio"]:checked');
                    const prevOpt = currentChecked ? currentChecked.getAttribute("c-option") : "2";
                    otherSwitcher.setAttribute("c-previous", prevOpt);
                }
                otherRadio.checked = true;
                // Dispatch change event to trigger c-previous update in the other switcher
                otherRadio.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // Synchronize .theme-btn active states
            document.querySelectorAll('.theme-btn').forEach(btn => {
                const isActive = btn.getAttribute('data-theme') === optionNum;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        const switchers = document.querySelectorAll(".switcher");
        Array.from(switchers).forEach(switcher => {
            const radios = switcher.querySelectorAll('input[type="radio"]');
            let previousValue = null;
            
            const initiallyChecked = switcher.querySelector('input[type="radio"]:checked');
            if (initiallyChecked) {
                previousValue = initiallyChecked.getAttribute("c-option");
                switcher.setAttribute("c-previous", previousValue);
            }
            
            radios.forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    if (radio.checked) {
                        switcher.setAttribute("c-previous", previousValue ?? "");
                        previousValue = radio.getAttribute("c-option");
                        
                        // Prevent feedback loop by checking event details or recursion
                        syncSwitchers(radio);
                    }
                });
            });
        });

        // 8. New Liquid Glass Theme Bar Wiring
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeNum = btn.getAttribute('data-theme');
                const val = themeMap[themeNum] || 'dark';
                
                const desktopRadio = document.querySelector(`input[name="theme"][value="${val}"]`);
                if (desktopRadio) {
                    const switcher = desktopRadio.closest('.switcher');
                    if (switcher) {
                        const currentChecked = switcher.querySelector('input[type="radio"]:checked');
                        const prevOpt = currentChecked ? currentChecked.getAttribute("c-option") : "2";
                        switcher.setAttribute("c-previous", prevOpt);
                    }
                    desktopRadio.checked = true;
                    desktopRadio.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });
    })();
    // 9. Demo modal — close with ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.demo-modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });
    
// Script 2

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

