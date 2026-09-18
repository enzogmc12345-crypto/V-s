/* ============================================================
   PAINEL — a identidade aparecendo enquanto se escolhe
   Duas vistas: o painel de marca (A B C D, tipo, símbolo, grid)
   e a prévia do site de software — o mundo que o cliente habita.
   ============================================================ */

const COPIA = {
  'saas-b2b':   { rotulo: 'Operação sem atrito', h1: ['Todo o time', 'na mesma tela.'], sub: 'Uma plataforma para acompanhar processo, prazo e responsável sem abrir cinco abas.', cta: 'Começar agora', cta2: 'Ver demonstração', cards: ['Fluxos prontos', 'Relatório em tempo real', 'Integra com o que você já usa'] },
  'fintech':    { rotulo: 'Crédito e pagamentos', h1: ['Dinheiro entra.', 'Ninguém se perde.'], sub: 'Conciliação automática, antecipação em um clique e um extrato que o contador entende.', cta: 'Abrir conta', cta2: 'Falar com especialista', cards: ['Liquidação em D+0', 'Antifraude embarcado', 'API documentada'] },
  'healthtech': { rotulo: 'Gestão clínica', h1: ['A clínica inteira', 'em uma tela só.'], sub: 'Agenda, prontuário e retorno do paciente no mesmo lugar — sem papel, sem ligação perdida.', cta: 'Agendar demonstração', cta2: 'Conhecer o sistema', cards: ['Agenda por cadeira', 'Prontuário com imagem', 'Lembrete automático'] },
  'beleza':     { rotulo: 'Estética & bem-estar', h1: ['Seu protocolo,', 'do primeiro contato.'], sub: 'Reserva online, ficha de anamnese e histórico do procedimento, com a cara do seu estúdio.', cta: 'Quero conhecer', cta2: 'Ver protocolos', cards: ['Reserva pelo link', 'Ficha digital', 'Antes e depois organizado'] },
  'edtech':     { rotulo: 'Educação', h1: ['Aula que continua', 'depois da aula.'], sub: 'Conteúdo, turma e progresso em um ambiente que aluno e responsável abrem sem tutorial.', cta: 'Criar minha turma', cta2: 'Ver exemplo', cards: ['Trilhas por nível', 'Correção assistida', 'Boletim que se explica'] },
  'commerce':   { rotulo: 'Loja online', h1: ['Da vitrine', 'ao carrinho.'], sub: 'Catálogo, estoque e checkout que carregam rápido e respeitam o desenho da sua marca.', cta: 'Montar minha loja', cta2: 'Ver casos', cards: ['Checkout em 2 passos', 'Estoque unificado', 'Tema sob medida'] },
  'devtools':   { rotulo: 'Infraestrutura & IA', h1: ['Implantar', 'em um comando.'], sub: 'Ambiente reproduzível, logs legíveis e uma API que não muda sem avisar.', cta: 'Ler a documentação', cta2: 'Instalar CLI', cards: ['CLI primeiro', 'Observabilidade nativa', 'SDK em 6 linguagens'] }
};

const PADRAO_COPIA = { rotulo: 'Software', h1: ['Uma ideia clara,', 'em uma tela só.'], sub: 'Descreva o produto em uma frase e deixe o resto da página provar.', cta: 'Começar', cta2: 'Saiba mais', cards: ['Rápido de usar', 'Feito para escalar', 'Suporte de gente'] };

/* Tipografia de apoio, usada enquanto o par não foi escolhido. */
const TIPO_NEUTRO = { id: 'neutro', nome: 'Neutra',
  display: { familia: "'Archivo', sans-serif", peso: 700, caixa: 'none', tracking: '-0.02em' },
  texto: { familia: "'Manrope', sans-serif", peso: 400 } };

/* ---------- utilidades de estado ---------- */
const getPaleta     = e => PALETAS.find(x => x.id === e.paletaId) || null;
const getTipografia = e => TIPOGRAFIAS.find(x => x.id === e.tipografiaId) || null;
const getFoto       = e => FOTOGRAFIAS.find(x => x.id === e.fotoId) || null;
const getPersona    = e => PERSONAS.find(x => x.id === e.personaId) || null;
const getVertical   = e => VERTICAIS.find(x => x.id === e.vertical) || null;
const temElemento   = (e, id) => e.elementos.includes(id);

/* ---------- texturas e ornamentos reaproveitados ---------- */
const GRAO_URI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function camadaGrao(opacidade = 0.16) {
  return `<span class="cam cam-grao" style="background-image:${GRAO_URI};opacity:${opacidade}"></span>`;
}
function camadaGrade(cor, passo = 44) {
  return `<span class="cam" style="background-image:
      linear-gradient(to right, ${cor} 0 1px, transparent 1px 100%),
      linear-gradient(to bottom, ${cor} 0 1px, transparent 1px 100%);
      background-size:${passo}px ${passo}px;opacity:.5"></span>`;
}
function camadaHalftone(cor, passo = 9) {
  return `<span class="cam" style="background-image:radial-gradient(${cor} 0 1.1px, transparent 1.2px);
      background-size:${passo}px ${passo}px;opacity:.5"></span>`;
}
function selo(texto, cor, corTexto, tamanho = 84) {
  const id = novoId();
  const t = (texto + ' • ').repeat(3).toUpperCase();
  return `<svg class="selo" viewBox="0 0 120 120" width="${tamanho}" height="${tamanho}" aria-hidden="true">
    <defs><path id="p${id}" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"/></defs>
    <circle cx="60" cy="60" r="52" fill="${cor}"/>
    <text font-family="'JetBrains Mono', monospace" font-size="10.5" letter-spacing="1.5" fill="${corTexto}">
      <textPath href="#p${id}" startOffset="0">${t}</textPath></text>
    <circle cx="60" cy="60" r="26" fill="none" stroke="${corTexto}" stroke-width="1.5"/>
  </svg>`;
}

/* Silhueta abstrata: a pessoa que passa na frente da palavra. */
function silhueta(cor, corApoio) {
  return `<svg viewBox="0 0 220 300" class="silhueta" aria-hidden="true">
    <path d="M110,18 C136,18 152,38 152,64 C152,86 140,102 126,110 L150,118 C182,128 200,156 202,190 L208,300 L12,300 L18,190 C20,156 38,128 70,118 L94,110 C80,102 68,86 68,64 C68,38 84,18 110,18 Z" fill="${cor}"/>
    <path d="M110,110 L94,148 L110,188 L126,148 Z" fill="${corApoio}" opacity="0.65"/>
  </svg>`;
}

/* Miniatura de cada direção fotográfica, feita só com forma e cor. */
function miniFoto(foto, p) {
  const c = p.destaque, d = p.apoio, t = p.tinta;
  const arte = {
    'retrato-editorial': `<rect width="120" height="90" fill="${c}"/><circle cx="60" cy="52" r="24" fill="${t}"/><rect x="36" y="74" width="48" height="16" rx="8" fill="${t}"/>`,
    'documental': `<rect width="120" height="90" fill="${d}"/><rect x="10" y="48" width="26" height="42" fill="${t}"/><rect x="44" y="34" width="26" height="56" fill="${t}" opacity=".8"/><rect x="78" y="56" width="30" height="34" fill="${t}" opacity=".6"/><rect x="0" y="0" width="120" height="16" fill="${c}"/>`,
    'macro-textura': `<rect width="120" height="90" fill="${t}"/>${Array.from({length:9},(_,i)=>`<path d="M${-20+i*18},90 C${-4+i*18},54 ${4+i*18},36 ${20+i*18},0" stroke="${c}" stroke-width="7" fill="none" opacity="${0.35+i*0.06}"/>`).join('')}`,
    'render-abstrato': `<rect width="120" height="90" fill="${t}"/><circle cx="46" cy="44" r="26" fill="${c}"/><rect x="62" y="30" width="38" height="38" rx="12" fill="${d}"/>`,
    'arquitetura-luz': `<rect width="120" height="90" fill="${d}"/><path d="M0,90 L44,0 L120,0 L120,90 Z" fill="${p.base}"/><path d="M62,0 L100,90 L44,90 Z" fill="${t}" opacity=".85"/>`,
    'analogico-grao': `<rect width="120" height="90" fill="${c}"/><circle cx="72" cy="40" r="30" fill="${t}" opacity=".85"/><rect x="0" y="66" width="120" height="24" fill="${d}" opacity=".7"/>`,
    'natureza-organica': `<rect width="120" height="90" fill="${p.base}"/><path d="M60,88 C22,72 18,30 60,6 C102,30 98,72 60,88 Z" fill="${c}"/><path d="M60,88 L60,18" stroke="${t}" stroke-width="3"/>`
  }[foto.id] || `<rect width="120" height="90" fill="${c}"/>`;
  return `<svg viewBox="0 0 120 90" class="mini-foto" aria-hidden="true">${arte}</svg>`;
}

/* Miniatura de cada elemento de composição. */
function miniElemento(id, p) {
  const box = interno => `<svg viewBox="0 0 120 80" class="mini-el" aria-hidden="true"><rect width="120" height="80" fill="${p.base}"/>${interno}</svg>`;
  switch (id) {
    case 'grade': return box(Array.from({length:7},(_,i)=>`<path d="M${i*20},0 L${i*20},80" stroke="${p.apoio}" stroke-width="1"/>`).join('') + Array.from({length:5},(_,i)=>`<path d="M0,${i*20} L120,${i*20}" stroke="${p.apoio}" stroke-width="1"/>`).join(''));
    case 'filetes': return box(`<path d="M12,26 L108,26 M12,40 L108,40 M12,54 L70,54" stroke="${p.tinta}" stroke-width="1.5"/><rect x="12" y="12" width="30" height="4" fill="${p.destaque}"/>`);
    case 'grao': return box(`<rect width="120" height="80" fill="${p.destaque}"/><rect width="120" height="80" fill="${p.tinta}" opacity=".18"/>`);
    case 'colagem': return box(`<rect x="8" y="14" width="56" height="48" fill="${p.destaque}" transform="rotate(-6 36 38)"/><rect x="50" y="22" width="60" height="44" fill="${p.tinta}" transform="rotate(4 80 44)"/><rect x="34" y="8" width="34" height="30" fill="${p.apoio}" transform="rotate(12 51 23)"/>`);
    case 'sobreposicao': return box(`<text x="8" y="52" font-family="'Archivo',sans-serif" font-weight="800" font-size="30" fill="${p.tinta}">MARCA</text><circle cx="78" cy="44" r="24" fill="${p.destaque}"/><path d="M60,80 C60,58 96,58 96,80 Z" fill="${p.destaque}"/>`);
    case 'selo': return box(`<circle cx="60" cy="40" r="26" fill="${p.destaque}"/><circle cx="60" cy="40" r="14" fill="none" stroke="${p.base}" stroke-width="2"/>`);
    case 'blocos': return box(`<rect x="0" y="0" width="70" height="80" fill="${p.destaque}"/><rect x="70" y="0" width="50" height="40" fill="${p.apoio}"/><rect x="70" y="40" width="50" height="40" fill="${p.tinta}"/>`);
    case 'halftone': return box(Array.from({length:8},(_,y)=>Array.from({length:12},(_,x)=>`<circle cx="${5+x*10}" cy="${5+y*10}" r="${1+ (x/12)*3.4}" fill="${p.tinta}"/>`).join('')).join(''));
    default: return box('');
  }
}

function miniGrid(id, p) {
  const col = n => Array.from({length:n},(_,i)=>`<rect x="${6+i*(108/n)}" y="6" width="${108/n-4}" height="68" fill="${p.destaque}" opacity=".35"/>`).join('');
  const arte = { '12col': col(12),
    'modular': Array.from({length:16},(_,i)=>`<rect x="${6+(i%4)*28}" y="${6+Math.floor(i/4)*18}" width="24" height="14" fill="${p.destaque}" opacity=".35"/>`).join(''),
    'editorial': `<rect x="26" y="6" width="40" height="68" fill="${p.destaque}" opacity=".35"/><rect x="70" y="6" width="40" height="68" fill="${p.destaque}" opacity=".2"/>` }[id] || '';
  return `<svg viewBox="0 0 120 80" class="mini-el" aria-hidden="true"><rect width="120" height="80" fill="${p.base}"/>${arte}</svg>`;
}

/* ============================================================
   PAINEL DE MARCA
   ============================================================ */
function blocoPendente(titulo, dica) {
  return `<article class="bloco bloco--pendente"><h3>${titulo}</h3><p>${dica}</p></article>`;
}

function renderPainel(e) {
  const paleta = getPaleta(e), tipo = getTipografia(e);
  const p = paleta ? papeis(paleta) : { base: '#141414', tinta: '#EDEDED', destaque: '#FF6A1F', apoio: '#6B6B6B' };
  const adjetivos = adjetivosDoVetor(e.vetor);
  const vert = getVertical(e);

  let html = `<article class="bloco bloco--capa" style="background:${p.base};color:${p.tinta}">
    ${temElemento(e, 'grao') ? camadaGrao(0.14) : ''}
    ${temElemento(e, 'grade') ? camadaGrade(misturar(p.tinta, p.base, 0.82)) : ''}
    <div class="capa-topo">
      ${paleta && e.simbolo
        ? gerarLockup(e, paleta, tipo || TIPO_NEUTRO, { tamanho: 40 })
        : `<span class="lockup-nome" style="font-size:24px">${e.marca}</span>`}
      <span class="etiqueta" style="border-color:${p.destaque};color:${p.destaque}">${vert ? vert.nome : 'sem vertical'}</span>
    </div>
    <p class="capa-frase" style="font-family:${tipo ? tipo.texto.familia : 'inherit'}">
      Identidade ${frase(adjetivos)}.${e.mundo ? ' <q>' + e.mundo + '</q>' : ''}</p>
  </article>`;

  /* paleta */
  if (paleta) {
    const nota = notaContraste(p.base, p.tinta);
    html += `<article class="bloco">
      <h3>Paleta · ${paleta.nome}</h3>
      <div class="chips">${paleta.cores.map(c => `
        <div class="chip" style="background:${c.hex};color:${tintaLegivel(c.hex)}">
          <b>${c.r}</b><span>${c.papel}</span><code>${c.hex.toUpperCase()}</code>
        </div>`).join('')}</div>
      <p class="nota">${paleta.combina}</p>
      <p class="nota nota--tec">Base × tinta: ${nota.razao.toFixed(1)}:1 · ${nota.nota}</p>
    </article>`;
  } else html += blocoPendente('Paleta', 'Escolha a temperatura da marca na etapa de cor.');

  /* tipografia */
  if (tipo) {
    html += `<article class="bloco">
      <h3>Tipografia · ${tipo.nome}</h3>
      <div class="espec" style="background:${p.base};color:${p.tinta}">
        <span class="espec-linha" style="font-family:${tipo.display.familia};font-weight:${tipo.display.peso};
              text-transform:${tipo.display.caixa};letter-spacing:${tipo.display.tracking}">Aa Bb Cc</span>
        <span class="espec-mini" style="font-family:${tipo.texto.familia}">
          O cliente não compra a sua opinião de design. Ele compra o mundo que reconhece.</span>
      </div>
      <div class="escala" style="font-family:${tipo.display.familia}">
        <span style="font-size:32px">48</span><span style="font-size:22px">32</span>
        <span style="font-size:16px">20</span><span style="font-family:${tipo.texto.familia};font-size:13px">16 texto</span>
      </div>
      <p class="nota">${tipo.nota}</p>
    </article>`;
  } else html += blocoPendente('Tipografia', 'A voz escrita vem depois da cor.');

  /* símbolo */
  if (paleta && e.simbolo) {
    const fonte = tipo ? tipo.display.familia : "'Archivo', sans-serif";
    const sv = (fundo, cor) => `<div class="simb-caixa" style="background:${fundo}">
        ${gerarSimbolo(e.simbolo.estilo, e.simbolo.variante, cor, e.marca, fonte)}</div>`;
    const invertida = { ...paleta, cores: [
      { r: 'A', papel: 'Base', hex: p.tinta }, { r: 'B', papel: 'Tinta', hex: p.base },
      { r: 'C', papel: 'Destaque', hex: p.destaque }, { r: 'D', papel: 'Apoio', hex: p.apoio }] };
    html += `<article class="bloco">
      <h3>Símbolo · ${(ESTILOS_SIMBOLO.find(s => s.id === e.simbolo.estilo) || {}).nome || ''}</h3>
      <div class="simb-grade">
        ${sv(p.base, paleta)}${sv(p.tinta, invertida)}
        <div class="simb-caixa simb-caixa--mini" style="background:${p.base}">
          ${gerarSimbolo(e.simbolo.estilo, e.simbolo.variante, paleta, e.marca, fonte)}</div>
      </div>
      <p class="nota">Positivo, negativo e redução a 24 px. Se some no terceiro, volte uma etapa.</p>
    </article>`;
  } else html += blocoPendente('Símbolo', 'O desenho vem da paleta — escolha a cor primeiro.');

  /* composição */
  if (e.elementos.length || e.grid) {
    html += `<article class="bloco">
      <h3>Composição</h3>
      <div class="minis">
        ${e.grid ? `<figure>${miniGrid(e.grid, p)}<figcaption>${(GRIDS.find(g => g.id === e.grid) || {}).nome || ''}</figcaption></figure>` : ''}
        ${e.elementos.map(id => {
          const el = ELEMENTOS.find(x => x.id === id);
          const mini = id === 'grao'
            ? `<span class="mini-el mini-el--grao" style="background:${p.destaque}">${camadaGrao(0.5)}</span>`
            : miniElemento(id, p);
          return `<figure>${mini}<figcaption>${el ? el.nome : id}</figcaption></figure>`;
        }).join('')}
      </div>
    </article>`;
  } else html += blocoPendente('Composição', 'Grade, filete, grão, colagem: o repertório gráfico da marca.');

  /* fotografia */
  const foto = getFoto(e);
  if (foto) {
    html += `<article class="bloco">
      <h3>Fotografia · ${foto.nome}</h3>
      <div class="foto-linha">${miniFoto(foto, p)}
        <div><p class="nota">${foto.nota}</p>
          <p class="nota nota--tec">Busca: <code>${foto.busca}</code></p>
          <a class="link-busca" target="_blank" rel="noopener"
             href="https://unsplash.com/s/photos/${encodeURIComponent(foto.busca)}">abrir em banco de imagens ↗</a>
        </div></div>
    </article>`;
  } else html += blocoPendente('Fotografia', 'A direção de imagem fecha o mundo — ou desmonta tudo.');

  /* persona */
  const persona = getPersona(e);
  if (persona) {
    html += `<article class="bloco bloco--persona" style="border-color:${p.destaque}">
      <h3>Persona · ${persona.nome}</h3>
      <p class="persona-papel">${persona.papel}</p>
      <p class="nota">${persona.contexto}</p>
      <dl class="persona-lista">
        <div><dt>Quer</dt><dd>${persona.quer}</dd></div>
        <div><dt>Teme</dt><dd>${persona.teme}</dd></div>
        <div><dt>Tom de voz</dt><dd>${persona.tom}</dd></div>
        <div><dt>Mundo</dt><dd>${persona.mundo}</dd></div>
      </dl>
    </article>`;
  } else html += blocoPendente('Persona', 'Quem precisa se reconhecer na primeira tela.');

  return html;
}

/* ============================================================
   PRÉVIA DO SITE — o mundo pronto para o cliente entrar
   ============================================================ */
function renderPrevia(e) {
  const paleta = getPaleta(e);
  if (!paleta) {
    return `<div class="previa-vazia"><p>A prévia acende quando a marca tiver cor.</p>
      <p class="nota">Etapa 03.</p></div>`;
  }
  const tipo = getTipografia(e) || TIPO_NEUTRO;
  const p = papeis(paleta);
  const c = COPIA[e.vertical] || PADRAO_COPIA;
  const claro = luminancia(p.base) > 0.4;
  const superficie = claro ? escurecer(p.base, 4) : clarear(p.base, 5);
  const borda = misturar(p.tinta, p.base, 0.84);
  const bordaGrade = misturar(p.tinta, p.base, 0.72);
  const dispTipo = `font-family:${tipo.display.familia};font-weight:${tipo.display.peso};
    text-transform:${tipo.display.caixa};letter-spacing:${tipo.display.tracking}`;
  const raio = { 'geometrico-solido': 14, 'organico': 22, 'minimal-linear': 8, 'mecanico': 2, 'dimensional': 10, 'artesanal': 6, 'maximalista': 4 }[e.simbolo ? e.simbolo.estilo : ''] ?? 10;
  const temSobre = temElemento(e, 'sobreposicao');
  const temBlocos = temElemento(e, 'blocos');

  const botao = (txt, primario) => `<span class="pv-btn" style="border-radius:${raio}px;
      background:${primario ? p.destaque : 'transparent'};
      color:${primario ? tintaLegivel(p.destaque) : p.tinta};
      border:1.5px solid ${primario ? p.destaque : borda};font-family:${tipo.texto.familia}">${txt}</span>`;

  return `<div class="previa" style="background:${p.base};color:${p.tinta};font-family:${tipo.texto.familia}">
    ${temElemento(e, 'grade') ? camadaGrade(bordaGrade, 52) : ''}
    ${temElemento(e, 'grao') ? camadaGrao(0.13) : ''}
    ${temElemento(e, 'halftone') ? `<span class="cam cam-halftone">${camadaHalftone(misturar(p.destaque, p.base, 0.55), 10)}</span>` : ''}

    <nav class="pv-nav" style="border-bottom:1px solid ${temElemento(e, 'filetes') ? p.tinta : borda}">
      ${gerarLockup(e, paleta, tipo, { tamanho: 26 })}
      <span class="pv-links">${['Produto', 'Preços', 'Clientes'].map(l => `<i>${l}</i>`).join('')}</span>
      ${botao(c.cta, true)}
    </nav>

    <header class="pv-hero ${temSobre ? 'pv-hero--sobre' : ''}">
      <div class="pv-hero-txt">
        <span class="pv-rotulo" style="color:${p.destaque};border-color:${p.destaque}">${c.rotulo}</span>
        <h1 style="${dispTipo}">
          ${temBlocos ? `<mark style="background:${p.destaque};color:${tintaLegivel(p.destaque)}">${c.h1[0]}</mark>` : c.h1[0]}
          <br><span style="color:${temBlocos ? p.tinta : p.destaque}">${c.h1[1]}</span>
        </h1>
        <p class="pv-sub">${c.sub}</p>
        <div class="pv-acoes">${botao(c.cta, true)}${botao(c.cta2, false)}</div>
      </div>
      ${temSobre ? `<span class="pv-gigante" style="${dispTipo};color:${misturar(p.tinta, p.base, 0.42)}">${e.marca}</span>` : ''}
      <div class="pv-hero-art">
        ${temSobre ? silhueta(p.destaque, p.apoio) : `
          <div class="pv-card" style="background:${superficie};border:1px solid ${borda};border-radius:${raio}px">
            <span class="pv-card-barra" style="background:${p.apoio}"></span>
            <span class="pv-card-barra" style="background:${p.apoio};width:60%"></span>
            <div class="pv-card-metrica" style="${dispTipo};color:${p.destaque}">98%</div>
            <span class="pv-card-barra" style="background:${p.apoio};width:40%"></span>
          </div>`}
        ${temElemento(e, 'selo') ? `<span class="pv-selo">${selo(e.marca + ' • desde 2026', p.destaque, tintaLegivel(p.destaque), 72)}</span>` : ''}
      </div>
    </header>

    <section class="pv-cards ${temElemento(e, 'colagem') ? 'pv-cards--colagem' : ''}">
      ${c.cards.map((t, i) => `
        <div class="pv-card-mini" style="background:${i === 1 && temBlocos ? p.destaque : superficie};
             color:${i === 1 && temBlocos ? tintaLegivel(p.destaque) : p.tinta};
             border:1px solid ${borda};border-radius:${raio}px">
          <span class="pv-ic" style="color:${i === 1 && temBlocos ? tintaLegivel(p.destaque) : p.destaque}">
            ${gerarSimbolo(e.simbolo ? e.simbolo.estilo : 'minimal-linear', i, paleta, e.marca, tipo.display.familia)}</span>
          <b style="${dispTipo}">${t}</b>
          <i>Uma linha de prova objetiva, do tamanho de um respiro.</i>
        </div>`).join('')}
    </section>

    <footer class="pv-cta" style="background:${temBlocos ? p.destaque : superficie};
            color:${temBlocos ? tintaLegivel(p.destaque) : p.tinta};border-top:1px solid ${borda}">
      <b style="${dispTipo}">${c.h1[0]} ${c.h1[1]}</b>
      ${botao(c.cta, !temBlocos)}
    </footer>
  </div>`;
}
