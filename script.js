// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// ===================================
// STICKY HEADER ON SCROLL
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Update icon
        const icon = menuToggle.textContent;
        menuToggle.textContent = icon === '☰' ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
}

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
};

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target;
            const target = parseInt(number.textContent.replace(/\D/g, ''));

            animateCounter(number, target);
            number.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// FORM VALIDATION (if forms are added)
// ===================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const handleFormSubmit = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Add your form submission logic here
        console.log('Form submitted successfully!');
        alert('Obrigado! Entraremos em contato em breve.');
        form.reset();
    });
};

// Apply form validation to all forms
document.querySelectorAll('form').forEach(form => {
    handleFormSubmit(form);
});

// ===================================
// WHATSAPP BUTTON PULSE ANIMATION
// ===================================
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    setInterval(() => {
        whatsappButton.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            whatsappButton.style.animation = '';
        }, 1000);
    }, 5000);
}

// ===================================
// CTA BUTTONS TRACKING (for analytics)
// ===================================
document.querySelectorAll('.btn-primary, .cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add Google Analytics or other tracking here
        console.log('CTA clicked:', e.target.textContent);

        // Example: gtag('event', 'cta_click', { 'button_text': e.target.textContent });
    });
});

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// PRICE FORMATTING
// ===================================
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

// ===================================
// BACK TO TOP BUTTON
// ===================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 140px;
        right: 32px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(254, 78, 0, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) translateY(0)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateY(0)';
    });
};

// Initialize back to top button
createBackToTopButton();

// ===================================
// DETECT BROWSER AND ADD CLASS
// ===================================
const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let browserName = 'unknown';

    if (userAgent.includes('Firefox')) {
        browserName = 'firefox';
    } else if (userAgent.includes('Chrome')) {
        browserName = 'chrome';
    } else if (userAgent.includes('Safari')) {
        browserName = 'safari';
    } else if (userAgent.includes('Edge')) {
        browserName = 'edge';
    }

    document.documentElement.classList.add(`browser-${browserName}`);
};

detectBrowser();

// ===================================
// PERFORMANCE MONITORING
// ===================================
if (typeof PerformanceObserver !== 'undefined') {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        }
    });

    try {
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Browser doesn't support LCP
    }
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🔒 Certificado Digital e-CPF A1', 'font-size: 20px; font-weight: bold; color: #fe4e00;');
console.log('%cDesenvolvido com as melhores práticas de UX/UI', 'font-size: 12px; color: #666;');
console.log('%c────────────────────────────────────────', 'color: #fe4e00;');

// ===================================
// SERVICE WORKER REGISTRATION (PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
