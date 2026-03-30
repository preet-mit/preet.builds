/* ==========================================
   EIGENPRIZE PORTFOLIO — Scripts
   Scroll animations & nav behavior
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Scroll-triggered animations ----------
    const animatedElements = document.querySelectorAll(
        '.story-block, .build-header, .impact-card, .about-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for grid items
                const delay = entry.target.classList.contains('impact-card')
                    ? index * 100
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));


    // ---------- Nav background on scroll ----------
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
            nav.style.background = 'rgba(10, 10, 15, 0.85)';
        }

        lastScroll = currentScroll;
    }, { passive: true });


    // ---------- Active nav link highlighting ----------
    const sections = document.querySelectorAll('.build-section, .about-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--accent-light)';
                    }
                });
            }
        });
    }, {
        threshold: 0.2,
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

});
