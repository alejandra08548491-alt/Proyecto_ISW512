let productos = [];

async function cargarProductos() {
    const res = await fetch("JSON/products.json");
    const data = await res.json();
    productos = data.productos;
    renderizarProductos();
}

function renderizarProductos() {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    productos.forEach(function(p) {
        const item = `
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="product-item">
                <div class="product-image">
                    <img src="${p.imagen}" alt="${p.nombre}">
                </div>
                <div class="product-body">
                    <h5><a href="#" onclick="verDetalle(${p.id}); return false;">${p.nombre}</a></h5>
                    <p class="small text-muted mb-1">${p.presentacion}</p>
                    <span class="price">¢${p.precio.toLocaleString("es-CR")}</span>
                </div>
                <div class="product-footer d-flex justify-content-between flex-wrap">
                    <small><a href="#" onclick="verDetalle(${p.id}); return false;"><i class="bi bi-eye me-1"></i>Ver detalle</a></small>
                    <small><a href="#" onclick="agregarProducto(${p.id}); return false;" class="text-success"><i class="bi bi-cart-plus me-1"></i>Agregar</a></small>
                </div>
            </div>
        </div>`;
        
        contenedor.innerHTML += item;
    });
}

function agregarProducto(id) {
    const producto = productos.find(function(p) {
        return p.id === id;
    });
    
    if (producto) {
        agregarAlCarrito(producto);
    }
}

function verDetalle(id) {
    const producto = productos.find(function(p) {
        return p.id === id;
    });
    
    if (!producto) return;
    
    const modalHTML = `
        <div class="modal fade" id="detalleModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${producto.nombre}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                        <p class="mt-3"><strong>Presentación:</strong> ${producto.presentacion}</p>
                        ${producto.tipo ? '<p><strong>Tipo:</strong> ' + producto.tipo + '</p>' : ''}
                        <p>${producto.descripcion}</p>
                        <h4>¢${producto.precio.toLocaleString("es-CR")}</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success" onclick="agregarProducto(${producto.id}); bootstrap.Modal.getInstance(document.getElementById('detalleModal')).hide();">
                            <i class="bi bi-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const oldModal = document.getElementById('detalleModal');
    if (oldModal) {
        oldModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
    modal.show();
    
    document.getElementById('detalleModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

document.getElementById("ordenar").addEventListener("change", function(e) {
    const opcion = e.target.value;

    if (opcion === "nombre") {
        productos.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    }

    if (opcion === "precioAsc") {
        productos.sort(function(a, b) {
            return a.precio - b.precio;
        });
    }

    if (opcion === "precioDesc") {
        productos.sort(function(a, b) {
            return b.precio - a.precio;
        });
    }

    renderizarProductos();
});

cargarProductos();