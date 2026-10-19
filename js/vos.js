/* ============================================================
   VÓS — comportamento e animação
   Tudo nativo: sem biblioteca, sem jQuery, sem dependência.
   Quem pediu menos movimento no sistema, recebe menos movimento.
   ============================================================ */

(() => {
  'use strict';

  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];

  /* ---------- títulos: cada palavra sobe de dentro da máscara ---------- */
  const fatiarTitulos = () => {
    $$('[data-split]').forEach(titulo => {
      const pedacos = [...titulo.childNodes];
      titulo.innerHTML = '';
      let n = 0;
      pedacos.forEach(no => {
        if (no.nodeType === Node.TEXT_NODE) {
          no.textContent.split(/(\s+)/).forEach(parte => {
            if (!parte.trim()) return titulo.append(' ');
            /* pontuação solta volta para a palavra anterior, senão ela cai sozinha na linha */
            if (/^[.,;:!?)]+$/.test(parte)) {
              const ultima = titulo.querySelector('.palavra:last-of-type > *');
              if (ultima) { ultima.append(parte); return; }
            }
            const fora = document.createElement('span');
            fora.className = 'palavra';
            const dentro = document.createElement('span');
            dentro.textContent = parte;
            dentro.style.setProperty('--p', n++);
            fora.append(dentro);
            titulo.append(fora, ' ');
          });
        } else {
          /* preserva <em class="serifa"> e companhia, animando a tag inteira */
          const fora = document.createElement('span');
          fora.className = 'palavra';
          const dentro = no.cloneNode(true);
          dentro.style.setProperty('--p', n++);
          fora.append(dentro);
          titulo.append(fora, ' ');
        }
      });
    });
  };

  /* ---------- entrada por scroll ---------- */
  const observarEntradas = () => {
    const alvos = $$('.reveal, [data-split]');
    if (calmo || !('IntersectionObserver' in window)) {
      alvos.forEach(a => a.classList.add('dentro'));
      return;
    }
    const olho = new IntersectionObserver((itens) => {
      itens.forEach(item => {
        if (!item.isIntersecting) return;
        item.target.classList.add('dentro');
        olho.unobserve(item.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(a => olho.observe(a));
  };

  /* ---------- barra de progresso + topo encolhendo ---------- */
  const barra = $('#progresso');
  const topo = $('#topo');
  const secoes = $$('section[id]');
  const linksMenu = $$('#menu a');

  let pedido = null;
  const aoRolar = () => {
    if (pedido) return;
    pedido = requestAnimationFrame(() => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (barra) barra.style.width = (total > 0 ? (y / total) * 100 : 0) + '%';
      topo.classList.toggle('encolhido', y > 24);

      /* link ativo conforme a seção no meio da tela */
      const meio = y + window.innerHeight * 0.35;
      let atual = secoes[0];
      secoes.forEach(s => { if (s.offsetTop <= meio) atual = s; });
      if (atual) {
        linksMenu.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + atual.id));
      }

      /* paralaxe leve nas bolhas do hero */
      if (!calmo && y < window.innerHeight * 1.4) {
        const b1 = $('.bolha-1'), b2 = $('.bolha-2');
        if (b1) b1.style.translate = `0 ${y * 0.14}px`;
        if (b2) b2.style.translate = `0 ${y * -0.08}px`;
      }
      pedido = null;
    });
  };
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- contadores ---------- */
  const contar = (el) => {
    const alvo = parseFloat(el.dataset.conta);
    const prefixo = el.dataset.prefixo || '';
    const sufixo = el.dataset.sufixo || '';
    if (calmo) { el.textContent = prefixo + alvo + sufixo; return; }
    const duracao = 1400;
    const inicio = performance.now();
    const passo = (agora) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      const suave = 1 - Math.pow(1 - t, 3);
      el.textContent = prefixo + Math.round(alvo * suave) + sufixo;
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const observarContadores = () => {
    const alvos = $$('[data-conta]');
    if (!('IntersectionObserver' in window)) return alvos.forEach(contar);
    const olho = new IntersectionObserver((itens) => {
      itens.forEach(item => {
        if (!item.isIntersecting) return;
        contar(item.target);
        olho.unobserve(item.target);
      });
    }, { threshold: 0.6 });
    alvos.forEach(a => olho.observe(a));
  };

  /* ---------- menu no celular ---------- */
  const menu = $('#menu');
  const botaoMenu = $('#hamburguer');
  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });
    menu.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- botões magnéticos (só em ponteiro fino) ---------- */
  const magnetismo = () => {
    if (calmo || !window.matchMedia('(pointer: fine)').matches) return;
    $$('.btn-azul, .btn-claro').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.16;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.translate = `${x}px ${y - 2}px`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.translate = '0 0'; });
    });
  };

  /* ---------- inclinação leve nos cases ---------- */
  const inclinar = () => {
    if (calmo || !window.matchMedia('(pointer: fine)').matches) return;
    $$('.caso').forEach(caso => {
      caso.addEventListener('pointermove', e => {
        const r = caso.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -3;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 3;
        caso.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      caso.addEventListener('pointerleave', () => { caso.style.transform = ''; });
    });
  };

  /* ---------- vídeo do hero: poupa bateria fora da tela ---------- */
  const cuidarDoVideo = () => {
    const video = $('.moldura video');
    if (!video) return;
    if (calmo) { video.removeAttribute('autoplay'); video.pause(); video.setAttribute('controls', ''); return; }
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver((itens) => {
      itens.forEach(i => { i.isIntersecting ? video.play().catch(() => {}) : video.pause(); });
    }, { threshold: 0.2 }).observe(video);
  };

  /* ---------- só uma pergunta aberta por vez ---------- */
  const faq = () => {
    const perguntas = $$('.pergunta');
    perguntas.forEach(p => p.addEventListener('toggle', () => {
      if (!p.open) return;
      perguntas.forEach(outra => { if (outra !== p) outra.open = false; });
    }));
  };

  document.addEventListener('DOMContentLoaded', () => {
    fatiarTitulos();
    observarEntradas();
    observarContadores();
    magnetismo();
    inclinar();
    cuidarDoVideo();
    faq();
    aoRolar();
  });
})();
