/* ============================================================================
   DADOS DO PORTFÓLIO  —  edite SOMENTE este arquivo para trocar conteúdo.
   Nada aqui exige conhecimento de programação: é só trocar o texto entre aspas
   e o caminho das imagens.

   OS TEXTOS DOS PROJETOS FORAM ESCRITOS A PARTIR DO SEU CURRÍCULO.
   Revise, ajuste o que quiser e troque as imagens quando subir a pasta
   com os arquivos reais (veja o README.md).
   ========================================================================== */

/* ----------------------------------------------------------------------------
   1. PERFIL  —  seus dados principais (hero, contato, rodapé)
   -------------------------------------------------------------------------- */
const PERFIL = {
  nome: 'Enzo',
  sobrenome: 'Giuseppe',
  cargo: 'Designer Gráfico,<br>Ilustrador &amp; Diretor de Arte',
  bio:
    'Oi, eu sou o Enzo — designer gráfico, ilustrador digital e diretor de arte. ' +
    'Crio identidades visuais, campanhas para redes sociais e projetos editoriais ' +
    'que precisam funcionar de verdade: do post que para o dedo ao livro didático ' +
    'que vai parar na mão de milhares de alunos.',
  localizacao: 'São Paulo · Aberto a projetos',
  email: 'enzogmc12345@gmail.com',
  whatsapp: '5511934517286',
  instagram: '',                                   // ex.: 'https://instagram.com/seuuser'
  behance: 'https://www.behance.net/EnzoGmc',
  linkedin: 'https://linkedin.com/in/enzogiuseppe',
  curriculoPDF: 'CURRICULO/enzo-giuseppe-curriculo.pdf',

  /* AVATAR 3D DO HERO ------------------------------------------------------
     O site tenta, nesta ordem:
       1º) a sequência de frames  (avatarFrames)  ← melhor opção
       2º) o vídeo                (avatarVideo)
       3º) a imagem parada        (avatarImagem)  ← funciona sempre
     O que não existir é simplesmente ignorado, nada quebra.              */
  avatarImagem: 'assets/hero/avatar.png',
  avatarVideo: 'assets/hero/avatar-look.mp4',

  /* SEQUÊNCIA DE FRAMES — recomendado -------------------------------------
     Se você já tem os frames do vídeo (a cabeça virando da esquerda para a
     direita), use eles: fica mais leve que vídeo, funciona no iPhone e
     acompanha o mouse sem engasgar.

     Como preparar: rode o script abaixo no terminal do seu Mac, apontando
     para a pasta com os frames originais. Ele redimensiona, comprime,
     renomeia tudo em ordem e joga direto no lugar certo:

        bash portfolio/ferramentas/preparar-frames.sh "/caminho/da/pasta"

     Depois é só conferir a "extensao" e a "quantidade" aqui embaixo — o
     script imprime os valores certos no final.                           */
  avatarFrames: {
    pasta: 'assets/hero/frames/',
    prefixo: 'frame_',
    digitos: 4,            // frame_0001.webp
    extensao: 'webp',      // o script avisa se gerou 'jpg' em vez de 'webp'
    quantidade: 0,         // 0 = o site descobre sozinho quantos frames existem
  },
};

/* ----------------------------------------------------------------------------
   2. FERRAMENTAS  —  carrossel de ícones logo abaixo do hero
   Troque os .svg por PNG/SVG dos logos reais quando quiser (mesma pasta).
   -------------------------------------------------------------------------- */
const FERRAMENTAS = [
  { nome: 'Photoshop',     icone: 'assets/tools/photoshop.svg' },
  { nome: 'Illustrator',   icone: 'assets/tools/illustrator.svg' },
  { nome: 'InDesign',      icone: 'assets/tools/indesign.svg' },
  { nome: 'Premiere',      icone: 'assets/tools/premiere.svg' },
  { nome: 'After Effects', icone: 'assets/tools/aftereffects.svg' },
  { nome: 'Figma',         icone: 'assets/tools/figma.svg' },
  { nome: 'Canva',         icone: 'assets/tools/canva.svg' },
  { nome: 'Blender',       icone: 'assets/tools/blender.svg' },
  { nome: 'CapCut',        icone: 'assets/tools/capcut.svg' },
  { nome: 'WordPress',     icone: 'assets/tools/wordpress.svg' },
  { nome: 'Elementor',     icone: 'assets/tools/elementor.svg' },
  { nome: 'HTML',          icone: 'assets/tools/html.svg' },
  { nome: 'Design com IA', icone: 'assets/tools/ia.svg' },
  { nome: 'Pacote Office', icone: 'assets/tools/office.svg' },
];

/* ----------------------------------------------------------------------------
   3. PROJETOS  —  alimentam o carrossel, as pastas e o popup estilo Mac.
   Para adicionar um projeto: copie um bloco inteiro { ... }, cole abaixo e
   troque os valores. O "id" precisa ser único.
   - pasta: em qual pasta ele aparece (use os ids da lista PASTAS, item 4)
   - capa : imagem vertical que aparece no carrossel
   - galeria: imagens que aparecem dentro do popup (quantas quiser)
   -------------------------------------------------------------------------- */
const PROJETOS = [
  {
    id: 'pnld',
    titulo: 'PNLD — Livro Didático',
    categoria: 'Editorial',
    pasta: 'editorial',
    ano: '2022 — 2025',
    cliente: 'Fundação Dorina Nowill para Cegos',
    papel: 'Ilustração e diagramação',
    resumo:
      'Ilustração e diagramação de materiais educativos para o Programa Nacional ' +
      'do Livro Didático, com acessibilidade no centro de cada decisão.',
    descricao:
      'Trabalhar para o PNLD dentro de uma fundação voltada à inclusão de pessoas ' +
      'com deficiência visual muda o jeito de desenhar: cada ilustração precisa ' +
      'funcionar junto da descrição, cada diagramação precisa aguentar linearização ' +
      'e leitura assistida. Cuidei da ilustração técnica e editorial, do layout das ' +
      'páginas e do acompanhamento da produção gráfica até a validação dos arquivos finais.',
    tags: ['Ilustração editorial', 'Diagramação', 'Acessibilidade', 'PNLD'],
    capa: 'assets/projetos/projeto-01.svg',
    galeria: ['assets/projetos/projeto-01-wide.svg'],
    link: '',
  },
  {
    id: 'fumcad',
    titulo: 'FUMCAD — Materiais Sociais',
    categoria: 'Editorial',
    pasta: 'editorial',
    ano: '2022 — 2025',
    cliente: 'Fundação Dorina Nowill para Cegos',
    papel: 'Desenvolvimento visual',
    resumo:
      'Desenvolvimento visual de materiais sociais e educativos para o projeto ' +
      'FUMCAD, do conceito à produção gráfica.',
    descricao:
      'Materiais que precisam comunicar causa social sem perder clareza. Fiz o ' +
      'desenvolvimento visual das peças, tratamento de imagem, adaptação de ' +
      'conteúdo para diferentes formatos e o acompanhamento da produção até a ' +
      'entrega. Também coordenei prazos, recursos e equipe dentro do projeto.',
    tags: ['Design social', 'Diagramação', 'Gestão de projeto'],
    capa: 'assets/projetos/projeto-02.svg',
    galeria: ['assets/projetos/projeto-02-wide.svg'],
    link: '',
  },
  {
    id: 'podemos',
    titulo: 'Campanha — Redes Sociais',
    categoria: 'Social Media',
    pasta: 'social',
    ano: '2025',
    cliente: 'Partido Podemos',
    papel: 'Design, social media e direção de arte',
    resumo:
      'Direção de arte e produção de conteúdo para redes sociais, com posts, ' +
      'ilustrações, copy e Reels dentro de um sistema visual consistente.',
    descricao:
      'Aqui o volume era o desafio: postagens semanais e mensais, várias ' +
      'plataformas, prazos curtos. Montei um sistema visual que segurava a ' +
      'identidade em qualquer peça e cuidei de tudo — post, ilustração digital, ' +
      'copywriting, tratamento de foto e edição de Reels. Também conduzi pautas, ' +
      'reuniões de planejamento e a aprovação das peças com os stakeholders.',
    tags: ['Direção de arte', 'Social media', 'Copywriting', 'Reels'],
    capa: 'assets/projetos/projeto-03.svg',
    galeria: ['assets/projetos/projeto-03-wide.svg'],
    link: '',
  },
  {
    id: 'somos',
    titulo: 'Somos Educação',
    categoria: 'Social & Editorial',
    pasta: 'social',
    ano: '2025 — atual',
    cliente: 'Somos Educação',
    papel: 'Designer freelancer',
    resumo:
      'Posts, ilustrações, vídeos institucionais e diagramação de livros ' +
      'didáticos — inclusive material para licitação pública.',
    descricao:
      'Uma frente que mistura digital e impresso: criação de posts com foco em ' +
      'identidade e engajamento, ilustrações para materiais digitais e impressos, ' +
      'edição de foto e vídeo institucional e diagramação de livros didáticos para ' +
      'processos licitatórios. Também desenvolvi apresentações e templates visuais ' +
      'usados em formações e cursos.',
    tags: ['Social media', 'Diagramação', 'Vídeo', 'Templates'],
    capa: 'assets/projetos/projeto-04.svg',
    galeria: ['assets/projetos/projeto-04-wide.svg'],
    link: '',
  },
  {
    id: 'ilustracao',
    titulo: 'Ilustração Digital',
    categoria: 'Ilustração',
    pasta: 'ilustracao',
    ano: '2022 — atual',
    cliente: 'Projetos diversos',
    papel: 'Ilustração técnica e editorial',
    resumo:
      'Ilustrações para materiais didáticos, literários e promocionais — do ' +
      'desenho técnico ao personagem com personalidade.',
    descricao:
      'Ilustração é onde eu me divirto. Já desenhei para livro literário, material ' +
      'pedagógico e peça promocional, sempre ajustando o traço ao público de cada ' +
      'projeto. A especialização em ilustração técnica e editorial veio de anos ' +
      'traduzindo conteúdo complexo em imagem que qualquer pessoa entende.',
    tags: ['Ilustração', 'Personagem', 'Editorial', 'Técnica'],
    capa: 'assets/projetos/projeto-05.svg',
    galeria: ['assets/projetos/projeto-05-wide.svg'],
    link: '',
  },
  {
    id: 'ia',
    titulo: 'IA no Fluxo de Trabalho',
    categoria: '3D / IA',
    pasta: 'ia3d',
    ano: '2024 — atual',
    cliente: 'Projeto interno',
    papel: 'Implementação e pós-produção',
    resumo:
      'Implementação de soluções de Inteligência Artificial no fluxo de design, ' +
      'com ganho real de produtividade e redução de prazos.',
    descricao:
      'IA entra como ferramenta, não como atalho. Mapeei as etapas do fluxo que ' +
      'davam para acelerar, testei modelos e montei um processo em que a IA gera a ' +
      'base e o designer finaliza — correção de proporção, iluminação, detalhe e ' +
      'composição. O resultado foi aumento de produtividade e prazos mais curtos, ' +
      'sem abrir mão do acabamento.',
    tags: ['IA', '3D', 'Processo', 'Pós-produção'],
    capa: 'assets/projetos/projeto-06.svg',
    galeria: ['assets/projetos/projeto-06-wide.svg'],
    link: '',
  },
];

/* ----------------------------------------------------------------------------
   4. PASTAS  —  a seção "Arquivos", no estilo pastas do computador.
   O contador de itens é calculado sozinho a partir dos PROJETOS acima.
   -------------------------------------------------------------------------- */
const PASTAS = [
  { id: 'editorial',  nome: 'Editorial',      descricao: 'Livros didáticos, diagramação e impressos' },
  { id: 'social',     nome: 'Social & Ads',   descricao: 'Campanhas, posts, carrosséis e Reels' },
  { id: 'ilustracao', nome: 'Ilustração',     descricao: 'Ilustração técnica, editorial e personagens' },
  { id: 'ia3d',       nome: '3D & IA',        descricao: 'Renders, personagens e experimentos' },
];

/* ----------------------------------------------------------------------------
   5. POLAROIDS  —  fotos suas na seção "Sobre".
   Salve as fotos em portfolio/assets/polaroids/ e aponte o caminho aqui.
   -------------------------------------------------------------------------- */
const POLAROIDS = [
  { foto: 'assets/polaroids/foto-1.svg', legenda: 'eu no studio',  giro: -6 },
  { foto: 'assets/polaroids/foto-2.svg', legenda: 'processo',      giro:  4 },
  { foto: 'assets/polaroids/foto-3.svg', legenda: 'bastidores',    giro: -3 },
  { foto: 'assets/polaroids/foto-4.svg', legenda: 'o setup',       giro:  7 },
];

/* ----------------------------------------------------------------------------
   6. SERVIÇOS  —  seção "o que eu faço"
   -------------------------------------------------------------------------- */
const SERVICOS = [
  { titulo: 'Identidade Visual',        texto: 'Marca, sistema e aplicação' },
  { titulo: 'Social Media & Campanhas', texto: 'Posts, carrosséis e Reels' },
  { titulo: 'Direção de Arte',          texto: 'Consistência da campanha inteira' },
  { titulo: 'Ilustração Digital',       texto: 'Editorial, técnica e personagem' },
  { titulo: 'Diagramação Editorial',    texto: 'Livros, didáticos e impressos' },
  { titulo: 'Edição de Foto e Vídeo',   texto: 'Tratamento, corte e finalização' },
];

/* ----------------------------------------------------------------------------
   7. EXPERIÊNCIA  —  vindo do seu currículo
   -------------------------------------------------------------------------- */
const EXPERIENCIA = [
  {
    periodo: '2025 — atual',
    cargo: 'Designer Freelancer',
    empresa: 'Somos Educação',
    texto:
      'Posts para redes sociais, ilustrações para digital e impresso, edição de foto ' +
      'e vídeo, diagramação de livros didáticos e materiais para licitação pública, ' +
      'além de apresentações e templates para formações e cursos.',
  },
  {
    periodo: '2025',
    cargo: 'Designer e Social Media',
    empresa: 'Partido Podemos',
    texto:
      'Direção de arte de campanhas, criação de posts, ilustração digital, copywriting, ' +
      'tratamento de foto e edição de Reels. Conduzi pautas, planejamento e a aprovação ' +
      'das peças com os stakeholders.',
  },
  {
    periodo: '2022 — 2025',
    cargo: 'Designer Gráfico',
    empresa: 'Fundação Dorina Nowill para Cegos',
    texto:
      'Ilustração e diagramação de livros e materiais educativos (PNLD e FUMCAD), ' +
      'adaptação de imagens com foco em acessibilidade, templates em HTML, coordenação ' +
      'de projeto gráfico e liderança de uma equipe de estagiários.',
  },
  {
    periodo: 'Formação',
    cargo: 'Design Gráfico · Tecnólogo em Design',
    empresa: 'Universidade Cruzeiro do Sul · Saga',
    texto:
      'Complementado por cursos de Gestão Ágil, Social Media, Tráfego Pago, Marketing ' +
      'Digital, Google Ads, Liderança e Mídias Sociais com Inteligência Artificial. ' +
      'Inglês intermediário.',
  },
];

/* ----------------------------------------------------------------------------
   8. NÚMEROS  —  os destaques que aparecem na seção "Sobre"
   -------------------------------------------------------------------------- */
const NUMEROS = [
  { valor: '+4',   rotulo: 'anos de mercado' },
  { valor: '2',    rotulo: 'projetos nacionais (PNLD e FUMCAD)' },
  { valor: '+12',  rotulo: 'ferramentas no domínio' },
];
