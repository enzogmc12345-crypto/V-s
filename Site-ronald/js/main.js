document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE MENU TOGGLE --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    /* --- STICKY HEADER --- */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* --- DYNAMIC YEAR --- */
    document.getElementById('current-year').textContent = new Date().getFullYear();

    /* --- GALLERY MODAL (LIGHTBOX) --- */
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // allow scroll again
    });

    // Close on out-click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    /* --- SMOOTH SCROLLING (OFFSET FOR FIXED HEADER) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* --- PRICING TOGGLE ACTIVE STATE --- */
    const priceItems = document.querySelectorAll('.price-item');
    priceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            priceItems.forEach(pi => pi.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* --- GALLERY LOAD MORE --- */
    const loadMoreBtn = document.getElementById('load-more-btn');
    const allGalleryItems = document.querySelectorAll('.gallery-category:last-child .gallery-item');
    let currentImgCount = 10;

    if (loadMoreBtn && allGalleryItems.length > 0) {
        // Initialize: hide items beyond currentImgCount
        allGalleryItems.forEach((item, index) => {
            if (index >= currentImgCount) {
                item.classList.add('hidden');
            }
        });

        // Hide button if no more items to load
        if (allGalleryItems.length <= currentImgCount) {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', () => {
            let nextImgCount = currentImgCount + 10;

            allGalleryItems.forEach((item, index) => {
                if (index >= currentImgCount && index < nextImgCount) {
                    item.classList.remove('hidden');
                }
            });

            currentImgCount = nextImgCount;

            if (currentImgCount >= allGalleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

});
