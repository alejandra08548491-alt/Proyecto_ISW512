let testimonios = [];
let testimoniosMostrados = 6; // Inicialmente mostrar 6

// Cargar testimonios desde JSON
async function cargarTestimonios() {
    try {
        const res = await fetch("JSON/testimonials.json");
        const data = await res.json();
        testimonios = data.testimonios;
        renderizarTestimonios();
    } catch (error) {
        console.error("Error al cargar testimonios:", error);
    }
}

// Generar estrellas según calificación
function generarEstrellas(calificacion) {
    let estrellas = "";
    for (let i = 0; i < 5; i++) {
        if (i < calificacion) {
            estrellas += '<i class="bi bi-star-fill text-warning"></i>';
        } else {
            estrellas += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return estrellas;
}

// Renderizar testimonios en la página
function renderizarTestimonios() {
    const contenedor = document.getElementById("testimonios-container");
    contenedor.innerHTML = "";

    // Mostrar solo la cantidad especificada
    const testimoniosAMostrar = testimonios.slice(0, testimoniosMostrados);

    testimoniosAMostrar.forEach(t => {
        const testimonio = `
        <div class="col-md-4 mb-4">
            <div class="testimonial-card">
                <div class="mb-2">
                    ${generarEstrellas(t.calificacion)}
                </div>
                <p class="testimonial-text">"${t.opinion}"</p>
                <h6 class="mt-3 fw-bold text-primary">— ${t.nombre}</h6>
                <small class="text-muted">${t.producto}</small>
            </div>
        </div>`;
        
        contenedor.innerHTML += testimonio;
    });

    // Controlar visibilidad de botones
    actualizarBotones();
}

// Actualizar estado de los botones
function actualizarBotones() {
    const btnVerMas = document.getElementById("btn-ver-mas");
    const btnOcultar = document.getElementById("btn-ocultar");

    // Mostrar botón "Ver más" solo si hay más testimonios por mostrar
    if (testimoniosMostrados >= testimonios.length) {
        btnVerMas.style.display = "none";
    } else {
        btnVerMas.style.display = "inline-block";
    }

    // Mostrar botón "Ocultar" solo si se están mostrando más de 6
    if (testimoniosMostrados > 6) {
        btnOcultar.style.display = "inline-block";
    } else {
        btnOcultar.style.display = "none";
    }
}

// Función para cargar más testimonios
function verMasTestimonios() {
    testimoniosMostrados += 6; // Mostrar 6 más cada vez
    renderizarTestimonios();
    
    // Scroll suave hacia los nuevos testimonios
    setTimeout(() => {
        const ultimaCard = document.querySelectorAll('.testimonial-card')[testimoniosMostrados - 7];
        if (ultimaCard) {
            ultimaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// Función para ocultar testimonios
function ocultarTestimonios() {
    testimoniosMostrados = 6; // Volver a mostrar solo 6
    renderizarTestimonios();
    
    // Scroll suave hacia la sección de testimonios
    setTimeout(() => {
        document.getElementById("testimonios-container").scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// Iniciar carga
cargarTestimonios();