const servicosData = {
    "criacao-de-sites": {
        title: "Criação de Sites",
        subtitle: "A máquina de vendas da sua empresa",
        description: "Transformamos visitantes em clientes com sites de alta conversão, rápidos e com design premium. Um site não é apenas um cartão de visitas, é o seu melhor vendedor trabalhando 24/7.",
        icon: "fas fa-laptop-code",
        basePrice: 2500,
        questions: [
            { id: "tipo_site", label: "Tipo de Site", options: [{val: 1, text: "Landing Page Simples"}, {val: 1.5, text: "Site Institucional (até 5 páginas)"}, {val: 2.5, text: "E-commerce completo"}] },
            { id: "prazo", label: "Prazo de Entrega", options: [{val: 1.3, text: "Express (72 horas)"}, {val: 1.0, text: "Padrão (15 dias)"}] }
        ],
        benefits: ["Carregamento Ultrarrápido", "SEO Otimizado (Google)", "Design Responsivo (Mobile First)", "Copywriting Persuasivo"]
    },
    "edicao-de-video": {
        title: "Edição de Vídeo",
        subtitle: "Prenda a atenção no primeiro segundo",
        description: "Edição dinâmica e profissional que aumenta a retenção e o engajamento. Cortes precisos, animações, legendas e color grading de cinema para TikTok, Reels e YouTube.",
        icon: "fas fa-video",
        basePrice: 150,
        questions: [
            { id: "formato", label: "Formato do Vídeo", options: [{val: 1, text: "Reels/TikTok (até 60s)"}, {val: 2.5, text: "YouTube Longo (> 5min)"}, {val: 4, text: "Vídeo de Vendas (VSL)"}] },
            { id: "pacote", label: "Pacote Mensal", options: [{val: 1, text: "Avulso (1 vídeo)"}, {val: 8, text: "10 Vídeos por mês"}, {val: 15, text: "20 Vídeos por mês"}] }
        ],
        benefits: ["Legendas Dinâmicas", "Trilha Sonora sem Copyright", "Efeitos Sonoros (Sound Design)", "Retenção Máxima"]
    },
    "edicao-de-imagem": {
        title: "Identidade Visual & Edição",
        subtitle: "Sua marca gravada na mente do cliente",
        description: "Criamos a identidade completa do seu negócio ou realizamos tratamentos avançados de imagem para campanhas que exigem um visual de altíssimo nível.",
        icon: "fas fa-image",
        basePrice: 1200,
        questions: [
            { id: "servico", label: "O que você precisa?", options: [{val: 1, text: "Identidade Visual Completa"}, {val: 0.3, text: "Logo e Paleta"}, {val: 0.5, text: "Tratamento de 10 fotos"}] }
        ],
        benefits: ["Design Premium e Exclusivo", "Manual da Marca", "Aplicações em Mockups", "Arquivos Abertos e Vetorizados"]
    },
    "social-media": {
        title: "Posts para Instagram",
        subtitle: "Estratégia que converte seguidores em fãs",
        description: "Mais do que artes bonitas, criamos carrosséis e posts únicos que geram desejo, autoridade e vendas. Design focado em performance no feed.",
        icon: "fas fa-hashtag",
        basePrice: 800,
        questions: [
            { id: "plano", label: "Frequência Semanal", options: [{val: 1, text: "3 Posts por semana"}, {val: 1.5, text: "5 Posts por semana"}, {val: 2, text: "Todos os dias"}] },
            { id: "estilo", label: "Formato", options: [{val: 1, text: "Apenas Artes Únicas"}, {val: 1.3, text: "Mix de Artes e Carrosséis"}] }
        ],
        benefits: ["Planejamento Estratégico", "Legendas Persuasivas inclusas", "Design de Alto Padrão", "Análise de Métricas"]
    },
    "aplicativos": {
        title: "Criação de Aplicativos",
        subtitle: "Sua ideia na palma da mão",
        description: "Desenvolvimento de apps nativos para iOS e Android com design impecável (UI/UX) e experiência totalmente fluida para o usuário final.",
        icon: "fas fa-mobile-alt",
        basePrice: 8000,
        questions: [
            { id: "plataforma", label: "Plataformas", options: [{val: 1, text: "Apenas Android ou iOS"}, {val: 1.6, text: "Android + iOS (Ambos)"}] },
            { id: "telas", label: "Complexidade", options: [{val: 1, text: "Simples (até 5 telas)"}, {val: 1.5, text: "Intermediário (Login, DB, Pagamentos)"}, {val: 2.5, text: "Complexo (Uber, iFood, etc)"}] }
        ],
        benefits: ["Design UI/UX Premium", "Alta Performance Nativada", "Integração de Pagamentos", "Publicação nas Lojas inclusa"]
    }
};
