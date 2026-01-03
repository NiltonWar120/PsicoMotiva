// Datos de cuentas bancarias
const cuentasBancarias = {
    yape: {
        nombre: "Yape",
        qr: "img/qryape.jpeg"
    },
    plin: {
        nombre: "Plin",
        qr: "img/qrplin.jpeg"
    },
    bcp: {
        nombre: "BCP",
        logo: "img/bcp.png",
        cuentas: [
            { label: "Cuenta de Ahorros", numero: "335-98897607-0-88" }
        ]
    },
    bbva: {
        nombre: "BBVA",
        logo: "img/bbva.png",
        cuentas: [
            { label: "Cuenta BBVA", numero: "0011-0275-0201077709" }
        ]
    },
    scotiabank: {
        nombre: "Scotiabank",
        logo: "img/scotiabank.png",
        cuentas: [
            { label: "Cuenta de Ahorros", numero: "075-0514523" }
        ]
    },
    crediscotia: {
        nombre: "CrediScotia",
        logo: "img/crediscotia.png",
        cuentas: [
            { label: "Número de Tarjeta", numero: "101-17-012514-3" }
        ]
    },
    interbank: {
        nombre: "Interbank",
        logo: "img/interbank.png",
        cuentas: [
            { label: "Cuenta de Ahorros", numero: "5273130624790" }
        ]
    },
    banconacion: {
        nombre: "Banco de la Nación",
        logo: "img/banco-nacion.png",
        cuentas: [
            { label: "Cuenta de Ahorros", numero: "04-321-140241" }
        ]
    }
};

const modal = document.getElementById('modalBanco');
const closeModal = document.getElementById('closeModal');
const bancoNombre = document.getElementById('bancoNombre');
const bancoLogo = document.getElementById('bancoLogo');
const cuentasContainer = document.getElementById('cuentasContainer');

// Click en bancos
document.querySelectorAll('.payment-grid img').forEach(img => {
    img.addEventListener('click', function () {
        const banco = this.getAttribute('data-banco');
        mostrarModal(banco);
    });
});

function mostrarModal(banco) {
    const data = cuentasBancarias[banco];
    if (!data) return;

    // Limpiar contenido
    cuentasContainer.innerHTML = '';

    // Referencias
    const bancoLogoContainer = bancoLogo.parentElement;
    const modalSubtitle = document.querySelector('.modal-subtitle');

    // ===== CASO QR (YAPE / PLIN) =====
    if (data.qr) {

        // Quitar marco blanco
        cuentasContainer.style.background = 'transparent';
        cuentasContainer.style.padding = '0';
        cuentasContainer.style.borderRadius = '0';
        cuentasContainer.style.boxShadow = 'none';

        // Ocultar logo y subtítulo
        if (bancoLogoContainer) bancoLogoContainer.style.display = 'none';
        if (modalSubtitle) modalSubtitle.style.display = 'none';

        // Mostrar QR
        const qrDiv = document.createElement('div');
        qrDiv.className = 'qr-container';
        qrDiv.innerHTML = `
            <img src="${data.qr}" alt="Código QR ${data.nombre}" class="qr-image">
            <p class="qr-texto">Escanea el código QR con tu app ${data.nombre}</p>
        `;
        cuentasContainer.appendChild(qrDiv);

    } 
    // ===== CASO BANCOS =====
    else {

        // Restaurar marco blanco
        cuentasContainer.style.background = '#ffffff';
        cuentasContainer.style.padding = '20px';
        cuentasContainer.style.borderRadius = '16px';
        cuentasContainer.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';

        // Mostrar logo y subtítulo
        if (bancoLogoContainer) bancoLogoContainer.style.display = 'flex';
        if (modalSubtitle) modalSubtitle.style.display = 'block';

        bancoNombre.textContent = data.nombre;
        bancoLogo.src = data.logo;
        bancoLogo.alt = data.nombre;

        // Agregar cuentas
        data.cuentas.forEach(cuenta => {
            const cuentaDiv = document.createElement('div');
            cuentaDiv.className = 'cuenta-info';
            cuentaDiv.innerHTML = `
                <div class="cuenta-label">${cuenta.label}:</div>
                <div class="cuenta-numero">${cuenta.numero}</div>
            `;
            cuentasContainer.appendChild(cuentaDiv);
        });
    }

    modal.classList.add('active');
}

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Cerrar al hacer click fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});
