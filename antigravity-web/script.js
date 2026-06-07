document.addEventListener('DOMContentLoaded', () => {
    
    // Tab Switching Logic for Packages
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Configurator Logic
    const duracaoPills = document.querySelectorAll('#duracao .pill');
    const volumePills = document.querySelectorAll('#volume .pill');
    const formatoPills = document.querySelectorAll('#formato .pill');
    const priceDisplay = document.getElementById('estimated-price');

    // Default Selection
    let selectedDuracao = 4; // 1 Mês multiplier
    let selectedVolume = 450; // 5 Posts base price
    let selectedFormatoMult = 1.0; // Carrosséis

    function calculatePrice() {
        // Base Price = volume per week * duration weeks
        let base = selectedVolume * selectedDuracao;
        
        // Formato Multiplier
        let finalPrice = base * selectedFormatoMult;

        // Apply duration discounts
        if (selectedDuracao === 4) finalPrice *= 0.95; // 5% discount for 1 month
        if (selectedDuracao === 12) finalPrice *= 0.85; // 15% discount for 3 months
        if (selectedDuracao === 24) finalPrice *= 0.75; // 25% discount for 6 months

        priceDisplay.textContent = `R$ ${Math.round(finalPrice).toLocaleString('pt-BR')}`;
    }

    function setupPillGroup(pills, type) {
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                if (type === 'duracao') {
                    selectedDuracao = parseInt(pill.getAttribute('data-value'));
                } else if (type === 'volume') {
                    selectedVolume = parseInt(pill.getAttribute('data-value'));
                } else if (type === 'formato') {
                    const format = pill.textContent;
                    if (format === 'Carrosséis') selectedFormatoMult = 1.0;
                    if (format === 'Posts Únicos') selectedFormatoMult = 0.85;
                    if (format === 'Stories') selectedFormatoMult = 0.7;
                    if (format === 'Mix') selectedFormatoMult = 1.15;
                }

                calculatePrice();
            });
        });
    }

    setupPillGroup(duracaoPills, 'duracao');
    setupPillGroup(volumePills, 'volume');
    setupPillGroup(formatoPills, 'formato');

    // Initial Calculation
    calculatePrice();


    // PIX Form Simulation
    const pixForm = document.getElementById('pix-form');
    const selectService = pixForm.querySelector('select');
    const pixTotalArea = pixForm.querySelector('.total-area strong');

    const servicePrices = {
        'Criação de Site Completo': 'R$ 3.500',
        'Edição de Vídeo': 'R$ 800',
        'Pacote Social Media': 'A partir de R$ 1.500',
        'Identidade Visual / Ilustração': 'R$ 2.000',
        'Aplicativo Native': 'A partir de R$ 5.000'
    };

    selectService.addEventListener('change', (e) => {
        const selected = e.target.value;
        pixTotalArea.textContent = servicePrices[selected] || 'R$ A definir';
    });

    // Initialize with first value
    pixTotalArea.textContent = servicePrices[selectService.value];

});
