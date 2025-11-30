$(document).ready(function() {
    
    $('#nombre').on('blur', function() {
        var nombre = $(this).val();
        if (nombre.length < 3) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    
    $('#lastName').on('blur', function() {
        var apellido = $(this).val();
        if (apellido.length < 3) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    
    $('#email').on('blur', function() {
        var email = $(this).val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
    
    $('#mensaje').on('input', function() {
        var texto = $(this).val();
        var caracteres = texto.length;
        
        if ($('#contadorCaracteres').length === 0) {
            $(this).after('<small id="contadorCaracteres" class="text-muted"></small>');
        }
        
        $('#contadorCaracteres').text(caracteres + ' caracteres escritos');
        
        if (caracteres < 10) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    
    $('#rangoIngreso').on('input', function() {
        var valor = parseInt($(this).val());
        $('#rangoValor').text('¢' + valor.toLocaleString('es-CR'));
    });
    
    $('#gradoAcademico').on('change', function() {
        var seleccionados = $(this).val();
        if (seleccionados && seleccionados.length > 0) {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
    
});