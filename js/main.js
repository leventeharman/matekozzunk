document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobil menü kezelése
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Menü bezárása kattintás után (mobilon)
        navLinks.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Beúszó animációk görgetéskor (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Akkor töltődik be, amikor az elem 15%-a láthatóvá válik
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ha egyszer bejött, nem animáljuk újra
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
});