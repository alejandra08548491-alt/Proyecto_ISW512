let carrito = [];

function cargarCarrito() {
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

function guardarCarrito() {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarNotificacion(producto.nombre + ' agregado al carrito');
    actualizarVistaCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarVistaCarrito();
}

function actualizarCantidad(id, cantidad) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = parseInt(cantidad);
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarCarrito();
            actualizarVistaCarrito();
        }
    }
}

function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

function calcularTotal() {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

function actualizarVistaCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoContenido = document.getElementById('carrito-contenido');

    if (!carritoItems) return;

    if (carrito.length === 0) {
        if (carritoVacio) carritoVacio.style.display = 'block';
        if (carritoContenido) carritoContenido.style.display = 'none';
        if (carritoTotal) carritoTotal.innerHTML = '¢0';
        return;
    }

    if (carritoVacio) carritoVacio.style.display = 'none';
    if (carritoContenido) carritoContenido.style.display = 'block';

    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const itemHTML = `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-3">
                    <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid">
                </div>
                <div class="col-5">
                    <h6>${item.nombre}</h6>
                    <small class="text-muted">${item.presentacion}</small>
                    <p class="mb-0 fw-bold">¢${item.precio.toLocaleString("es-CR")}</p>
                </div>
                <div class="col-4">
                    <div class="input-group input-group-sm mb-2">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                        <input type="number" class="form-control text-center" value="${item.cantidad}" 
                               onchange="actualizarCantidad(${item.id}, this.value)" min="1">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                    </div>
                    <button class="btn btn-danger w-100" onclick="eliminarDelCarrito(${item.id})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>`;

        carritoItems.innerHTML += itemHTML;
    });

    if (carritoTotal) {
        carritoTotal.innerHTML = '¢' + calcularTotal().toLocaleString("es-CR");
    }
}

function enviarAWhatsApp() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let mensaje = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';

    carrito.forEach(item => {
        mensaje += '• ' + item.nombre + ' (' + item.presentacion + ')\n';
        mensaje += '  Cantidad: ' + item.cantidad + '\n';
        mensaje += '  Precio: ¢' + item.precio.toLocaleString("es-CR") + '\n';
    });

    mensaje += '*TOTAL: ¢' + calcularTotal().toLocaleString("es-CR") + '*\n\n';
    mensaje += '¿Podrían confirmar disponibilidad?';

    const numeroWhatsApp = '50672994595';
    const url = 'https://wa.me/' + numeroWhatsApp + '?text=' + encodeURIComponent(mensaje);

    window.open(url, '_blank');
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion('Carrito vacío');
    }
}

function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-5';
    notif.style.zIndex = '9999';
    notif.innerHTML = '<i class="bi bi-check-circle me-2"></i>' + mensaje;

    document.body.appendChild(notif);

    setTimeout(function () {
        notif.remove();
    }, 3000);
}

function toggleCarrito() {
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
    actualizarVistaCarrito();
    modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    actualizarVistaCarrito();
});