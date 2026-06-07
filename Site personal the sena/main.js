document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Lucide icon between menu and x
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Popups Logic
    const entryPopup = document.getElementById('entryPopup');
    const exitPopup = document.getElementById('exitPopup');
    const closeEntryPopup = document.getElementById('closeEntryPopup');
    const closeExitPopup = document.getElementById('closeExitPopup');

    // End of page Popup (formerly timed Entry Popup)
    let endPopupShown = sessionStorage.getItem('endPopupShown');

    window.addEventListener('scroll', () => {
        if (!endPopupShown && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            entryPopup.classList.add('active');
            sessionStorage.setItem('endPopupShown', 'true');
            endPopupShown = 'true';
        }
    });

    closeEntryPopup.addEventListener('click', () => {
        entryPopup.classList.remove('active');
    });

    // Exit Intent Popup
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitPopup.classList.add('active');
            sessionStorage.setItem('exitIntentShown', 'true');
            exitIntentShown = 'true';
        }
    });

    closeExitPopup.addEventListener('click', () => {
        exitPopup.classList.remove('active');
    });

    const btnStay = document.getElementById('btnStay');
    const btnLeave = document.getElementById('btnLeave');

    if (btnStay) {
        btnStay.addEventListener('click', () => {
            exitPopup.classList.remove('active');
        });
    }

    if (btnLeave) {
        btnLeave.addEventListener('click', () => {
            exitPopup.classList.remove('active');
            // Try to close the tab/window; may not work in all browsers if script didn't open it
            window.close();
            // As fallback, we could redirect to a blank or neutral page or just hide the prompt.
        });
    }

    // Close on overlay click
    [entryPopup, exitPopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });

    // 5. Image Lightbox Logic
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    if (lightbox && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Close when clicking the close button
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }
});
