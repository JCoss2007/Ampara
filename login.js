// Mini base de datos simulada (demo para Ampara)
const usuarios = [
  {
    email: "usuario@ampara.com",
    password: "usuario123",
    rol: "usuario", // usuaria normal
  },
  {
    email: "especialista@ampara.com",
    password: "especialista123",
    rol: "especialista", // psicóloga / especialista
  },
];

// Lógica de login
function validarLogin(event) {
  if (event) event.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Buscar usuario
  const usuarioEncontrado = usuarios.find(
    (u) =>
      u.email.toLowerCase() === emailInput.toLowerCase() &&
      u.password === passwordInput
  );

  // Si no existe:
  if (!usuarioEncontrado) {
    alert("Correo o contraseña incorrectos. Por favor verifica tus datos.");
    return false;
  }

  // Redirección según rol
  if (usuarioEncontrado.rol === "usuario") {
    alert("Bienvenida a Ampara 💜");
    window.location.href = "ampara.html";
  } else if (usuarioEncontrado.rol === "especialista") {
    alert("Bienvenida especialista 💼");
    window.location.href = "psicologo.html";
  } else {
    alert("Rol desconocido. Contacte a soporte.");
  }

  return false;
}

// ==========================
//  RECUPERAR CONTRASEÑA
//  (recuperar.html)
// ==========================
function enviarEnlace(event) {
  if (event) event.preventDefault();

  const inputCorreo = document.getElementById("correo-recuperar");
  if (!inputCorreo) {
    console.warn(
      'No se encontró el input con id "correo-recuperar" en esta página.'
    );
    return;
  }

  const correo = inputCorreo.value.trim().toLowerCase();

  if (!correo) {
    alert("Por favor, ingresa un correo electrónico.");
    inputCorreo.focus();
    return;
  }

  // Validar si el correo existe en la "BD"
  const existe = usuarios.some((u) => u.email.toLowerCase() === correo);

  if (!existe) {
    alert("El correo ingresado no está registrado en Ampara.");
    return;
  }

  // Si existe, mostramos mensaje de éxito
  alert(
    "Si el correo está registrado, te hemos enviado un enlace para restablecer tu contraseña."
  );

  // Limpia el campo
  inputCorreo.value = "";

  window.location.href = "nueva_contraseña.html"; // o "exito-recuperacion.html"
}

function guardarNuevaContrasena(event) {
  event.preventDefault(); // no recargues la página

  const nueva = document.getElementById("new-password").value.trim();
  const confirmar = document.getElementById("confirm-password").value.trim();
  const errorText = document.getElementById("password-error");

  // limpiar mensaje previo
  errorText.textContent = "";

  // mínimo 8 caracteres (puedes quitar este bloque si no lo quieres)
  if (nueva.length < 8) {
    errorText.textContent = "La contraseña debe tener al menos 8 caracteres.";
    return;
  }

  // validar que sean IGUALES
  if (nueva !== confirmar) {
    errorText.textContent = "Las contraseñas no coinciden.";
    return;
  }

  // si todo ok 👉 mensaje y redirección al login
  alert("Tu contraseña ha sido actualizada exitosamente 💜");
  window.location.href = "login.html";
}
