

const cerrarSesion = document.getElementById("boton-cerrar-sesion");

const eliminarCuenta = document.getElementById("boton-eliminar-cuenta")

const reportarProblema = document.getElementById("boton-reportar-problema");

const eliminarContacto = document.getElementById("boton-eliminar-contacto")

const guardarContacto = document.getElementById("boton-guardar-contacto")

const guardarPerfil = document.getElementById("boton-guardar-perfil")

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

eliminarContacto.addEventListener("click", function(e) {
    e.preventDefault(); // detiene la navegación automática
    const resultado = confirm("¿Está seguro de eliminar este contacto?");
    if (resultado) {
        // Si confirma, se redirige a la landing page
        alert("Este contacto se ha eliminado con éxito!");
        window.location.href = "contactoEmergencia.html";
    }
});

guardarContacto.addEventListener("click", function(e) {
    e.preventDefault(); // detiene la navegación automática
    const resultado = confirm("¿Está seguro de guardar los cambios?");
    if (resultado) {
        // Si confirma, se redirige a la landing page
        alert("Datos guardados");
        window.location.href = "contactoEmergencia.html";
    }
});

guardarPerfil.addEventListener("click", function(e) {
    e.preventDefault(); // detiene la navegación automática
    const resultado = confirm("¿Está seguro de guardar los cambios?");
    if (resultado) {
        // Si confirma, se redirige a la landing page
        alert("Datos guardados");
        window.location.href = guardarPerfil.href;
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