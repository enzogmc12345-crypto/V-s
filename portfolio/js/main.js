/* ============================================================================
   PORTFÓLIO — comportamento
   Este arquivo lê o js/data.js e monta a página. Para trocar conteúdo,
   edite o data.js — aqui você só mexe se quiser mudar o comportamento.
   ========================================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     1. PERFIL — preenche tudo que tem data-perfil="..."
     ==================================================================== */
  function montarPerfil() {
    const nomeCompleto = [PERFIL.nome, PERFIL.sobrenome].filter(Boolean).join(' ');
    const iniciais = (PERFIL.nome[0] || '') + (PERFIL.sobrenome[0] || '');

    const valores = {
      nome: PERFIL.nome,
      sobrenome: PERFIL.sobrenome,
      nomeCompleto,
      iniciais: iniciais.toUpperCase(),
      bio: PERFIL.bio,
      localizacao: PERFIL.localizacao,
      email: PERFIL.email,
      ano: new Date().getFullYear(),
    };

    $$('[data-perfil]').forEach((el) => {
      const chave = el.dataset.perfil;
      if (chave === 'cargo') { el.innerHTML = PERFIL.cargo; return; }
      if (valores[chave] !== undefined) el.textContent = valores[chave];
    });

    document.title = `${nomeCompleto} — Graphic, Product & Brand Designer`;

    // botão do currículo
    const cv = $('#cvBtn');
    if (PERFIL.curriculoPDF) cv.href = PERFIL.curriculoPDF;
    else cv.hidden = true;
  }

  /* ======================================================================
     2. CARROSSEL DE FERRAMENTAS (marquee infinito)
     ==================================================================== */
  function montarFerramentas() {
    const track = $('#toolsTrack');
    if (!track || !FERRAMENTAS.length) return;

    const item = (f) => `
      <div class="tool">
        <img src="${f.icone}" alt="" loading="lazy" width="38" height="38">
        <span>${f.nome}</span>
      </div>`;

    // a lista é duplicada para o loop do marquee ficar sem emenda
    track.innerHTML = FERRAMENTAS.map(item).join('') + FERRAMENTAS.map(item).join('');
  }

  /* ======================================================================
     3. SERVIÇOS
     ==================================================================== */
  function montarServicos() {
    const grid = $('#servicos-grid');
    if (!grid) return;

    grid.innerHTML = SERVICOS.map((s, i) => `
      <div class="servico">
        <span class="servico__num">${String(i + 1).padStart(2, '0')}</span>
        <div class="servico__body">
          <p class="servico__title">${s.titulo}</p>
          <p class="servico__text">${s.texto}</p>
        </div>
        <span class="servico__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>`).join('');
  }

  /* ======================================================================
     4. CARROSSEL DE PROJETOS (arco que roda sozinho)
     ==================================================================== */
  const carrossel = {
    ativo: 0,
    total: 0,
    cards: [],
    timer: null,
    pausado: false,
    visivel: true,
    ignorarClique: false,
  };

  function montarCarrossel() {
    const palco = $('#carouselStage');
    const dots  = $('#carouselDots');
    if (!palco || !PROJETOS.length) return;

    carrossel.total = PROJETOS.length;

    palco.innerHTML = PROJETOS.map((p, i) => `
      <article class="card" data-index="${i}" data-projeto="${p.id}" role="button" tabindex="-1"
               aria-label="Abrir projeto ${p.titulo}">
        <img class="card__img" src="${p.capa}" alt="${p.titulo}" loading="${i < 3 ? 'eager' : 'lazy'}">
        <span class="card__shade" aria-hidden="true"></span>
        <span class="card__tag">${p.categoria}</span>
        <h3 class="card__title">${p.titulo}</h3>
        <span class="card__open">
          ver projeto
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M7 17L17 7M17 7H9M17 7v8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </article>`).join('');

    dots.innerHTML = PROJETOS.map((p, i) => `
      <button class="carousel__dot" role="tab" data-index="${i}"
              aria-label="Ir para ${p.titulo}" aria-selected="${i === 0}"></button>`).join('');

    carrossel.cards = $$('.card', palco);
    posicionarCards();

    // clique no card central abre o popup (delegado, para não brigar com o arraste)
    palco.addEventListener('click', (e) => {
      if (carrossel.ignorarClique) { carrossel.ignorarClique = false; return; }
      const card = e.target.closest('.card');
      if (card && card.classList.contains('is-active')) abrirProjeto(card.dataset.projeto);
    });

    carrossel.cards.forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrirProjeto(card.dataset.projeto);
        }
      });
    });

    $$('.carousel__dot', dots).forEach((dot) => {
      dot.addEventListener('click', () => irPara(Number(dot.dataset.index)));
    });

    $('#prevBtn').addEventListener('click', () => mover(-1));
    $('#nextBtn').addEventListener('click', () => mover(1));

    ligarGestos();
    ligarAutoplay();
    window.addEventListener('resize', posicionarCards);
  }

  function posicionarCards() {
    const { cards, ativo, total } = carrossel;
    if (!cards.length) return;

    const larguraCard = cards[0].offsetWidth || 260;
    const passo = larguraCard * (window.innerWidth < 640 ? 0.72 : 0.9);
    // sempre uma quantidade ímpar de cards visíveis, para o leque ficar simétrico
    const visiveis = Math.max(1, Math.min(window.innerWidth < 640 ? 1 : 2,
                                          Math.floor((total - 1) / 2)));

    cards.forEach((card, i) => {
      // distância mais curta considerando o loop
      let d = i - ativo;
      if (d >  total / 2) d -= total;
      if (d < -total / 2) d += total;

      const abs = Math.abs(d);
      const x = d * passo * (1 - abs * 0.035);
      const y = abs * larguraCard * 0.07;
      const giro = d * 6.5;
      const escala = Math.max(0.6, 1 - abs * 0.1);
      const dentro = abs <= visiveis;

      card.style.transform = `translate(${x}px, ${y}px) rotate(${giro}deg) scale(${escala})`;
      card.style.opacity = dentro ? '1' : '0';
      card.style.zIndex = String(100 - abs);
      card.classList.toggle('is-active', d === 0);
      card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      card.tabIndex = d === 0 ? 0 : -1;
    });

    $$('.carousel__dot').forEach((dot, i) => {
      const on = i === ativo;
      dot.classList.toggle('is-on', on);
      dot.setAttribute('aria-selected', String(on));
    });
  }

  function irPara(i) {
    carrossel.ativo = (i + carrossel.total) % carrossel.total;
    posicionarCards();
    reiniciarAutoplay();
  }

  function mover(passo) { irPara(carrossel.ativo + passo); }

  function ligarAutoplay() {
    if (semMovimento) return;

    const tick = () => {
      if (!carrossel.pausado && carrossel.visivel && !document.hidden && !macAberto()) {
        irSemReset(1);
      }
    };
    carrossel.timer = setInterval(tick, 4200);

    const area = $('#carousel');
    ['mouseenter', 'focusin'].forEach((ev) =>
      area.addEventListener(ev, () => { carrossel.pausado = true; }));
    ['mouseleave', 'focusout'].forEach((ev) =>
      area.addEventListener(ev, () => { carrossel.pausado = false; }));

    // só roda quando a seção está na tela
    new IntersectionObserver(
      ([entry]) => { carrossel.visivel = entry.isIntersecting; },
      { threshold: 0.25 }
    ).observe(area);

    area.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); mover(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); }
    });
  }

  function irSemReset(passo) {
    carrossel.ativo = (carrossel.ativo + passo + carrossel.total) % carrossel.total;
    posicionarCards();
  }

  function reiniciarAutoplay() {
    if (!carrossel.timer) return;
    clearInterval(carrossel.timer);
    carrossel.timer = null;
    ligarAutoplayDepois();
  }
  function ligarAutoplayDepois() {
    if (semMovimento || carrossel.timer) return;
    carrossel.timer = setInterval(() => {
      if (!carrossel.pausado && carrossel.visivel && !document.hidden && !macAberto()) irSemReset(1);
    }, 4200);
  }

  /* arrastar com mouse / dedo */
  function ligarGestos() {
    const area = $('#carousel');
    let inicioX = 0;
    let arrastando = false;
    let arrastou = false;

    area.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      arrastando = true;
      arrastou = false;
      inicioX = e.clientX;
      area.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!arrastando) return;
      if (Math.abs(e.clientX - inicioX) > 8) arrastou = true;
    }, { passive: true });

    const soltar = (e) => {
      if (!arrastando) return;
      arrastando = false;
      area.classList.remove('is-dragging');

      const delta = e.clientX - inicioX;
      if (Math.abs(delta) > 55) {
        mover(delta > 0 ? -1 : 1);
        carrossel.ignorarClique = true;   // não abre o popup depois de arrastar
      } else if (arrastou) {
        carrossel.ignorarClique = true;
      }
    };

    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', () => {
      arrastando = false;
      area.classList.remove('is-dragging');
    });
  }

  /* ======================================================================
     5. PASTAS (arquivos)
     ==================================================================== */
  function projetosDaPasta(id) {
    return PROJETOS.filter((p) => p.pasta === id);
  }

  function montarPastas() {
    const grid = $('#folders');
    if (!grid) return;

    grid.innerHTML = PASTAS.map((pasta) => {
      const itens = projetosDaPasta(pasta.id);
      const capa = itens[0] ? itens[0].capa : '';

      return `
        <button class="folder" data-pasta="${pasta.id}" aria-label="Abrir pasta ${pasta.nome}">
          <span class="folder__count">${itens.length} ${itens.length === 1 ? 'item' : 'itens'}</span>
          <span class="folder__icon" aria-hidden="true">
            <span class="folder__back"></span>
            ${capa ? `<img class="folder__peek" src="${capa}" alt="" loading="lazy">` : ''}
            <span class="folder__front"></span>
          </span>
          <p class="folder__name">${pasta.nome}</p>
          <p class="folder__desc">${pasta.descricao}</p>
        </button>`;
    }).join('');

    $$('.folder', grid).forEach((btn) => {
      btn.addEventListener('click', () => abrirPasta(btn.dataset.pasta));
    });
  }

  /* ======================================================================
     6. SOBRE — polaroids, chips, números e linha do tempo
     ==================================================================== */
  function montarSobre() {
    const pol = $('#polaroids');
    if (pol) {
      pol.innerHTML = POLAROIDS.map((p) => `
        <figure class="polaroid" style="transform: rotate(${p.giro}deg)">
          <img src="${p.foto}" alt="${p.legenda}" loading="lazy">
          <figcaption>${p.legenda}</figcaption>
        </figure>`).join('');
    }

    const chips = $('#chips');
    if (chips) {
      const todas = new Set();
      PROJETOS.forEach((p) => (p.tags || []).forEach((t) => todas.add(t)));
      chips.innerHTML = Array.from(todas).slice(0, 14)
        .map((t) => `<li class="chip">${t}</li>`).join('');
    }

    const nums = $('#numbers');
    if (nums) {
      nums.innerHTML = NUMEROS.map((n) => `
        <div class="number">
          <p class="number__value">${n.valor}</p>
          <p class="number__label">${n.rotulo}</p>
        </div>`).join('');
    }

    const tl = $('#timeline');
    if (tl) {
      tl.innerHTML = EXPERIENCIA.map((e) => `
        <li>
          <p class="timeline__period">${e.periodo}</p>
          <div>
            <p class="timeline__role">${e.cargo}</p>
            <p class="timeline__company">${e.empresa}</p>
            <p class="timeline__text">${e.texto}</p>
          </div>
        </li>`).join('');
    }
  }

  /* ======================================================================
     7. CONTATO — arco de imagens + botões
     ==================================================================== */
  function montarContato() {
    const arco = $('#contactArc');
    if (arco) {
      const fotos = PROJETOS.concat(PROJETOS).slice(0, 9);
      arco.innerHTML = fotos.map((p, i) => `
        <div class="contact__arcItem" data-i="${i}" style="animation-delay:${i * 0.35}s">
          <img src="${p.capa}" alt="" loading="lazy">
        </div>`).join('');
      posicionarArco();
      window.addEventListener('resize', posicionarArco);
    }

    const acoes = $('#contactActions');
    if (!acoes) return;

    const links = [];
    if (PERFIL.email) {
      links.push({ href: `mailto:${PERFIL.email}`, texto: 'Me mandar um e-mail', primario: true });
    }
    if (PERFIL.whatsapp) {
      links.push({ href: `https://wa.me/${PERFIL.whatsapp}`, texto: 'WhatsApp' });
    }
    if (PERFIL.instagram) links.push({ href: PERFIL.instagram, texto: 'Instagram' });
    if (PERFIL.behance)   links.push({ href: PERFIL.behance,   texto: 'Behance' });
    if (PERFIL.linkedin)  links.push({ href: PERFIL.linkedin,  texto: 'LinkedIn' });

    acoes.innerHTML = links.map((l) => {
      const externo = l.href.startsWith('http')
        ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a class="btn ${l.primario ? 'btn--primary' : 'btn--ghost'}" href="${l.href}"${externo}>${l.texto}</a>`;
    }).join('');
  }

  function posicionarArco() {
    const arco = $('#contactArc');
    const secao = $('.contact');
    if (!arco || !secao) return;

    const todos = $$('.contact__arcItem', arco);
    if (!todos.length) return;

    // em telas estreitas o arco usa menos imagens, senão elas se sobrepõem
    const estreito = window.innerWidth < 760;
    const quantos = Math.min(todos.length, estreito ? 5 : 9);
    todos.forEach((item, i) => { item.hidden = i >= quantos; });

    const itens = todos.slice(0, quantos);
    const alturaDisponivel = arco.getBoundingClientRect().top - secao.getBoundingClientRect().top;
    const raio = Math.min(window.innerWidth * 0.4, alturaDisponivel - 30, 380);
    const abertura = estreito ? 148 : 168;                  // graus totais do arco
    const passo = abertura / (itens.length - 1);

    itens.forEach((item, i) => {
      const ang = -abertura / 2 + i * passo;
      item.style.transform =
        `rotate(${ang}deg) translateY(${-raio}px) rotate(${-ang * 0.62}deg)`;
    });
  }

  /* ======================================================================
     8. JANELA DO MAC (popup de projeto e de pasta)
     ==================================================================== */
  const mac = {
    el: null,
    body: null,
    url: null,
    titulo: null,
    voltar: null,
    janela: null,
    anterior: null,     // elemento que tinha o foco antes de abrir
    pilha: [],          // histórico para o botão "voltar"
  };

  function macAberto() { return mac.el && !mac.el.hidden; }

  function iniciarMac() {
    mac.el     = $('#mac');
    mac.body   = $('#macBody');
    mac.url    = $('#macUrl');
    mac.titulo = $('#macTitle');
    mac.voltar = $('#macBack');
    mac.janela = $('.mac__window', mac.el);

    $$('[data-mac-close]', mac.el).forEach((b) =>
      b.addEventListener('click', fecharMac));

    mac.voltar.addEventListener('click', () => {
      const anterior = mac.pilha.pop();
      if (anterior && anterior.tipo === 'pasta') abrirPasta(anterior.id, true);
    });

    document.addEventListener('keydown', (e) => {
      if (!macAberto()) return;
      if (e.key === 'Escape') { e.preventDefault(); fecharMac(); }
      if (e.key === 'Tab') prenderFoco(e);
    });
  }

  function prenderFoco(e) {
    const focaveis = $$(
      'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      mac.janela
    ).filter((el) => el.offsetParent !== null);

    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primeiro.focus();
    }
  }

  function mostrarMac(url, titulo, html, temVoltar) {
    const estavaAberto = macAberto();
    if (!estavaAberto) {
      mac.anterior = document.activeElement;
      mac.el.hidden = false;
      document.body.classList.add('is-locked');
    }

    mac.url.textContent = url;
    mac.titulo.textContent = titulo;
    mac.voltar.disabled = !temVoltar;
    mac.voltar.tabIndex = temVoltar ? 0 : -1;
    mac.body.innerHTML = `<h2 id="macTitle" class="sr-only">${titulo}</h2>` + html;
    mac.titulo = $('#macTitle');
    mac.body.scrollTop = 0;

    requestAnimationFrame(() => mac.janela.focus({ preventScroll: true }));
  }

  function fecharMac() {
    if (!macAberto()) return;

    mac.el.classList.add('is-closing');
    const encerrar = () => {
      mac.el.classList.remove('is-closing');
      mac.el.hidden = true;
      mac.body.innerHTML = '';
      mac.pilha = [];
      document.body.classList.remove('is-locked');
      if (mac.anterior && mac.anterior.focus) mac.anterior.focus({ preventScroll: true });
    };

    if (semMovimento) encerrar();
    else setTimeout(encerrar, 250);
  }

  /* --- conteúdo: projeto --- */
  function abrirProjeto(id, veioDePasta) {
    const p = PROJETOS.find((x) => x.id === id);
    if (!p) return;

    if (veioDePasta) mac.pilha.push({ tipo: 'pasta', id: veioDePasta });

    const slug = p.titulo.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const meta = [
      ['Cliente',   p.cliente],
      ['Ano',       p.ano],
      ['Meu papel', p.papel],
      ['Categoria', p.categoria],
    ].filter(([, v]) => v);

    const html = `
      <div class="pv__hero">
        <img src="${(p.galeria && p.galeria[0]) || p.capa}" alt="${p.titulo}">
      </div>

      <div class="pv__head">
        <span class="pv__cat">${p.categoria}</span>
        <h3 class="pv__title">${p.titulo}</h3>
        ${p.resumo ? `<p class="pv__resumo">${p.resumo}</p>` : ''}
      </div>

      ${meta.length ? `
      <div class="pv__meta">
        ${meta.map(([k, v]) => `
          <div>
            <p class="pv__metaLabel">${k}</p>
            <p class="pv__metaValue">${v}</p>
          </div>`).join('')}
      </div>` : ''}

      ${p.descricao ? `<div class="pv__body"><p>${p.descricao}</p></div>` : ''}

      ${(p.tags && p.tags.length) ? `
      <ul class="pv__tags">
        ${p.tags.map((t) => `<li class="chip">${t}</li>`).join('')}
      </ul>` : ''}

      ${(p.galeria && p.galeria.length > 1) ? `
      <div class="pv__gallery">
        ${p.galeria.slice(1).map((g) => `<img src="${g}" alt="${p.titulo}" loading="lazy">`).join('')}
      </div>` : '<div style="height:34px"></div>'}

      <div class="pv__foot">
        ${p.link ? `<a class="btn btn--primary" href="${p.link}" target="_blank" rel="noopener noreferrer">Ver projeto completo</a>` : ''}
        <a class="btn btn--ghost" href="mailto:${PERFIL.email}">Quero um projeto assim</a>
      </div>`;

    mostrarMac(`portfolio.com/projetos/${slug}`, p.titulo, html, Boolean(veioDePasta));
  }

  /* --- conteúdo: pasta --- */
  function abrirPasta(id, voltando) {
    const pasta = PASTAS.find((x) => x.id === id);
    if (!pasta) return;

    if (voltando) mac.pilha = [];
    const itens = projetosDaPasta(id);

    const html = `
      <div class="fv__head">
        <h3 class="fv__title">${pasta.nome}</h3>
        <span class="fv__count">${itens.length} ${itens.length === 1 ? 'item' : 'itens'}</span>
      </div>
      <p class="fv__desc">${pasta.descricao}</p>

      ${itens.length ? `
      <div class="fv__grid">
        ${itens.map((p) => `
          <button class="fv__item" data-abrir="${p.id}" data-de="${id}">
            <img class="fv__thumb" src="${p.capa}" alt="" loading="lazy">
            <p class="fv__name">${p.titulo}</p>
            <p class="fv__ext">${p.ano} · ${p.categoria}</p>
          </button>`).join('')}
      </div>`
      : '<p class="fv__empty">Pasta vazia por enquanto — os projetos chegam aqui assim que você adicionar no data.js.</p>'}`;

    mostrarMac(`portfolio.com/arquivos/${id}`, pasta.nome, html, false);

    $$('.fv__item', mac.body).forEach((btn) => {
      btn.addEventListener('click', () => abrirProjeto(btn.dataset.abrir, btn.dataset.de));
    });
  }

  /* ======================================================================
     9. AVATAR QUE OLHA PARA O MOUSE

     O mouse na esquerda mostra o começo da animação, no centro o meio e na
     direita o fim — então basta que o personagem vire a cabeça da esquerda
     para a direita, num movimento só.

     Três modos, escolhidos sozinho, nesta ordem:
       1. sequência de frames em assets/hero/frames/  (o mais suave)
       2. vídeo em assets/hero/avatar-look.mp4        (rebobinado pelo mouse)
       3. imagem parada com inclinação 3D             (funciona sempre)
     ==================================================================== */

  function urlDoFrame(cfg, n) {
    const numero = String(n).padStart(cfg.digitos || 4, '0');
    return `${cfg.pasta}${cfg.prefixo || ''}${numero}.${cfg.extensao}`;
  }

  function carregarImagem(src) {
    return new Promise((ok, falha) => {
      const img = new Image();
      img.onload = () => ok(img);
      img.onerror = falha;
      img.src = src;
    });
  }

  /* Carrega a sequência inteira. Se `quantidade` for 0, descobre sozinho:
     vai pedindo em lotes e para no primeiro frame que não existir. */
  async function carregarFrames(cfg) {
    if (!cfg || !cfg.pasta || !cfg.extensao) return null;

    let primeiro;
    try { primeiro = await carregarImagem(urlDoFrame(cfg, 1)); }
    catch (_) { return null; }                       // não há frames, segue o baile

    const frames = [primeiro];
    const limite = cfg.quantidade > 0 ? cfg.quantidade : 600;
    const lote = 12;

    for (let n = 2; n <= limite; n += lote) {
      const pedidos = [];
      for (let i = n; i < n + lote && i <= limite; i++) {
        pedidos.push(carregarImagem(urlDoFrame(cfg, i)).catch(() => null));
      }
      const carregados = await Promise.all(pedidos);
      for (const img of carregados) {
        if (!img) return frames;                     // fim da sequência
        frames.push(img);
      }
    }
    return frames;
  }

  /* Desenha um frame no canvas imitando object-fit:cover + object-position */
  function desenharFrame(canvas, ctx, img, posY) {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const larg = Math.round(r.width * dpr);
    const alt = Math.round(r.height * dpr);

    if (canvas.width !== larg || canvas.height !== alt) {
      canvas.width = larg;
      canvas.height = alt;
    }

    const escala = Math.max(larg / img.naturalWidth, alt / img.naturalHeight);
    const dw = img.naturalWidth * escala;
    const dh = img.naturalHeight * escala;
    ctx.clearRect(0, 0, larg, alt);
    ctx.drawImage(img, (larg - dw) * 0.5, (alt - dh) * posY, dw, dh);
  }

  function iniciarAvatar() {
    const caixa  = $('#avatar');
    const video  = $('#avatarVideo');
    const imagem = $('#avatarImg');
    const canvas = $('#avatarCanvas');
    if (!caixa) return;

    if (PERFIL.avatarImagem) imagem.src = PERFIL.avatarImagem;

    const ctx = canvas ? canvas.getContext('2d') : null;
    const posY = 0.12;             // mesmo enquadramento do object-position do CSS

    let alvoX = 0, alvoY = 0;      // -1 .. 1
    let atualX = 0, atualY = 0;
    let modo = 'imagem';
    let frames = null;
    let frameAtual = -1;

    // ---- 1. sequência de frames ----
    if (!semMovimento && PERFIL.avatarFrames && ctx) {
      carregarFrames(PERFIL.avatarFrames).then((lista) => {
        if (!lista || lista.length < 2) return;
        frames = lista;
        modo = 'frames';
        frameAtual = -1;
        caixa.classList.add('has-frames');
        caixa.classList.remove('has-video');
      }).catch(() => { /* segue com vídeo ou imagem */ });
    }

    // ---- 2. vídeo ----
    if (!semMovimento && PERFIL.avatarVideo) {
      video.addEventListener('loadedmetadata', () => {
        if (modo === 'frames') return;               // frames têm prioridade
        if (!isFinite(video.duration) || video.duration <= 0) return;
        modo = 'video';
        video.pause();
        video.currentTime = video.duration / 2;
        caixa.classList.add('has-video');
      });
      video.addEventListener('error', () => { /* sem vídeo, tudo bem */ });
      video.src = PERFIL.avatarVideo;
      video.load();
    }

    // ---- posição do ponteiro ----
    const aoMover = (x, y) => {
      const r = caixa.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // referência: metade da largura da tela, para o olhar ter alcance
      alvoX = Math.max(-1, Math.min(1, (x - cx) / (window.innerWidth * 0.42)));
      alvoY = Math.max(-1, Math.min(1, (y - cy) / (window.innerHeight * 0.5)));
    };

    window.addEventListener('pointermove', (e) => aoMover(e.clientX, e.clientY), { passive: true });
    window.addEventListener('pointerleave', () => { alvoX = 0; alvoY = 0; });
    window.addEventListener('resize', () => { frameAtual = -1; });   // redesenha no novo tamanho

    // ---- loop de animação (suaviza o movimento) ----
    function quadro() {
      atualX += (alvoX - atualX) * 0.09;
      atualY += (alvoY - atualY) * 0.09;

      if (modo === 'frames') {
        const i = Math.round(((atualX + 1) / 2) * (frames.length - 1));
        if (i !== frameAtual) {
          frameAtual = i;
          desenharFrame(canvas, ctx, frames[i], posY);
        }
        caixa.style.transform =
          `perspective(900px) rotateY(${atualX * 3}deg) rotateX(${-atualY * 2}deg)`;

      } else if (modo === 'video') {
        // mapeia a posição horizontal para o tempo do vídeo
        const destino = ((atualX + 1) / 2) * video.duration;
        if (Math.abs(video.currentTime - destino) > 0.012 && video.readyState >= 2) {
          try { video.currentTime = destino; } catch (_) { /* seek ainda ocupado */ }
        }
        caixa.style.transform =
          `perspective(900px) rotateY(${atualX * 3}deg) rotateX(${-atualY * 2}deg)`;

      } else {
        // fallback: a própria imagem inclina em 3D na direção do mouse
        caixa.style.transform =
          `perspective(900px) rotateY(${atualX * 13}deg) rotateX(${-atualY * 8}deg) translate3d(${atualX * 9}px, ${atualY * 5}px, 0)`;
      }

      requestAnimationFrame(quadro);
    }

    if (!semMovimento) requestAnimationFrame(quadro);
  }

  /* ======================================================================
     10. NAVEGAÇÃO, REVEAL E DETALHES
     ==================================================================== */
  function iniciarNav() {
    const nav = $('#nav');
    const burger = $('#navBurger');
    const menu = $('#navMobile');

    const aoRolar = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });

    burger.addEventListener('click', () => {
      const aberto = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!aberto));
      menu.hidden = aberto;
    });

    $$('a', menu).forEach((a) => a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }));

    document.addEventListener('click', (e) => {
      if (menu.hidden) return;
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        burger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      }
    });
  }

  function iniciarReveal() {
    const alvos = $$('[data-reveal]');
    if (!alvos.length) return;

    if (!('IntersectionObserver' in window)) {
      alvos.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-in');
        obs.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    alvos.forEach((el) => obs.observe(el));
  }

  /* ======================================================================
     BOOT
     ==================================================================== */
  function iniciar() {
    montarPerfil();
    montarFerramentas();
    montarServicos();
    montarCarrossel();
    montarPastas();
    montarSobre();
    montarContato();
    iniciarMac();
    iniciarAvatar();
    iniciarNav();
    iniciarReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
