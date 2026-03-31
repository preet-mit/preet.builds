/* ==========================================
   PREET.BUILDS — Scripts
   Scroll reveals, nav behavior, parallax
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Scroll-triggered animations ----------
    const revealElements = document.querySelectorAll(
        '.story-block, .build-header, .impact-card, .about-content, .dna-card, .image-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ---------- Nav scroll behavior ----------
    const nav = document.getElementById('nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 80) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    // ---------- Active nav link highlighting ----------
    const sections = document.querySelectorAll('.build-section, .about-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));


    // ---------- Smooth scroll for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ---------- Parallax hero image ----------
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scroll = window.scrollY;
                    if (scroll < window.innerHeight) {
                        heroImage.style.transform = `scale(1.05) translateY(${scroll * 0.15}px)`;
                        heroImage.style.opacity = Math.max(0.02, 0.08 - scroll * 0.0001);
                    }
                });
            }
        }, { passive: true });
    }

});
