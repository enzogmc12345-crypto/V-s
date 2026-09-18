/* ============================================================
   DADOS — vocabulário do estúdio
   Todo item carrega um "perfil" nos mesmos 7 eixos de
   característica. É isso que permite ranquear qualquer coisa
   (cor, tipo, ícone, foto) a partir do que o cliente sente.
   ============================================================ */

const EIXOS = [
  { id: 'elegancia', esq: 'Despojado',   dir: 'Elegante',    desc: 'O quanto a marca se comporta em público.' },
  { id: 'densidade', esq: 'Minimalista', dir: 'Maximalista', desc: 'Quantidade de informação por centímetro.' },
  { id: 'humor',     esq: 'Sério',       dir: 'Alegre',      desc: 'A temperatura emocional da conversa.' },
  { id: 'tempo',     esq: 'Antigo',      dir: 'Moderno',     desc: 'Em que época a marca parece ter nascido.' },
  { id: 'origem',    esq: 'Artesanal',   dir: 'Artificial',  desc: 'Feito por mão humana ou por máquina.' },
  { id: 'energia',   esq: 'Calmo',       dir: 'Intenso',     desc: 'O volume com que a marca fala.' },
  { id: 'luz',       esq: 'Sombrio',     dir: 'Luminoso',    desc: 'De que lado da luz a marca vive.' }
];

/* Atalhos de humor — o designer começa de um lugar, não do zero. */
const ATALHOS = [
  { id: 'clinica-serena',  nome: 'Clínica serena',    perfil: { elegancia: 72, densidade: 18, humor: 55, tempo: 80, origem: 60, energia: 22, luz: 90 } },
  { id: 'fintech-sobria',  nome: 'Fintech sóbria',    perfil: { elegancia: 82, densidade: 25, humor: 28, tempo: 78, origem: 75, energia: 38, luz: 40 } },
  { id: 'estudio-manual',  nome: 'Estúdio artesanal', perfil: { elegancia: 58, densidade: 55, humor: 62, tempo: 32, origem: 10, energia: 48, luz: 68 } },
  { id: 'gotico-severo',   nome: 'Gótico severo',     perfil: { elegancia: 84, densidade: 48, humor: 10, tempo: 20, origem: 30, energia: 55, luz: 12 } },
  { id: 'pop-alegre',      nome: 'Pop alegre',        perfil: { elegancia: 38, densidade: 72, humor: 92, tempo: 82, origem: 58, energia: 88, luz: 78 } },
  { id: 'maquina-ia',      nome: 'Máquina / IA',      perfil: { elegancia: 60, densidade: 40, humor: 22, tempo: 96, origem: 97, energia: 62, luz: 25 } }
];

/* Verticais de software — cada uma sugere um ponto de partida. */
const VERTICAIS = [
  { id: 'saas-b2b',   nome: 'SaaS B2B / produtividade', perfil: { elegancia: 68, densidade: 25, humor: 45, tempo: 85, origem: 78, energia: 42, luz: 72 } },
  { id: 'fintech',    nome: 'Fintech / pagamentos',     perfil: { elegancia: 84, densidade: 28, humor: 30, tempo: 80, origem: 76, energia: 40, luz: 45 } },
  { id: 'healthtech', nome: 'Healthtech / odontologia', perfil: { elegancia: 70, densidade: 20, humor: 58, tempo: 78, origem: 58, energia: 26, luz: 88 } },
  { id: 'beleza',     nome: 'Beleza & estética',        perfil: { elegancia: 86, densidade: 35, humor: 62, tempo: 62, origem: 38, energia: 40, luz: 80 } },
  { id: 'edtech',     nome: 'Educação / edtech',        perfil: { elegancia: 52, densidade: 55, humor: 82, tempo: 76, origem: 55, energia: 65, luz: 82 } },
  { id: 'commerce',   nome: 'E-commerce / moda',        perfil: { elegancia: 80, densidade: 45, humor: 58, tempo: 70, origem: 42, energia: 58, luz: 68 } },
  { id: 'devtools',   nome: 'IA & ferramentas de dev',  perfil: { elegancia: 58, densidade: 35, humor: 28, tempo: 95, origem: 94, energia: 60, luz: 22 } }
];

/* ---------- PALETAS ----------
   Quatro papéis fixos: A base, B tinta, C destaque, D apoio.
   Nada de degradê: cor chapada, papel definido, contraste medido. */
const FAMILIAS_COR = [
  { id: 'pastel',  nome: 'Tons pastéis',   desc: 'Saturação baixa, valor alto. Acolhe antes de convencer.' },
  { id: 'choque',  nome: 'Tons de choque',  desc: 'Um neon sobre escuro. Serve para uma coisa só de cada vez.' },
  { id: 'terroso', nome: 'Tons terrosos',   desc: 'Pigmento, barro, oliva. Cheira a feito à mão.' },
  { id: 'sobrio',  nome: 'Tons sóbrios',    desc: 'Institucional sem ser frio. Confiança antes de simpatia.' },
  { id: 'mono',    nome: 'Monocromático',   desc: 'Uma cor, vários valores. O luxo de não precisar de outra.' },
  { id: 'bloco',   nome: 'Blocos de cor',   desc: 'Duas cores fortes brigando de igual para igual.' }
];

const PALETAS = [
  { id: 'algodao', nome: 'Algodão', familia: 'pastel',
    cores: [{ r: 'A', papel: 'Base',     hex: '#F4EDE4' }, { r: 'B', papel: 'Tinta', hex: '#211D1A' },
            { r: 'C', papel: 'Destaque', hex: '#E3A79F' }, { r: 'D', papel: 'Apoio', hex: '#A7B8A4' }],
    perfil: { elegancia: 74, densidade: 25, humor: 60, tempo: 55, origem: 32, energia: 20, luz: 86 },
    combina: 'Serifa de contraste alto e muito espaço em branco. Não force com neon.' },
  { id: 'menta-clinica', nome: 'Menta Clínica', familia: 'pastel',
    cores: [{ r: 'A', papel: 'Base',     hex: '#EFF6F3' }, { r: 'B', papel: 'Tinta', hex: '#14302A' },
            { r: 'C', papel: 'Destaque', hex: '#7ECFB6' }, { r: 'D', papel: 'Apoio', hex: '#BFDCEC' }],
    perfil: { elegancia: 60, densidade: 18, humor: 58, tempo: 78, origem: 58, energia: 24, luz: 92 },
    combina: 'Grotesca geométrica, ícones de traço fino, fotografia com muita luz.' },
  { id: 'lilas-sereno', nome: 'Lilás Sereno', familia: 'pastel',
    cores: [{ r: 'A', papel: 'Base',     hex: '#F4F0FA' }, { r: 'B', papel: 'Tinta', hex: '#241E33' },
            { r: 'C', papel: 'Destaque', hex: '#B9A4E6' }, { r: 'D', papel: 'Apoio', hex: '#F2C9D6' }],
    perfil: { elegancia: 66, densidade: 32, humor: 76, tempo: 72, origem: 42, energia: 32, luz: 88 },
    combina: 'Tipos arredondados e formas orgânicas. Evite serifa severa.' },

  { id: 'acido', nome: 'Ácido', familia: 'choque',
    cores: [{ r: 'A', papel: 'Base',     hex: '#0B0C0A' }, { r: 'B', papel: 'Tinta', hex: '#F2F4EF' },
            { r: 'C', papel: 'Destaque', hex: '#C8FF2E' }, { r: 'D', papel: 'Apoio', hex: '#3C4A1D' }],
    perfil: { elegancia: 36, densidade: 62, humor: 68, tempo: 94, origem: 86, energia: 95, luz: 18 },
    combina: 'Condensada pesada, malha visível, render abstrato. O verde só no que clica.' },
  { id: 'laranja-sinal', nome: 'Laranja Sinal', familia: 'choque',
    cores: [{ r: 'A', papel: 'Base',     hex: '#111010' }, { r: 'B', papel: 'Tinta', hex: '#F7F3EE' },
            { r: 'C', papel: 'Destaque', hex: '#FF5A1F' }, { r: 'D', papel: 'Apoio', hex: '#FFC53D' }],
    perfil: { elegancia: 42, densidade: 64, humor: 80, tempo: 86, origem: 70, energia: 94, luz: 24 },
    combina: 'Tipografia de impacto e blocos de cor. Funciona com foto analógica granulada.' },
  { id: 'magenta-eletrico', nome: 'Magenta Elétrico', familia: 'choque',
    cores: [{ r: 'A', papel: 'Base',     hex: '#0A0A0F' }, { r: 'B', papel: 'Tinta', hex: '#FFFFFF' },
            { r: 'C', papel: 'Destaque', hex: '#FF2E88' }, { r: 'D', papel: 'Apoio', hex: '#21E5FF' }],
    perfil: { elegancia: 46, densidade: 72, humor: 78, tempo: 94, origem: 92, energia: 98, luz: 16 },
    combina: 'Ícone mecânico, halftone, tipo mono. Duas cores fortes pedem fundo preto.' },

  { id: 'argila', nome: 'Argila', familia: 'terroso',
    cores: [{ r: 'A', papel: 'Base',     hex: '#EDE3D6' }, { r: 'B', papel: 'Tinta', hex: '#2B211A' },
            { r: 'C', papel: 'Destaque', hex: '#C0693B' }, { r: 'D', papel: 'Apoio', hex: '#7E8C5B' }],
    perfil: { elegancia: 62, densidade: 44, humor: 56, tempo: 30, origem: 12, energia: 45, luz: 74 },
    combina: 'Serifa antiga, carimbo, colagem e papel. Fotografia com grão.' },
  { id: 'barro-queimado', nome: 'Barro Queimado', familia: 'terroso',
    cores: [{ r: 'A', papel: 'Base',     hex: '#E7DACA' }, { r: 'B', papel: 'Tinta', hex: '#3A2A22' },
            { r: 'C', papel: 'Destaque', hex: '#9C4A28' }, { r: 'D', papel: 'Apoio', hex: '#6E7A5C' }],
    perfil: { elegancia: 64, densidade: 50, humor: 44, tempo: 22, origem: 10, energia: 50, luz: 66 },
    combina: 'Caixa alta com serifa romana, recorte de revista, textura de papel.' },
  { id: 'oliva-seca', nome: 'Oliva Seca', familia: 'terroso',
    cores: [{ r: 'A', papel: 'Base',     hex: '#E9E7DC' }, { r: 'B', papel: 'Tinta', hex: '#23271C' },
            { r: 'C', papel: 'Destaque', hex: '#6B7A3F' }, { r: 'D', papel: 'Apoio', hex: '#C9A227' }],
    perfil: { elegancia: 68, densidade: 38, humor: 46, tempo: 28, origem: 20, energia: 38, luz: 72 },
    combina: 'Filetes finos, muito respiro, still de estúdio com luz natural.' },

  { id: 'grafite', nome: 'Grafite', familia: 'sobrio',
    cores: [{ r: 'A', papel: 'Base',     hex: '#F4F5F6' }, { r: 'B', papel: 'Tinta', hex: '#111418' },
            { r: 'C', papel: 'Destaque', hex: '#2B5CE6' }, { r: 'D', papel: 'Apoio', hex: '#8A93A0' }],
    perfil: { elegancia: 72, densidade: 20, humor: 32, tempo: 84, origem: 82, energia: 34, luz: 78 },
    combina: 'Grotesca neutra, grade de 12 colunas, ícone de traço. O padrão do software sério.' },
  { id: 'marinho-profundo', nome: 'Marinho Profundo', familia: 'sobrio',
    cores: [{ r: 'A', papel: 'Base',     hex: '#0E1B2A' }, { r: 'B', papel: 'Tinta', hex: '#F7F6F2' },
            { r: 'C', papel: 'Destaque', hex: '#C9A227' }, { r: 'D', papel: 'Apoio', hex: '#5C7A99' }],
    perfil: { elegancia: 90, densidade: 34, humor: 24, tempo: 56, origem: 52, energia: 40, luz: 26 },
    combina: 'Serifa editorial, dourado só em detalhe. Fintech e private banking.' },
  { id: 'pedra', nome: 'Pedra', familia: 'sobrio',
    cores: [{ r: 'A', papel: 'Base',     hex: '#E8E8E6' }, { r: 'B', papel: 'Tinta', hex: '#1C1C1A' },
            { r: 'C', papel: 'Destaque', hex: '#4A5A4F' }, { r: 'D', papel: 'Apoio', hex: '#B4B0A5' }],
    perfil: { elegancia: 74, densidade: 16, humor: 30, tempo: 60, origem: 42, energia: 24, luz: 76 },
    combina: 'Arquitetura, sombra dura e tipografia de um peso só.' },

  { id: 'osso-preto', nome: 'Osso & Preto', familia: 'mono',
    cores: [{ r: 'A', papel: 'Base',     hex: '#EFEDE8' }, { r: 'B', papel: 'Tinta', hex: '#000000' },
            { r: 'C', papel: 'Destaque', hex: '#6E6E6E' }, { r: 'D', papel: 'Apoio', hex: '#C9C6BE' }],
    perfil: { elegancia: 88, densidade: 10, humor: 30, tempo: 70, origem: 56, energia: 30, luz: 74 },
    combina: 'Quando a marca aguenta ficar sem cor. Tudo recai sobre o tipo e o espaço.' },
  { id: 'noite-unica', nome: 'Noite Única', familia: 'mono',
    cores: [{ r: 'A', papel: 'Base',     hex: '#0C0C0D' }, { r: 'B', papel: 'Tinta', hex: '#EDEDED' },
            { r: 'C', papel: 'Destaque', hex: '#3A3A3D' }, { r: 'D', papel: 'Apoio', hex: '#757579' }],
    perfil: { elegancia: 82, densidade: 16, humor: 12, tempo: 72, origem: 66, energia: 36, luz: 8 },
    combina: 'Gótico contemporâneo. Caixa alta espaçada, foto em alto contraste.' },
  { id: 'azul-unico', nome: 'Azul Único', familia: 'mono',
    cores: [{ r: 'A', papel: 'Base',     hex: '#E7EEF6' }, { r: 'B', papel: 'Tinta', hex: '#0B2440' },
            { r: 'C', papel: 'Destaque', hex: '#2E6DB4' }, { r: 'D', papel: 'Apoio', hex: '#96B6D6' }],
    perfil: { elegancia: 72, densidade: 22, humor: 42, tempo: 68, origem: 66, energia: 34, luz: 76 },
    combina: 'Interface de produto: o azul carrega hierarquia sem gritar.' },

  { id: 'cobalto-milho', nome: 'Cobalto & Milho', familia: 'bloco',
    cores: [{ r: 'A', papel: 'Base',     hex: '#FAF7F0' }, { r: 'B', papel: 'Tinta', hex: '#121212' },
            { r: 'C', papel: 'Destaque', hex: '#1B44C8' }, { r: 'D', papel: 'Apoio', hex: '#F2C230' }],
    perfil: { elegancia: 46, densidade: 66, humor: 86, tempo: 76, origem: 60, energia: 80, luz: 72 },
    combina: 'Blocos inteiros de cor, título dentro do bloco, ícone sólido.' },
  { id: 'rubi-jade', nome: 'Rubi & Jade', familia: 'bloco',
    cores: [{ r: 'A', papel: 'Base',     hex: '#FBF6F2' }, { r: 'B', papel: 'Tinta', hex: '#1A1414' },
            { r: 'C', papel: 'Destaque', hex: '#C2185B' }, { r: 'D', papel: 'Apoio', hex: '#0E8A6A' }],
    perfil: { elegancia: 58, densidade: 70, humor: 68, tempo: 54, origem: 36, energia: 74, luz: 68 },
    combina: 'Colagem, moldura e foto recortada. Duas cores que não se misturam nunca.' },
  { id: 'tangerina-tinta', nome: 'Tangerina & Tinta', familia: 'bloco',
    cores: [{ r: 'A', papel: 'Base',     hex: '#FFF4E8' }, { r: 'B', papel: 'Tinta', hex: '#14110E' },
            { r: 'C', papel: 'Destaque', hex: '#F2601A' }, { r: 'D', papel: 'Apoio', hex: '#2E2A5B' }],
    perfil: { elegancia: 52, densidade: 58, humor: 84, tempo: 78, origem: 54, energia: 84, luz: 74 },
    combina: 'Laranja no que chama para a ação, azul-tinta segurando o texto longo.' }
];

/* ---------- TIPOGRAFIA ----------
   Pares display + texto. A escala vem junto: o designer não
   escolhe só a fonte, escolhe o comportamento dela. */
const TIPOGRAFIAS = [
  { id: 'editorial-serifa', nome: 'Editorial Serifa',
    display: { familia: "'Fraunces', serif", peso: 700, caixa: 'none', tracking: '-0.02em' },
    texto:   { familia: "'DM Sans', sans-serif", peso: 400 },
    perfil: { elegancia: 88, densidade: 44, humor: 52, tempo: 44, origem: 30, energia: 44, luz: 62 },
    nota: 'Contraste alto e eixo inclinado: parece revista, não parece dashboard.' },
  { id: 'alta-costura', nome: 'Alta Costura',
    display: { familia: "'Playfair Display', serif", peso: 700, caixa: 'none', tracking: '-0.01em' },
    texto:   { familia: "'Epilogue', sans-serif", peso: 400 },
    perfil: { elegancia: 96, densidade: 40, humor: 34, tempo: 34, origem: 34, energia: 38, luz: 60 },
    nota: 'Serifa de moda. Pede fotografia boa — ela não salva imagem ruim.' },
  { id: 'grotesca-neutra', nome: 'Grotesca Neutra',
    display: { familia: "'Archivo', sans-serif", peso: 700, caixa: 'none', tracking: '-0.025em' },
    texto:   { familia: "'Manrope', sans-serif", peso: 400 },
    perfil: { elegancia: 56, densidade: 14, humor: 40, tempo: 86, origem: 82, energia: 40, luz: 66 },
    nota: 'A voz sem sotaque. Some na frente do conteúdo — e às vezes é o objetivo.' },
  { id: 'geometrica-clara', nome: 'Geométrica Clara',
    display: { familia: "'Outfit', sans-serif", peso: 600, caixa: 'none', tracking: '-0.02em' },
    texto:   { familia: "'Outfit', sans-serif", peso: 400 },
    perfil: { elegancia: 60, densidade: 20, humor: 62, tempo: 90, origem: 72, energia: 44, luz: 80 },
    nota: 'Círculo perfeito na base das letras: limpeza clínica, simpatia moderna.' },
  { id: 'tecnica-mono', nome: 'Técnica Mono',
    display: { familia: "'JetBrains Mono', monospace", peso: 700, caixa: 'uppercase', tracking: '-0.01em' },
    texto:   { familia: "'Archivo', sans-serif", peso: 400 },
    perfil: { elegancia: 42, densidade: 36, humor: 28, tempo: 92, origem: 96, energia: 56, luz: 40 },
    nota: 'Largura fixa = promessa de precisão. Ferramenta de dev entende na hora.' },
  { id: 'impacto-condensado', nome: 'Impacto Condensado',
    display: { familia: "'Anton', sans-serif", peso: 400, caixa: 'uppercase', tracking: '0em' },
    texto:   { familia: "'Manrope', sans-serif", peso: 400 },
    perfil: { elegancia: 34, densidade: 76, humor: 66, tempo: 80, origem: 64, energia: 92, luz: 54 },
    nota: 'Título que ocupa a largura toda. Bom para sobrepor foto.' },
  { id: 'expressiva-contemporanea', nome: 'Expressiva Contemporânea',
    display: { familia: "'Syne', sans-serif", peso: 800, caixa: 'none', tracking: '-0.02em' },
    texto:   { familia: "'Manrope', sans-serif", peso: 400 },
    perfil: { elegancia: 62, densidade: 66, humor: 72, tempo: 94, origem: 58, energia: 76, luz: 62 },
    nota: 'Desenho estranho na medida certa: lembra estúdio, não lembra template.' },
  { id: 'romana-severa', nome: 'Romana Severa',
    display: { familia: "'Cinzel', serif", peso: 600, caixa: 'uppercase', tracking: '0.08em' },
    texto:   { familia: "'Cormorant Garamond', serif", peso: 400 },
    perfil: { elegancia: 86, densidade: 46, humor: 10, tempo: 12, origem: 22, energia: 52, luz: 20 },
    nota: 'Capitular romana entalhada. É o gótico sério, o antigo, o solene.' },
  { id: 'manuscrita-artesanal', nome: 'Manuscrita Artesanal',
    display: { familia: "'Caveat', cursive", peso: 700, caixa: 'none', tracking: '0em' },
    texto:   { familia: "'Manrope', sans-serif", peso: 400 },
    perfil: { elegancia: 44, densidade: 52, humor: 86, tempo: 40, origem: 6, energia: 60, luz: 76 },
    nota: 'A mão aparece. Use em uma frase só — nunca em parágrafo.' }
];

/* ---------- ÍCONES / SÍMBOLOS ---------- */
const ESTILOS_SIMBOLO = [
  { id: 'minimal-linear', nome: 'Minimalista linear',
    perfil: { elegancia: 72, densidade: 8, humor: 40, tempo: 86, origem: 76, energia: 30, luz: 70 },
    nota: 'Um traço, uma ideia. Sobrevive a 16 pixels.' },
  { id: 'geometrico-solido', nome: 'Geométrico sólido',
    perfil: { elegancia: 62, densidade: 32, humor: 64, tempo: 86, origem: 72, energia: 48, luz: 72 },
    nota: 'Massa arredondada, canto contínuo. O ícone de app padrão — bem feito.' },
  { id: 'organico', nome: 'Orgânico',
    perfil: { elegancia: 58, densidade: 36, humor: 76, tempo: 68, origem: 24, energia: 42, luz: 80 },
    nota: 'Curva que não fecha em compasso. Humaniza produto técnico.' },
  { id: 'maximalista', nome: 'Maximalista detalhado',
    perfil: { elegancia: 64, densidade: 96, humor: 52, tempo: 36, origem: 28, energia: 70, luz: 50 },
    nota: 'Camadas, raios, moldura. Emblema — não ícone de barra de tarefa.' },
  { id: 'dimensional', nome: 'Dimensional (3D chapado)',
    perfil: { elegancia: 56, densidade: 62, humor: 58, tempo: 92, origem: 88, energia: 72, luz: 46 },
    nota: 'Extrusão isométrica com faces chapadas. Volume sem degradê.' },
  { id: 'artesanal', nome: 'Artesanal / carimbo',
    perfil: { elegancia: 50, densidade: 56, humor: 62, tempo: 26, origem: 4, energia: 50, luz: 66 },
    nota: 'Traço irregular e falha de tinta. Só funciona se o resto também for manual.' },
  { id: 'mecanico', nome: 'Mecânico / modular',
    perfil: { elegancia: 60, densidade: 46, humor: 20, tempo: 92, origem: 98, energia: 62, luz: 34 },
    nota: 'Malha, módulo, repetição. A marca parece ter sido computada.' }
];

/* ---------- ELEMENTOS DE COMPOSIÇÃO ---------- */
const ELEMENTOS = [
  { id: 'grade',        nome: 'Grade visível',        perfil: { densidade: 45, origem: 88, tempo: 88, elegancia: 58, humor: 30, energia: 40, luz: 55 }, nota: 'A estrutura aparece de propósito. Dá ar de engenharia.' },
  { id: 'filetes',      nome: 'Filetes e linhas',     perfil: { densidade: 30, origem: 60, tempo: 60, elegancia: 78, humor: 35, energia: 30, luz: 60 }, nota: 'Régua fina separando blocos. Editorial clássico.' },
  { id: 'grao',         nome: 'Grão e textura',       perfil: { densidade: 55, origem: 12, tempo: 34, elegancia: 60, humor: 45, energia: 50, luz: 45 }, nota: 'Ruído por cima de tudo. Tira o plástico da tela.' },
  { id: 'colagem',      nome: 'Recorte e colagem',    perfil: { densidade: 82, origem: 8,  tempo: 30, elegancia: 48, humor: 72, energia: 72, luz: 58 }, nota: 'Papel rasgado, sobra de impressão, corte torto de propósito.' },
  { id: 'sobreposicao', nome: 'Sobreposição foto × tipo', perfil: { densidade: 62, origem: 45, tempo: 78, elegancia: 72, humor: 55, energia: 68, luz: 55 }, nota: 'A pessoa passa na frente da palavra. Profundidade sem 3D.' },
  { id: 'selo',         nome: 'Selo circular',        perfil: { densidade: 60, origem: 30, tempo: 44, elegancia: 56, humor: 66, energia: 58, luz: 62 }, nota: 'Carimbo girando com a promessa da marca.' },
  { id: 'blocos',       nome: 'Blocos de cor',        perfil: { densidade: 72, origem: 66, tempo: 78, elegancia: 44, humor: 78, energia: 82, luz: 70 }, nota: 'Retângulo inteiro pintado. Hierarquia por área, não por peso.' },
  { id: 'halftone',     nome: 'Halftone / retícula',  perfil: { densidade: 68, origem: 40, tempo: 48, elegancia: 50, humor: 58, energia: 66, luz: 52 }, nota: 'Ponto de impressão ampliado. Nostalgia gráfica com pose atual.' }
];

const GRIDS = [
  { id: '12col',     nome: 'Grade 12 colunas', nota: 'O padrão de produto: previsível, responsivo, invisível.' },
  { id: 'modular',   nome: 'Grade modular 4×4', nota: 'Módulos quadrados. Bom para catálogo e cards.' },
  { id: 'editorial', nome: 'Editorial 2 colunas', nota: 'Margem larga e coluna estreita. Leitura antes de conversão.' }
];

/* ---------- DIREÇÃO DE FOTOGRAFIA ----------
   Inclui o termo de busca pronto para banco de imagem. */
const FOTOGRAFIAS = [
  { id: 'retrato-editorial', nome: 'Retrato editorial de estúdio',
    perfil: { elegancia: 88, densidade: 30, humor: 45, tempo: 66, origem: 45, energia: 45, luz: 62 },
    busca: 'studio portrait editorial lighting neutral background',
    nota: 'Fundo chapado na cor da marca, recorte no ombro, olhar na câmera.' },
  { id: 'documental', nome: 'Documental de bastidor',
    perfil: { elegancia: 48, densidade: 60, humor: 62, tempo: 62, origem: 22, energia: 58, luz: 60 },
    busca: 'candid team working documentary natural light',
    nota: 'Gente trabalhando de verdade. Vende serviço e time, não produto.' },
  { id: 'macro-textura', nome: 'Macro e textura',
    perfil: { elegancia: 74, densidade: 48, humor: 38, tempo: 56, origem: 30, energia: 42, luz: 52 },
    busca: 'macro texture material closeup fabric stone',
    nota: 'Matéria em primeiro plano. Resolve fundo de seção sem foto de gente.' },
  { id: 'render-abstrato', nome: 'Render abstrato 3D',
    perfil: { elegancia: 62, densidade: 58, humor: 50, tempo: 96, origem: 96, energia: 68, luz: 46 },
    busca: 'abstract 3d render soft shapes studio lighting',
    nota: 'Forma sem referência do mundo. Ideal quando o produto é invisível.' },
  { id: 'arquitetura-luz', nome: 'Arquitetura e luz',
    perfil: { elegancia: 84, densidade: 32, humor: 28, tempo: 70, origem: 60, energia: 40, luz: 58 },
    busca: 'minimal architecture light shadow concrete',
    nota: 'Sombra dura em parede lisa. Silêncio caro.' },
  { id: 'analogico-grao', nome: 'Analógico com grão',
    perfil: { elegancia: 56, densidade: 56, humor: 66, tempo: 28, origem: 10, energia: 56, luz: 56 },
    busca: '35mm film grain portrait warm tones',
    nota: 'Filme, halação, cor imperfeita. Marca que quer parecer gente.' },
  { id: 'natureza-organica', nome: 'Natureza orgânica',
    perfil: { elegancia: 70, densidade: 40, humor: 70, tempo: 50, origem: 16, energia: 34, luz: 84 },
    busca: 'botanical still life natural light minimal',
    nota: 'Folha, água, pele. Saúde e estética pedem esse repertório.' }
];

/* ---------- PERSONAS ----------
   Personagem por vertical. Não é enfeite: é quem precisa
   reconhecer o mundo na primeira tela. */
const PERSONAS = [
  { id: 'p-saas-1', vertical: 'saas-b2b', nome: 'Renata Coelho', papel: 'Head de Operações, 38', 
    contexto: 'Compra software para 120 pessoas e responde por cada assinatura na reunião de custos.',
    quer: 'Provar em uma tela que a ferramenta reduz retrabalho.', teme: 'Comprar mais um painel que ninguém abre.',
    tom: 'Direto, com número no meio da frase.', mundo: 'Um escritório onde tudo já está no lugar antes de ela chegar.' },
  { id: 'p-saas-2', vertical: 'saas-b2b', nome: 'Diego Mattos', papel: 'Fundador de startup, 29',
    contexto: 'Time de 8 pessoas, primeira rodada levantada, precisa parecer maior do que é.',
    quer: 'Parecer empresa séria sem perder a cara de novo.', teme: 'Site genérico de template.',
    tom: 'Confiante, curto, sem jargão corporativo.', mundo: 'Uma sala de vidro com uma única mesa e muita luz.' },

  { id: 'p-fin-1', vertical: 'fintech', nome: 'Alexandre Prado', papel: 'Diretor de crédito, 46',
    contexto: 'Vende crédito para empresas médias e responde ao compliance toda semana.',
    quer: 'Transmitir solidez em três segundos.', teme: 'Qualquer coisa que pareça promessa fácil de dinheiro.',
    tom: 'Formal, com verbo no presente.', mundo: 'Um saguão de mármore, silencioso, com carpete que abafa o passo.' },
  { id: 'p-fin-2', vertical: 'fintech', nome: 'Juliana Tanaka', papel: 'PM de pagamentos, 33',
    contexto: 'Constrói checkout para lojistas pequenos que decidem em dois minutos.',
    quer: 'Clareza absoluta no fluxo e no preço.', teme: 'Interface que parece cofre e assusta o lojista.',
    tom: 'Prático e amigável, sem diminutivo.', mundo: 'Um balcão de loja onde a máquina aprova antes do cliente respirar.' },

  { id: 'p-health-1', vertical: 'healthtech', nome: 'Dra. Camila Rensi', papel: 'Dentista, clínica própria, 36',
    contexto: 'Odontologia estética em bairro nobre, agenda cheia por indicação, quer sair da indicação.',
    quer: 'Parecer clínica, não consultório. Higiene visual como prova de higiene real.',
    teme: 'Site colorido demais que lembra convênio popular.',
    tom: 'Cuidadoso, acolhedor, sem infantilizar.', mundo: 'Uma sala clara, cheiro neutro, som baixo, ninguém com pressa.' },
  { id: 'p-health-2', vertical: 'healthtech', nome: 'Marcos Aurélio', papel: 'Gestor de rede de clínicas, 44',
    contexto: 'Sete unidades, sistema de agendamento próprio, briga por padronização.',
    quer: 'Uma marca que funcione igual em sete fachadas diferentes.', teme: 'Identidade que só funciona na tela do designer.',
    tom: 'Objetivo, orientado a processo.', mundo: 'Sete recepções idênticas, onde o paciente nunca percebe que trocou de unidade.' },

  { id: 'p-bel-1', vertical: 'beleza', nome: 'Bia Marchetti', papel: 'Biomédica esteticista, 31',
    contexto: 'Atende no próprio estúdio, vende protocolo, vive de Instagram e boca a boca.',
    quer: 'Parecer cara sem parecer inacessível.', teme: 'Ficar igual às outras seis da mesma rua.',
    tom: 'Sofisticado e próximo, primeira pessoa.', mundo: 'Um estúdio pequeno, tudo em tom de pele, espelho grande e uma planta só.' },
  { id: 'p-bel-2', vertical: 'beleza', nome: 'Studio Ovo', papel: 'Marca de skincare, time de 4',
    contexto: 'Lança linha de cinco produtos e precisa de site que venda sem vendedor.',
    quer: 'Embalagem e site falando a mesma língua.', teme: 'Parecer farmácia genérica.',
    tom: 'Calmo, factual, quase científico.', mundo: 'Uma bancada branca com luz da manhã e nada sobrando.' },

  { id: 'p-edu-1', vertical: 'edtech', nome: 'Prof. Heitor Lima', papel: 'Dono de curso online, 41',
    contexto: 'Doze mil alunos, aulas gravadas, concorrência agressiva em anúncio.',
    quer: 'Energia e credibilidade na mesma tela.', teme: 'Cara de infoproduto barato.',
    tom: 'Entusiasmado, mas com prova.', mundo: 'Uma sala cheia onde todo mundo entendeu a mesma coisa ao mesmo tempo.' },
  { id: 'p-edu-2', vertical: 'edtech', nome: 'Rede Aprende+', papel: 'Coordenação pedagógica, escola',
    contexto: 'Plataforma para pais e professores de rede privada com 3 mil famílias.',
    quer: 'Simpatia sem virar desenho animado.', teme: 'Pai achando que é brinquedo e não ferramenta.',
    tom: 'Claro, gentil, instrutivo.', mundo: 'Um pátio onde os pais entendem o boletim sem ligar para a secretaria.' },

  { id: 'p-com-1', vertical: 'commerce', nome: 'Elise Duarte', papel: 'Marca autoral de moda, 27',
    contexto: 'Coleção pequena, produção local, vende direto pelo site e por drops.',
    quer: 'Que o site pareça a peça: caimento, silêncio, detalhe.', teme: 'E-commerce padrão com banner piscando.',
    tom: 'Editorial, econômico nas palavras.', mundo: 'Um ateliê onde a arara tem seis peças e todas importam.' },
  { id: 'p-com-2', vertical: 'commerce', nome: 'Fabio Nunes', papel: 'Head de e-commerce, 39',
    contexto: 'Marca de casa e decoração, 4 mil SKUs, conversão é o único assunto.',
    quer: 'Sistema visual que aguenta catálogo grande.', teme: 'Identidade linda que quebra na página de produto.',
    tom: 'Comercial, orientado a teste.', mundo: 'Uma loja onde o cliente acha o que quer sem perguntar a ninguém.' },

  { id: 'p-dev-1', vertical: 'devtools', nome: 'Kau Ferreira', papel: 'Dev advocate, 30',
    contexto: 'Ferramenta de infraestrutura adotada de baixo para cima, por engenheiro.',
    quer: 'Respeito técnico na primeira dobra: código à vista.', teme: 'Marketing por cima de produto vazio.',
    tom: 'Seco, técnico, sem adjetivo.', mundo: 'Um terminal escuro que responde antes de ele terminar de digitar.' },
  { id: 'p-dev-2', vertical: 'devtools', nome: 'Nara Vasques', papel: 'Fundadora de produto de IA, 35',
    contexto: 'Vende automação para times não técnicos, mas precisa do aval dos técnicos.',
    quer: 'Parecer inteligente sem parecer ficção científica.', teme: 'Clichê de cérebro azul e partícula brilhante.',
    tom: 'Preciso, curioso, otimista contido.', mundo: 'Uma máquina discreta que já fez o trabalho quando o time acorda.' }
];
