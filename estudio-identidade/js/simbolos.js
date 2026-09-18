/* ============================================================
   SÍMBOLOS — desenho vetorial gerado a partir da paleta
   Sete estilos, três variantes cada. Nenhum degradê: volume é
   feito com faces chapadas, textura é feita com ruído.
   ============================================================ */

let _uid = 0;
const novoId = () => 'sb' + (++_uid);

function gerarSimbolo(estilo, variante, paleta, inicial, fonteDisplay) {
  const p = papeis(paleta);
  const letra = (inicial || 'V').trim().charAt(0).toUpperCase() || 'V';
  const fonte = fonteDisplay || "'Archivo', sans-serif";
  const v = ((variante || 0) % 3 + 3) % 3;
  const ctx = { p, letra, fonte, id: novoId() };
  const corpo = (DESENHOS[estilo] || DESENHOS['geometrico-solido'])[v](ctx);
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Símbolo da marca">${corpo}</svg>`;
}

/* Caminho de squircle (canto contínuo, não raio simples). */
function squircle(x, y, t, k = 0.42) {
  const r = t * k, x2 = x + t, y2 = y + t;
  return `M${x + r},${y} L${x2 - r},${y} C${x2 - r * 0.24},${y} ${x2},${y + r * 0.24} ${x2},${y + r}
          L${x2},${y2 - r} C${x2},${y2 - r * 0.24} ${x2 - r * 0.24},${y2} ${x2 - r},${y2}
          L${x + r},${y2} C${x + r * 0.24},${y2} ${x},${y2 - r * 0.24} ${x},${y2 - r}
          L${x},${y + r} C${x},${y + r * 0.24} ${x + r * 0.24},${y} ${x + r},${y} Z`;
}

const DESENHOS = {

  /* ---- Minimalista linear ---- */
  'minimal-linear': [
    ({ p }) => `
      <g fill="none" stroke="${p.tinta}" stroke-width="5" stroke-linecap="round">
        <circle cx="60" cy="60" r="36"/>
        <path d="M60,24 L60,96" stroke="${p.destaque}"/>
        <path d="M24,60 A36,36 0 0 1 96,60" stroke="${p.destaque}"/>
      </g>`,
    ({ p }) => `
      <g fill="none" stroke="${p.tinta}" stroke-width="6" stroke-linecap="round">
        <path d="M32,88 C32,52 88,68 88,32"/>
        <path d="M32,32 L32,52" stroke="${p.destaque}"/>
        <path d="M88,88 L88,68" stroke="${p.destaque}"/>
      </g>`,
    ({ p }) => `
      <g fill="none" stroke="${p.tinta}" stroke-width="5" stroke-linecap="round">
        <path d="M60,20 L60,100 M20,60 L100,60"/>
        <path d="M34,34 L86,86 M86,34 L34,86" stroke="${p.apoio}" stroke-width="3"/>
        <circle cx="60" cy="60" r="12" fill="${p.destaque}" stroke="none"/>
      </g>`
  ],

  /* ---- Geométrico sólido ---- */
  'geometrico-solido': [
    ({ p, id }) => `
      <defs><mask id="m${id}">
        <rect width="120" height="120" fill="#fff"/>
        <circle cx="76" cy="44" r="22" fill="#000"/>
      </mask></defs>
      <path d="${squircle(16, 16, 88)}" fill="${p.destaque}" mask="url(#m${id})"/>
      <circle cx="76" cy="44" r="12" fill="${p.tinta}"/>`,
    ({ p }) => `
      <path d="${squircle(16, 16, 88)}" fill="${p.tinta}"/>
      <path d="M60,104 L60,60 L104,60 A44,44 0 0 1 60,104 Z" fill="${p.destaque}"/>
      <circle cx="42" cy="42" r="10" fill="${p.apoio}"/>`,
    ({ p }) => `
      <g>
        <rect x="16" y="22" width="88" height="22" rx="11" fill="${p.tinta}"/>
        <rect x="16" y="49" width="60" height="22" rx="11" fill="${p.destaque}"/>
        <rect x="16" y="76" width="88" height="22" rx="11" fill="${p.apoio}"/>
      </g>`
  ],

  /* ---- Orgânico ---- */
  'organico': [
    ({ p }) => `
      <path d="M60,14 C88,14 106,34 106,60 C106,88 84,106 58,106 C32,106 14,86 14,60 C14,32 34,14 60,14 Z"
            fill="${p.destaque}"/>
      <path d="M66,36 C84,40 92,56 86,72 C80,88 62,94 48,86 C36,79 34,60 44,48 C50,40 58,34 66,36 Z"
            fill="${p.tinta}" opacity="0.9"/>`,
    ({ p }) => `
      <path d="M22,98 C22,52 52,22 98,22 C98,68 68,98 22,98 Z" fill="${p.destaque}"/>
      <path d="M40,88 C40,58 58,40 88,40" fill="none" stroke="${p.tinta}" stroke-width="6" stroke-linecap="round"/>`,
    ({ p }) => `
      <path d="M60,16 C78,40 96,54 96,72 C96,92 80,106 60,106 C40,106 24,92 24,72 C24,54 42,40 60,16 Z"
            fill="${p.tinta}"/>
      <path d="M60,44 C70,58 80,66 80,76 C80,87 71,94 60,94 C49,94 40,87 40,76 C40,66 50,58 60,44 Z"
            fill="${p.destaque}"/>`
  ],

  /* ---- Maximalista detalhado ---- */
  'maximalista': [
    ({ p, letra, fonte }) => {
      const raios = Array.from({ length: 24 }, (_, i) =>
        `<rect x="59" y="4" width="2" height="12" rx="1" fill="${p.apoio}" transform="rotate(${i * 15} 60 60)"/>`).join('');
      return `
        ${raios}
        <circle cx="60" cy="60" r="42" fill="none" stroke="${p.tinta}" stroke-width="2"/>
        <circle cx="60" cy="60" r="37" fill="${p.tinta}"/>
        <circle cx="60" cy="60" r="31" fill="none" stroke="${p.destaque}" stroke-width="1.5" stroke-dasharray="3 4"/>
        <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
              font-family="${fonte}" font-size="34" font-weight="700" fill="${p.destaque}">${letra}</text>`;
    },
    ({ p, letra, fonte }) => `
      <path d="M60,10 L100,26 L100,62 C100,86 82,102 60,110 C38,102 20,86 20,62 L20,26 Z" fill="${p.tinta}"/>
      <path d="M60,18 L93,31 L93,62 C93,82 78,95 60,102 C42,95 27,82 27,62 L27,31 Z" fill="none" stroke="${p.destaque}" stroke-width="2"/>
      <path d="M34,64 C34,80 46,90 60,96" fill="none" stroke="${p.apoio}" stroke-width="3" stroke-linecap="round"/>
      <path d="M86,64 C86,80 74,90 60,96" fill="none" stroke="${p.apoio}" stroke-width="3" stroke-linecap="round"/>
      <text x="60" y="56" text-anchor="middle" dominant-baseline="central"
            font-family="${fonte}" font-size="32" font-weight="700" fill="${p.destaque}">${letra}</text>`,
    ({ p, letra, fonte }) => {
      const pontos = Array.from({ length: 16 }, (_, i) =>
        `<circle cx="60" cy="14" r="2.4" fill="${p.destaque}" transform="rotate(${i * 22.5} 60 60)"/>`).join('');
      return `
        <circle cx="60" cy="60" r="52" fill="none" stroke="${p.tinta}" stroke-width="1.5"/>
        ${pontos}
        <circle cx="60" cy="60" r="34" fill="none" stroke="${p.tinta}" stroke-width="7"/>
        <path d="M60,32 L67,52 L88,52 L71,64 L78,84 L60,72 L42,84 L49,64 L32,52 L53,52 Z" fill="${p.apoio}" opacity="0.55"/>
        <text x="60" y="61" text-anchor="middle" dominant-baseline="central"
              font-family="${fonte}" font-size="30" font-weight="700" fill="${p.tinta}">${letra}</text>`;
    }
  ],

  /* ---- Dimensional: faces chapadas, sem degradê ---- */
  'dimensional': [
    ({ p }) => {
      const topo = clarear(p.destaque, 14), lado = escurecer(p.destaque, 16), frente = p.destaque;
      return `
        <g>
          <path d="M60,16 L104,40 L60,64 L16,40 Z" fill="${topo}"/>
          <path d="M16,40 L60,64 L60,106 L16,82 Z" fill="${frente}"/>
          <path d="M104,40 L104,82 L60,106 L60,64 Z" fill="${lado}"/>
        </g>`;
    },
    ({ p }) => {
      const topo = clarear(p.destaque, 16), lado = escurecer(p.destaque, 18);
      return `
        <path d="M24,92 A36,36 0 0 1 96,92 L80,92 A20,20 0 0 0 40,92 Z" fill="${topo}"/>
        <path d="M24,92 L24,102 A36,36 0 0 0 96,102 L96,92 L80,92 L80,102 A20,20 0 0 1 40,102 L40,92 Z" fill="${lado}"/>
        <circle cx="60" cy="44" r="12" fill="${p.tinta}"/>`;
    },
    ({ p }) => {
      const a = p.destaque, b = p.apoio, c = p.tinta;
      const placa = (y, fill) => `
        <path d="M60,${y} L100,${y + 14} L60,${y + 28} L20,${y + 14} Z" fill="${fill}"/>
        <path d="M20,${y + 14} L60,${y + 28} L60,${y + 36} L20,${y + 22} Z" fill="${escurecer(fill, 14)}"/>
        <path d="M100,${y + 14} L100,${y + 22} L60,${y + 36} L60,${y + 28} Z" fill="${escurecer(fill, 24)}"/>`;
      return placa(56, c) + placa(36, b) + placa(16, a);
    }
  ],

  /* ---- Artesanal: traço que treme, tinta que falha ---- */
  'artesanal': [
    ({ p, letra, fonte, id }) => `
      <defs><filter id="f${id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
      </filter></defs>
      <g filter="url(#f${id})">
        <circle cx="60" cy="60" r="44" fill="none" stroke="${p.tinta}" stroke-width="6"/>
        <circle cx="60" cy="60" r="34" fill="none" stroke="${p.destaque}" stroke-width="2" stroke-dasharray="6 5"/>
        <text x="60" y="62" text-anchor="middle" dominant-baseline="central"
              font-family="${fonte}" font-size="36" font-weight="700" fill="${p.tinta}">${letra}</text>
      </g>`,
    ({ p, letra, fonte, id }) => `
      <defs><filter id="f${id}">
        <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="2" seed="3" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
      </filter></defs>
      <g filter="url(#f${id})">
        <rect x="18" y="18" width="84" height="84" fill="${p.destaque}"/>
        <rect x="26" y="26" width="68" height="68" fill="none" stroke="${p.tinta}" stroke-width="3"/>
        <text x="60" y="62" text-anchor="middle" dominant-baseline="central"
              font-family="${fonte}" font-size="40" font-weight="700" fill="${p.tinta}">${letra}</text>
      </g>`,
    ({ p, letra, fonte, id }) => `
      <defs><filter id="f${id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="11" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
      </filter></defs>
      <g filter="url(#f${id})">
        <path d="M60,12 C88,16 108,36 106,62 C104,90 82,108 56,106 C30,104 12,84 14,58 C16,32 36,10 60,12 Z" fill="${p.tinta}"/>
        <text x="60" y="62" text-anchor="middle" dominant-baseline="central"
              font-family="${fonte}" font-size="38" font-weight="700" fill="${p.base}">${letra}</text>
      </g>`
  ],

  /* ---- Mecânico / modular ---- */
  'mecanico': [
    ({ p }) => {
      const mapa = [
        [0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 2, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]
      ];
      let s = '';
      mapa.forEach((linha, y) => linha.forEach((c, x) => {
        if (!c) return;
        s += `<rect x="${16 + x * 18}" y="${16 + y * 18}" width="14" height="14" rx="2"
                fill="${c === 2 ? p.destaque : p.tinta}"/>`;
      }));
      return s;
    },
    ({ p }) => {
      let s = '';
      for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) {
        const d = Math.abs(x - 2.5) + Math.abs(y - 2.5);
        const r = 1.6 + (5 - d) * 1.1;
        s += `<circle cx="${18 + x * 17}" cy="${18 + y * 17}" r="${Math.max(1.2, r)}"
                fill="${d < 2 ? p.destaque : p.tinta}"/>`;
      }
      return s;
    },
    ({ p }) => `
      <rect x="14" y="14" width="92" height="92" fill="none" stroke="${p.tinta}" stroke-width="3"/>
      <rect x="30" y="30" width="60" height="60" fill="none" stroke="${p.tinta}" stroke-width="3"/>
      <rect x="46" y="46" width="28" height="28" fill="${p.destaque}"/>
      <g stroke="${p.apoio}" stroke-width="2">
        <path d="M60,4 L60,14 M60,106 L60,116 M4,60 L14,60 M106,60 L116,60"/>
      </g>`
  ]
};

/* Lockup: símbolo + nome, do jeito que vai para o cabeçalho do site. */
function gerarLockup(estado, paleta, tipografia, opts = {}) {
  const p = papeis(paleta);
  const corTexto = opts.corTexto || p.tinta;
  const tam = opts.tamanho || 34;
  const svg = gerarSimbolo(estado.simbolo.estilo, estado.simbolo.variante, paleta, estado.marca, tipografia.display.familia);
  return `<span class="lockup" style="gap:${tam * 0.28}px">
      <span class="lockup-marca" style="width:${tam}px;height:${tam}px">${svg}</span>
      <span class="lockup-nome" style="font-family:${tipografia.display.familia};font-weight:${tipografia.display.peso};
            font-size:${tam * 0.62}px;color:${corTexto};text-transform:${tipografia.display.caixa};
            letter-spacing:${tipografia.display.tracking}">${estado.marca}</span>
    </span>`;
}
