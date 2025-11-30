let imagenes = [];  // Variable para guardar las imágenes

async function cargarImagenes() {
    const respuesta = await fetch("JSON/gallery.json");  // Pido el JSON
    const datos = await respuesta.json();  // Lo convierto a JavaScript
    imagenes = datos.imagenes;  // Guardo las imágenes
    mostrarImagenes();  // Las muestro en pantalla
}

function mostrarImagenes() {
    const contenedor = document.querySelector(".row.g-4");  // Busco donde van las imágenes
    contenedor.innerHTML = "";  // Limpio el contenedor
    
    imagenes.forEach(function(img) {  // Por cada imagen
        const columna = document.createElement("div");  // Creo una columna
        columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";  // Le doy clases responsive
        
        const imagen = document.createElement("img");  // Creo la etiqueta img
        imagen.src = img.src;  // Le pongo la ruta
        imagen.alt = img.titulo;  // Le pongo el alt
        imagen.className = "gallery-img img-fluid";  // Le doy estilos
        imagen.title = img.titulo;  // Le pongo el título
        
        columna.appendChild(imagen);  // Meto la imagen en la columna
        contenedor.appendChild(columna);  // Meto la columna en el contenedor
    });
}

cargarImagenes();  // Ejecuto todo al cargar la página