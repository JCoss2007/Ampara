

const cerrarSesion = document.getElementById("boton-cerrar-sesion");

const eliminarCuenta = document.getElementById("boton-eliminar-cuenta")

const eliminarChat = document.getElementById("boton-eliminar-chat");

const reportarProblema = document.getElementById("boton-reportar-problema");

const suscripcionPlus = document.getElementById("suscripcion-plus");

const suscripcionPro = document.getElementById("suscripcion-pro");

cerrarSesion.addEventListener("click", function(e) {
    e.preventDefault(); // detiene la navegación automática
    const resultado = confirm("¿Está seguro de querer cerrar sesión?");
    if (resultado) {
        // Si confirma, se redirige a la landing page
        alert("Cerrando sesión...");
        window.location.href = cerrarSesion.href;
    }
});

eliminarCuenta.addEventListener("click", function(e) {
    e.preventDefault(); // detiene la navegación automática
    const resultado = confirm("¿Está seguro de eliminar su cuenta?");
    if (resultado) {
        // Si confirma, se redirige a la landing page
        alert("Eliminando cuenta...");
        window.location.href = eliminarCuenta.href;
    }
});

eliminarChat.addEventListener("click", function(e) {
    e.preventDefault();
    const resultado = confirm("¿Desea eliminar este chat de forma permanente?");
    if (resultado) {
        alert("El chat se elimino correctamente");
        window.location.href = eliminarChat.href;
    }
});


suscripcionPlus.addEventListener("click", function(e) {
    e.preventDefault();
    const resultado = confirm("Se le aplicara una tarifa mensual de 5 dolares por suscribirse a este plan.\n¿Desea suscribirse?");
    if (resultado) {
        alert("Bienvenido al lado PLUS");
        window.location.href = suscripcionPlus.href;
    }
});

suscripcionPro.addEventListener("click", function(e) {
    e.preventDefault();
    const resultado = confirm("Se le aplicara una tarifa mensual de 10 dolares por suscribirse a este plan.\n¿Desea suscribirse?");
    if (resultado) {
        alert("Bienvenido al lado PRO");
        window.location.href = suscripcionPro.href;
    }
});


reportarProblema.addEventListener("click", function(e) {
    e.preventDefault();
    const respuesta = prompt("Informanos sobre tu problema:");

    if(respuesta !== null) {
        alert("Gracias por reportar el problema");
        window.location.href = reportarProblema.href;
    }
});

function guardarPerfil(event) {

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const contrasenia = document.getElementById("contrasenia").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validación
    if (!nombre || !correo || !numero || !contrasenia || !descripcion) {
        alert("Por favor completa todos los campos antes de continuar.");
        return false;  // No enviar
    }

    // Si todo está correcto
    alert("Cambios guardados con éxito.");

    return true; // Permite enviar el formulario SI tiene action
}