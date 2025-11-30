function calcularEdad() {

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edadInput = document.getElementById('edad');

    // VALIDAR NOMBRE
    if (nombre === "") {
        alert("Por favor ingrese su nombre.");
        return false;
    }
    if (/\d/.test(nombre)) {
        alert("El nombre no debe contener números.");
        return false;
    }

    // VALIDAR APELLIDO
    if (apellido === "") {
        alert("Por favor ingrese su apellido.");
        return false;
    }
    if (/\d/.test(apellido)) {
        alert("El apellido no debe contener números.");
        return false;
    }
    // VALIDAR FECHA DE NACIMIENTO
    if (!fechaNacimiento) {
        alert("Por favor ingrese su fecha de nacimiento.");
        return false;
    }
    // VALIDAR EMAIL
    if (email === "") {
        alert("Por favor ingrese su correo.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Ingrese un correo válido.");
        return false;
    }

    // VALIDAR MENSAJE
    if (mensaje === "") {
        alert("Por favor escriba un mensaje.");
        return false;
    }

    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);

    if (fechaNac > hoy) {
        alert("La fecha de nacimiento no puede ser futura.");
        return false;
    }

    // CALCULAR EDAD
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    if (edad < 0 || edad > 120) {
        alert("La fecha de nacimiento no parece correcta.");
        return false;
    }

    // Pasar edad al input oculto
    edadInput.value = edad;

    // Todo está OK → permitir enviar
    return true;
}