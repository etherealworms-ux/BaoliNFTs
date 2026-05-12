document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 140; // browser header + toolbar + navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Micro-interactions for buttons
    const buttons = document.querySelectorAll('.btn-retro');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05) translate(-2px, -2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translate(0, 0)';
        });
    });



    // Simple parallax effect for coins and gallery cards
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;

        // Coins
        document.querySelectorAll('.coin').forEach(coin => {
            coin.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });

        // Gallery Cards Tilt
        document.querySelectorAll('.web3-card-upgraded').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            const angleX = (cardY - e.pageY) / 15;
            const angleY = (e.pageX - cardX) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // Optimized Particle System
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = '3px';
            p.style.height = '3px';
            p.style.background = '#00f2ff';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.opacity = '0.5';
            p.style.animation = `float-p ${10 + Math.random() * 10}s linear infinite`;
            particleContainer.appendChild(p);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-p {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-50vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Reset all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-icon').textContent = '+';
            });

            // Toggle current if it wasn't active
            if (!wasActive) {
                item.classList.add('active');
                item.querySelector('.faq-icon').textContent = '-';
            }
        });
    });
    // Enhanced Scroll Reveal Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));

    // Crossing Horizontal Parallax Logic
    const tracks = document.querySelectorAll('.parallax-track');
    const galleryReveal = document.querySelector('.gallery-reveal-text');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        tracks.forEach(track => {
            const rect = track.getBoundingClientRect();
            
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const speed = parseFloat(track.dataset.speed || 1);
                
                // Calculate progress (1 at bottom, 0 at center)
                const progress = rect.top / viewportHeight;
                
                // Start far outside (+/- 800px) and move to 0
                const shift = progress * (speed > 0 ? 1000 : -1000);
                track.style.transform = `translateX(${shift}px)`;
                
                // Fade in as it approaches the center
                const opacity = 1 - Math.min(1, progress * 1.5);
                track.style.opacity = opacity;
            }
        });

        // Elegant BAOLI Reveal
        if (galleryReveal) {
            const rect = galleryReveal.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.85) {
                galleryReveal.classList.add('active');
                galleryReveal.querySelector('h2').style.letterSpacing = '10px';
            } else {
                galleryReveal.classList.remove('active');
                galleryReveal.querySelector('h2').style.letterSpacing = '50px';
            }
        }
    });
});
