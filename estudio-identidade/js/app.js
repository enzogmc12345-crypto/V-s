/* ============================================================
   APP — o percurso guiado
   Nove etapas. A cada escolha o painel à direita ganha uma peça,
   e o argumento para o cliente é escrito junto.
   ============================================================ */

const CHAVE = 'vos-estudio-identidade-v1';

function estadoInicial() {
  return {
    marca: 'Aurora', vertical: null, mundo: '',
    vetor: { elegancia: 50, densidade: 50, humor: 50, tempo: 50, origem: 50, energia: 50, luz: 50 },
    familiaCor: 'todas', paletaId: null, simbolo: null, tipografiaId: null,
    elementos: [], grid: null, fotoId: null, personaId: null,
    etapa: 0, aba: 'painel'
  };
}

let estado = estadoInicial();

/* ---------- persistência ---------- */
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* modo privado */ }
}
function carregar() {
  const doHash = location.hash.startsWith('#id=') ? location.hash.slice(4) : null;
  if (doHash) {
    try { return { ...estadoInicial(), ...JSON.parse(decodeURIComponent(escape(atob(doHash)))) }; } catch (e) { /* link inválido */ }
  }
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) return { ...estadoInicial(), ...JSON.parse(bruto) };
  } catch (e) { /* segue com o padrão */ }
  return estadoInicial();
}
function paraLink() {
  const { etapa, aba, familiaCor, ...resto } = estado;
  return location.origin + location.pathname + '#id=' + btoa(unescape(encodeURIComponent(JSON.stringify(resto))));
}

/* ---------- etapas ---------- */
const ETAPAS = [
  { id: 'briefing',       nome: 'Briefing',        titulo: 'De quem é esse mundo?',            sub: 'Nome do produto e o terreno onde ele vive. O resto do estúdio se ajusta a isso.' },
  { id: 'caracteristicas',nome: 'Características', titulo: 'Empreste os olhos do cliente.',    sub: 'Não descreva o que você acha bonito. Descreva o que ele sente quando fala da empresa dele.' },
  { id: 'cor',            nome: 'Cor',             titulo: 'A cor vem primeiro.',              sub: 'Quatro papéis, nenhum degradê: base, tinta, destaque e apoio.' },
  { id: 'simbolo',        nome: 'Símbolo',         titulo: 'O desenho da marca.',              sub: 'Do traço mínimo ao emblema maximalista — e três variantes de cada.' },
  { id: 'tipografia',     nome: 'Tipografia',      titulo: 'A voz escrita.',                   sub: 'O par display + texto define o sotaque antes da primeira palavra ser lida.' },
  { id: 'composicao',     nome: 'Composição',      titulo: 'O repertório gráfico.',            sub: 'Grade, filete, grão, colagem, sobreposição. Escolha até quatro — mais que isso vira ruído.' },
  { id: 'fotografia',     nome: 'Fotografia',      titulo: 'Que imagem entra no site.',        sub: 'A direção de foto decide se o mundo parece real. Vai com termo de busca pronto.' },
  { id: 'persona',        nome: 'Persona',         titulo: 'Quem precisa se reconhecer.',      sub: 'Personagens pré-estabelecidos por vertical. É por esses olhos que a peça será julgada.' },
  { id: 'entrega',        nome: 'Entrega',         titulo: 'O argumento pronto.',              sub: 'O painel, a prévia e a justificativa de cada escolha — para apresentar sem improviso.' }
];

function podeAvancar() {
  switch (ETAPAS[estado.etapa].id) {
    case 'briefing':   return !!(estado.marca.trim() && estado.vertical);
    case 'cor':        return !!estado.paletaId;
    case 'simbolo':    return !!estado.simbolo;
    case 'tipografia': return !!estado.tipografiaId;
    case 'composicao': return estado.elementos.length > 0 && !!estado.grid;
    case 'fotografia': return !!estado.fotoId;
    case 'persona':    return !!estado.personaId;
    default:           return true;
  }
}

/* Enquanto a cor não foi escolhida, tudo é desenhado num neutro. */
const PALETA_NEUTRA = { id: 'neutra', nome: 'Neutra', familia: 'mono',
  cores: [{ r: 'A', papel: 'Base', hex: '#F2F0EC' }, { r: 'B', papel: 'Tinta', hex: '#14110F' },
          { r: 'C', papel: 'Destaque', hex: '#FF6A1F' }, { r: 'D', papel: 'Apoio', hex: '#9A948C' }],
  perfil: {}, combina: '' };
const paletaAtual = () => getPaleta(estado) || PALETA_NEUTRA;

/* ---------- pedaços de interface ---------- */
const selo10 = n => `<span class="score" style="--s:${n}">${n}<i>%</i></span>`;

function chipsMotivo(perfil) {
  return motivo(perfil, estado.vetor).map(m => `<em class="chip-motivo">${m}</em>`).join('');
}

function cartao({ acao, valor, ativo, score, titulo, nota, arte, perfil, extra = '' }) {
  return `<button class="cartao${ativo ? ' is-ativo' : ''}" data-acao="${acao}" data-valor="${valor}">
    ${arte ? `<span class="cartao-arte">${arte}</span>` : ''}
    <span class="cartao-corpo">
      <span class="cartao-topo"><b>${titulo}</b>${score !== undefined ? selo10(score) : ''}</span>
      ${perfil ? `<span class="motivos">${chipsMotivo(perfil)}</span>` : ''}
      ${nota ? `<i class="cartao-nota">${nota}</i>` : ''}
      ${extra}
    </span>
  </button>`;
}

/* ---------- conteúdo por etapa ---------- */
function etapaBriefing() {
  return `<div class="campo">
      <label for="in-marca">Nome do produto</label>
      <input id="in-marca" data-campo="marca" value="${estado.marca.replace(/"/g, '&quot;')}" maxlength="24" autocomplete="off">
    </div>
    <div class="campo">
      <label for="in-mundo">Uma frase do cliente sobre o mundo dele <i>(opcional)</i></label>
      <input id="in-mundo" data-campo="mundo" value="${(estado.mundo || '').replace(/"/g, '&quot;')}" maxlength="120"
             placeholder="Ex.: quero que pareça uma clínica onde ninguém tem pressa." autocomplete="off">
    </div>
    <h4 class="sub-titulo">Vertical de software</h4>
    <div class="grade grade--3">
      ${VERTICAIS.map(v => cartao({
        acao: 'vertical', valor: v.id, ativo: estado.vertical === v.id, titulo: v.nome,
        nota: 'Ponto de partida: ' + frase(adjetivosDoVetor(v.perfil, 2))
      })).join('')}
    </div>`;
}

function etapaCaracteristicas() {
  return `<div class="atalhos">
      <span>Atalhos:</span>
      ${ATALHOS.map(a => `<button class="pilula" data-acao="atalho" data-valor="${a.id}">${a.nome}</button>`).join('')}
    </div>
    <div class="eixos">
      ${EIXOS.map(e => `
        <div class="eixo">
          <div class="eixo-topo"><b>${e.esq}</b><i>${e.desc}</i><b>${e.dir}</b></div>
          <input type="range" min="0" max="100" step="1" value="${estado.vetor[e.id]}" data-eixo="${e.id}"
                 aria-label="${e.esq} a ${e.dir}">
        </div>`).join('')}
    </div>
    <p class="resumo-vetor">Leitura atual: <b>identidade ${frase(adjetivosDoVetor(estado.vetor))}</b>.</p>`;
}

function etapaCor() {
  const lista = ordenar(PALETAS.filter(p => estado.familiaCor === 'todas' || p.familia === estado.familiaCor), estado.vetor);
  return `<div class="filtros">
      <button class="pilula${estado.familiaCor === 'todas' ? ' is-ativo' : ''}" data-acao="familia" data-valor="todas">Todas</button>
      ${FAMILIAS_COR.map(f => `<button class="pilula${estado.familiaCor === f.id ? ' is-ativo' : ''}"
          data-acao="familia" data-valor="${f.id}" title="${f.desc}">${f.nome}</button>`).join('')}
    </div>
    ${estado.familiaCor !== 'todas' ? `<p class="dica">${(FAMILIAS_COR.find(f => f.id === estado.familiaCor) || {}).desc}</p>` : ''}
    <div class="grade grade--2">
      ${lista.map(p => cartao({
        acao: 'paleta', valor: p.id, ativo: estado.paletaId === p.id, score: p.score, titulo: p.nome,
        perfil: p.perfil, nota: p.combina,
        arte: `<span class="faixa-cores">${p.cores.map(c => `<i style="background:${c.hex}"><b>${c.r}</b></i>`).join('')}</span>`
      })).join('')}
    </div>`;
}

function etapaSimbolo() {
  const paleta = paletaAtual(), tipo = getTipografia(estado);
  const fonte = tipo ? tipo.display.familia : "'Archivo', sans-serif";
  const p = papeis(paleta);
  return `<div class="grade grade--2">
    ${ordenar(ESTILOS_SIMBOLO, estado.vetor).map(s => `
      <div class="cartao cartao--simb${estado.simbolo && estado.simbolo.estilo === s.id ? ' is-ativo' : ''}">
        <span class="cartao-corpo">
          <span class="cartao-topo"><b>${s.nome}</b>${selo10(s.score)}</span>
          <span class="motivos">${chipsMotivo(s.perfil)}</span>
          <i class="cartao-nota">${s.nota}</i>
        </span>
        <span class="variantes">
          ${[0, 1, 2].map(v => `
            <button class="variante${estado.simbolo && estado.simbolo.estilo === s.id && estado.simbolo.variante === v ? ' is-ativo' : ''}"
                    data-acao="simbolo" data-valor="${s.id}:${v}" style="background:${p.base}"
                    aria-label="${s.nome}, variante ${v + 1}">
              ${gerarSimbolo(s.id, v, paleta, estado.marca, fonte)}
            </button>`).join('')}
        </span>
      </div>`).join('')}
  </div>`;
}

function etapaTipografia() {
  const paleta = paletaAtual(), p = papeis(paleta);
  return `<div class="grade grade--2">
    ${ordenar(TIPOGRAFIAS, estado.vetor).map(t => cartao({
      acao: 'tipografia', valor: t.id, ativo: estado.tipografiaId === t.id, score: t.score,
      titulo: t.nome, perfil: t.perfil, nota: t.nota,
      arte: `<span class="espec-cartao" style="background:${p.base};color:${p.tinta}">
          <b style="font-family:${t.display.familia};font-weight:${t.display.peso};
             text-transform:${t.display.caixa};letter-spacing:${t.display.tracking}">${estado.marca}</b>
          <i style="font-family:${t.texto.familia}">Texto corrido, 16 px, para ler sem esforço.</i>
        </span>`
    })).join('')}
  </div>`;
}

function etapaComposicao() {
  const paleta = paletaAtual(), p = papeis(paleta);
  const cheio = estado.elementos.length >= 4;
  return `<h4 class="sub-titulo">Elementos <i>(${estado.elementos.length}/4)</i></h4>
    <div class="grade grade--4">
      ${ordenar(ELEMENTOS, estado.vetor).map(el => {
        const ativo = temElemento(estado, el.id);
        const mini = el.id === 'grao'
          ? `<span class="mini-el mini-el--grao" style="background:${p.destaque}">${camadaGrao(0.5)}</span>`
          : miniElemento(el.id, p);
        return `<button class="cartao cartao--mini${ativo ? ' is-ativo' : ''}${!ativo && cheio ? ' is-travado' : ''}"
            data-acao="elemento" data-valor="${el.id}" ${!ativo && cheio ? 'disabled' : ''}>
          <span class="cartao-arte">${mini}</span>
          <span class="cartao-corpo">
            <span class="cartao-topo"><b>${el.nome}</b>${selo10(el.score)}</span>
            <i class="cartao-nota">${el.nota}</i>
          </span></button>`;
      }).join('')}
    </div>
    <h4 class="sub-titulo">Grade</h4>
    <div class="grade grade--3">
      ${GRIDS.map(g => cartao({
        acao: 'grid', valor: g.id, ativo: estado.grid === g.id, titulo: g.nome, nota: g.nota,
        arte: miniGrid(g.id, p)
      })).join('')}
    </div>`;
}

function etapaFotografia() {
  const paleta = paletaAtual(), p = papeis(paleta);
  return `<div class="grade grade--3">
    ${ordenar(FOTOGRAFIAS, estado.vetor).map(f => cartao({
      acao: 'foto', valor: f.id, ativo: estado.fotoId === f.id, score: f.score, titulo: f.nome,
      perfil: f.perfil, nota: f.nota, arte: miniFoto(f, p),
      extra: `<code class="busca">${f.busca}</code>`
    })).join('')}
  </div>`;
}

function etapaPersona() {
  const daVertical = PERSONAS.filter(p => p.vertical === estado.vertical);
  const outras = PERSONAS.filter(p => p.vertical !== estado.vertical);
  const cartaoP = p => `<button class="cartao cartao--persona${estado.personaId === p.id ? ' is-ativo' : ''}"
      data-acao="persona" data-valor="${p.id}">
      <span class="cartao-corpo">
        <span class="cartao-topo"><b>${p.nome}</b></span>
        <i class="persona-papel">${p.papel}</i>
        <i class="cartao-nota">${p.contexto}</i>
        <i class="cartao-nota cartao-nota--mundo">“${p.mundo}”</i>
      </span></button>`;
  return `<div class="grade grade--2">${daVertical.map(cartaoP).join('')}</div>
    <details class="mais"><summary>Ver personagens de outras verticais (${outras.length})</summary>
      <div class="grade grade--2">${outras.map(cartaoP).join('')}</div></details>`;
}

/* Justificativa: o texto que o designer leva para a reunião. */
function justificativa() {
  const paleta = getPaleta(estado), tipo = getTipografia(estado), foto = getFoto(estado),
        persona = getPersona(estado), vert = getVertical(estado);
  const est = ESTILOS_SIMBOLO.find(s => estado.simbolo && s.id === estado.simbolo.estilo);
  const adj = frase(adjetivosDoVetor(estado.vetor));
  const linhas = [
    `${estado.marca} — ${vert ? vert.nome : 'software'}. A identidade foi construída para ser ${adj}${estado.mundo ? ', a partir de uma frase do próprio cliente: “' + estado.mundo + '”' : ''}.`,
    paleta ? `Cor: ${paleta.nome}. ${paleta.combina} Contraste entre base e tinta de ${notaContraste(papeis(paleta).base, papeis(paleta).tinta).razao.toFixed(1)}:1 — ${notaContraste(papeis(paleta).base, papeis(paleta).tinta).nota}. Sem degradê: cada cor tem um papel fixo (A base, B tinta, C destaque, D apoio).` : '',
    est ? `Símbolo: ${est.nome.toLowerCase()}. ${est.nota} Funciona em positivo, negativo e reduzido a 24 px.` : '',
    tipo ? `Tipografia: ${tipo.nome} — ${tipo.display.familia.split(',')[0].replace(/'/g, '')} no display, ${tipo.texto.familia.split(',')[0].replace(/'/g, '')} no texto. ${tipo.nota}` : '',
    estado.elementos.length ? `Composição: ${estado.elementos.map(id => (ELEMENTOS.find(e => e.id === id) || {}).nome.toLowerCase()).join(', ')}, sobre ${(GRIDS.find(g => g.id === estado.grid) || {}).nome.toLowerCase()}.` : '',
    foto ? `Fotografia: ${foto.nome.toLowerCase()}. ${foto.nota} Termo de busca: “${foto.busca}”.` : '',
    persona ? `Quem julga: ${persona.nome}, ${persona.papel.toLowerCase()}. ${persona.contexto} O que quer: ${persona.quer.toLowerCase()} O que teme: ${persona.teme.toLowerCase()} Por isso o tom de voz é ${persona.tom.toLowerCase().replace(/\.$/, '')}, e a primeira tela precisa parecer isto: “${persona.mundo.toLowerCase().replace(/\.$/, '')}”.` : ''
  ].filter(Boolean);
  return linhas;
}

function etapaEntrega() {
  const linhas = justificativa();
  const falta = ETAPAS.slice(0, 8).map((e, i) => ({ e, i })).filter(({ i }) => {
    const salvo = estado.etapa; estado.etapa = i; const ok = podeAvancar(); estado.etapa = salvo; return !ok;
  });
  return `${falta.length ? `<p class="dica dica--alerta">Ainda falta decidir: ${falta.map(f => `<a href="#" data-acao="ir" data-valor="${f.i}">${f.e.nome}</a>`).join(', ')}.</p>` : ''}
    <h4 class="sub-titulo">Argumento para a reunião</h4>
    <div class="argumento">${linhas.map(l => `<p>${l}</p>`).join('')}</div>
    <div class="acoes-entrega">
      <button class="pilula pilula--forte" data-acao="copiar-argumento">Copiar argumento</button>
      <button class="pilula" data-acao="copiar-cores">Copiar hex da paleta</button>
      <button class="pilula" data-acao="baixar-json">Baixar JSON</button>
      <button class="pilula" data-acao="copiar-link">Copiar link da identidade</button>
      <button class="pilula" data-acao="imprimir">Imprimir painel / PDF</button>
      <button class="pilula pilula--fantasma" data-acao="reiniciar">Recomeçar do zero</button>
    </div>
    <p class="dica">O link carrega a identidade inteira na barra de endereço — mande para o cliente e ele abre exatamente o que você viu.</p>`;
}

const CONTEUDO = { briefing: etapaBriefing, caracteristicas: etapaCaracteristicas, cor: etapaCor,
  simbolo: etapaSimbolo, tipografia: etapaTipografia, composicao: etapaComposicao,
  fotografia: etapaFotografia, persona: etapaPersona, entrega: etapaEntrega };

/* ---------- render ---------- */
function render() {
  const etapa = ETAPAS[estado.etapa];
  document.getElementById('trilha').innerHTML = ETAPAS.map((e, i) => `
    <button class="passo${i === estado.etapa ? ' is-ativo' : ''}${i < estado.etapa ? ' is-feito' : ''}"
            data-acao="ir" data-valor="${i}"><b>${String(i + 1).padStart(2, '0')}</b><span>${e.nome}</span></button>`).join('');

  document.getElementById('etapa-titulo').textContent = etapa.titulo;
  document.getElementById('etapa-sub').textContent = etapa.sub;
  document.getElementById('conteudo').innerHTML = CONTEUDO[etapa.id]();

  const btn = document.getElementById('btn-avancar');
  btn.disabled = !podeAvancar();
  btn.textContent = estado.etapa === ETAPAS.length - 1 ? 'Concluído' : 'Continuar →';
  document.getElementById('btn-voltar').disabled = estado.etapa === 0;

  document.querySelectorAll('[data-aba]').forEach(b => b.classList.toggle('is-ativo', b.dataset.aba === estado.aba));
  document.getElementById('painel').innerHTML = estado.aba === 'painel' ? renderPainel(estado) : renderPrevia(estado);
  document.getElementById('painel').className = 'painel painel--' + estado.aba;
  salvar();
}

/* ---------- ações ---------- */
function aplicarAtalho(id) {
  const a = ATALHOS.find(x => x.id === id);
  if (a) estado.vetor = { ...estado.vetor, ...a.perfil };
}

function alternarElemento(id) {
  const i = estado.elementos.indexOf(id);
  if (i >= 0) estado.elementos.splice(i, 1);
  else if (estado.elementos.length < 4) estado.elementos.push(id);
}

function copiar(texto, msg) {
  navigator.clipboard.writeText(texto).then(() => aviso(msg)).catch(() => aviso('Não consegui copiar — o navegador bloqueou.'));
}

let avisoTimer;
function aviso(texto) {
  const el = document.getElementById('aviso');
  el.textContent = texto;
  el.classList.add('is-visivel');
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => el.classList.remove('is-visivel'), 2600);
}

function baixarJson() {
  const { etapa, aba, familiaCor, ...limpo } = estado;
  const paleta = getPaleta(estado), tipo = getTipografia(estado);
  const dados = { ...limpo,
    paleta: paleta ? { nome: paleta.nome, cores: paleta.cores } : null,
    tipografia: tipo ? { nome: tipo.nome, display: tipo.display, texto: tipo.texto } : null,
    argumento: justificativa(), gerado: new Date().toISOString() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url; a.download = `identidade-${estado.marca.toLowerCase().replace(/\s+/g, '-')}.json`;
  a.click(); URL.revokeObjectURL(url);
  aviso('JSON baixado.');
}

const ACOES = {
  ir: v => { estado.etapa = Math.max(0, Math.min(ETAPAS.length - 1, +v)); },
  vertical: v => {
    estado.vertical = v;
    const vert = VERTICAIS.find(x => x.id === v);
    if (vert) estado.vetor = { ...estado.vetor, ...vert.perfil };
    if (estado.personaId && !PERSONAS.some(p => p.id === estado.personaId && p.vertical === v)) estado.personaId = null;
  },
  atalho: v => aplicarAtalho(v),
  familia: v => { estado.familiaCor = v; },
  paleta: v => { estado.paletaId = v; },
  simbolo: v => { const [estilo, variante] = v.split(':'); estado.simbolo = { estilo, variante: +variante }; },
  tipografia: v => { estado.tipografiaId = v; },
  elemento: v => alternarElemento(v),
  grid: v => { estado.grid = v; },
  foto: v => { estado.fotoId = v; },
  persona: v => { estado.personaId = v; },
  'ver-painel': () => document.querySelector('.lado').scrollIntoView({ behavior: 'smooth', block: 'start' }),
  avancar: () => { if (podeAvancar() && estado.etapa < ETAPAS.length - 1) estado.etapa++; },
  voltar: () => { if (estado.etapa > 0) estado.etapa--; },
  'copiar-cores': () => {
    const p = getPaleta(estado);
    if (!p) return aviso('Escolha uma paleta antes.');
    copiar(p.cores.map(c => `${c.r} ${c.papel}: ${c.hex.toUpperCase()}`).join('\n'), 'Paleta copiada.');
  },
  'copiar-argumento': () => copiar(justificativa().join('\n\n'), 'Argumento copiado.'),
  'copiar-link': () => { const l = paraLink(); history.replaceState(null, '', '#id=' + l.split('#id=')[1]); copiar(l, 'Link copiado.'); },
  'baixar-json': () => baixarJson(),
  imprimir: () => { estado.aba = 'painel'; render(); setTimeout(() => window.print(), 120); },
  reiniciar: () => {
    if (!confirm('Isso apaga todas as escolhas desta identidade. Continuar?')) return;
    estado = estadoInicial(); history.replaceState(null, '', location.pathname);
  }
};

function ligar() {
  document.body.addEventListener('click', ev => {
    const alvo = ev.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = ACOES[alvo.dataset.acao];
    if (!acao) return;
    ev.preventDefault();
    acao(alvo.dataset.valor);
    render();
  });

  document.body.addEventListener('input', ev => {
    const alvo = ev.target;
    if (alvo.dataset.eixo) {
      estado.vetor[alvo.dataset.eixo] = +alvo.value;
      document.getElementById('painel').innerHTML = estado.aba === 'painel' ? renderPainel(estado) : renderPrevia(estado);
      const resumo = document.querySelector('.resumo-vetor b');
      if (resumo) resumo.textContent = 'identidade ' + frase(adjetivosDoVetor(estado.vetor));
      salvar();
    }
    if (alvo.dataset.campo) {
      estado[alvo.dataset.campo] = alvo.value;
      document.getElementById('painel').innerHTML = estado.aba === 'painel' ? renderPainel(estado) : renderPrevia(estado);
      salvar();
    }
  });

  document.querySelectorAll('[data-aba]').forEach(b => b.addEventListener('click', () => {
    estado.aba = b.dataset.aba; render();
  }));

  document.addEventListener('keydown', ev => {
    if (ev.target.tagName === 'INPUT' || ev.metaKey || ev.ctrlKey) return;
    if (ev.key === 'ArrowRight' && podeAvancar()) { ACOES.avancar(); render(); }
    if (ev.key === 'ArrowLeft') { ACOES.voltar(); render(); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  estado = carregar();
  ligar();
  render();
});
