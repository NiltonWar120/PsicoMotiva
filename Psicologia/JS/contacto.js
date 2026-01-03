// Función para enviar mensaje por WhatsApp
function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    if (!nombre || !telefono || !mensaje) {
        alert('Por favor, completa todos los campos antes de enviar.');
        
        if (!nombre) document.getElementById('nombre').style.borderColor = 'red';
        if (!telefono) document.getElementById('telefono').style.borderColor = 'red';
        if (!mensaje) document.getElementById('mensaje').style.borderColor = 'red';
        
        return;
    }
    
    const numeroWhatsApp = '51989077759';
    
    // Mensaje simple y profesional
    const mensajeWhatsApp = encodeURIComponent(
        `Hola, soy *${nombre}*\n\n` +
        `Mi teléfono es: ${telefono}\n\n` +
        `${mensaje}\n` +
        `\n` +
        `Mensaje enviado desde www.psicobed.com`
    );
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
    
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('mensaje').value = '';
    
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
        input.style.borderColor = '#e0e0e0';
    });
}



// Quitar borde rojo al escribir
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '#e0e0e0';
    });
});

// Smooth scroll para botón hero
document.querySelector('.hero-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Efecto de sombra en navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    }
});

// Animación de entrada para elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .contact-form, .contact-left').forEach(el => {
    observer.observe(el);
});

// Prevenir envío del formulario con Enter (excepto en textarea)
document.querySelectorAll('.contact-form input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enviarWhatsApp();
        }
    });
});

console.log('✅ Página de contacto cargada correctamente');
