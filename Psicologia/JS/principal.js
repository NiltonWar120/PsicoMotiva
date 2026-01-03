document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // MARCAR LINK ACTIVO AL HACER CLICK
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {

        // Si es dropdown en móvil, NO cerrar el menú
        if (this.classList.contains('dropdown-toggle') && window.innerWidth < 992) {
            e.preventDefault();
            return;
        }

        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Cerrar menú SOLO si NO es dropdown
        if (navbarCollapse.classList.contains('show') && window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

    
    // SOMBRA AL HACER SCROLL
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ROTACIÓN DE ICONOS DE REDES SOCIALES
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'rotate(0deg)';
        });
    });
    
});
const typingTexts = [
    'PRIORIDAD',  // Slide 1
    'BIENESTAR',  // Slide 2
    'PRIORIDAD'   // Slide 3
];

let currentSlide = 0;
let charIndex = 0;
let isTyping = true;
let typingSpeed = 150;
let deletingSpeed = 100;
let pauseTime = 2000;
let typingTimer = null; // Variable para almacenar el ID del timeout

function typeWriter() {
    const typingElement = document.querySelectorAll('.typing-text')[currentSlide];
    
    if (!typingElement) return;
    
    const currentText = typingTexts[currentSlide];
    
    if (isTyping) {
        if (charIndex < currentText.length) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingTimer = setTimeout(typeWriter, typingSpeed);
        } else {
            isTyping = false;
            typingTimer = setTimeout(typeWriter, pauseTime);
        }
    } else {
        if (charIndex > 0) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingTimer = setTimeout(typeWriter, deletingSpeed);
        } else {
            isTyping = true;
            typingTimer = setTimeout(typeWriter, 500);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#heroCarousel');
    
    if (carousel) {
        typeWriter();
        
        carousel.addEventListener('slide.bs.carousel', function(e) {
            // Cancelar el timeout anterior
            if (typingTimer) {
                clearTimeout(typingTimer);
                typingTimer = null;
            }
            
            currentSlide = e.to;
            charIndex = 0;
            isTyping = true;
            
            document.querySelectorAll('.typing-text').forEach(el => {
                el.textContent = '';
            });
            
            setTimeout(() => {
                typeWriter();
            }, 300);
        });
    }
});

// ===== SECCIÓN DE TESTIMONIOS =====
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // Solo ejecutar si existen los elementos
    if (!track || !cards.length || !dotsContainer) return;
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 991 ? 2 : 1;
    const totalSlides = Math.ceil(cards.length / cardsPerView);

    // Crear dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Ir a slide específico
    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth;
        const gap = 35;
        const offset = -(cardWidth + gap) * currentIndex * cardsPerView;
        track.style.transform = `translateX(${offset}px)`;
        
        updateDots();
    }

    // Actualizar dots
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto-play automático
    let autoplayInterval = setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 4000); // Cambia cada 4 segundos

    // Pausar autoplay al hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 4000);
    });

    // Responsive
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth > 991 ? 2 : 1;
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = 0;
            createDots();
            goToSlide(0);
        }
    });

    // Inicializar
    createDots();
});