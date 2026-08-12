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
        // Mobilon a hosszú szekciók miatt 10%-os láthatóság már elég a triggerhez
        threshold: 0.1 
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


    // 3. Óratípusok kártyák "kibomló" logikája (érintőképernyőkhöz)
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            // Mobilon (vagy ha nem támogatott a hover), klikkre nyílik le
            if (window.matchMedia("(hover: none)").matches || window.innerWidth <= 768) {
                card.classList.toggle('expanded');
            }
        });
    });

    // 4. Cookie Banner kezelése
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Ellenőrizzük, hogy elfogadta-e már korábban
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
            
            // Itt elvileg dinamikusan is be lehetne tölteni a Google Analytics-et, 
            // de jelenleg a gtag inicializálását engedélyezzük.
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        });
    }
    
});