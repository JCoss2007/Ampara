document.addEventListener("DOMContentLoaded", () => {
  const deleteLink = document.querySelector(".btn-delete a");
  const deleteBtnDiv = document.querySelector(".btn-delete");
  const messageBox = document.getElementById("deleteMessage");

  if (!messageBox) {
    console.warn(
      'deleteMessage div no encontrado. Agrega <div id="deleteMessage" class="delete-message"></div> antes de tus scripts.'
    );
  }

  // El target efectivo (si existe el <a> dentro) o el div
  const target = deleteLink || deleteBtnDiv;
  if (!target) {
    console.warn(
      "No se encontró .btn-delete ni .btn-delete a. Revisa el HTML."
    );
  } else {
    target.addEventListener("click", (e) => {
      // evita comportamiento por defecto del <a>
      e.preventDefault();

      // muestra mensaje si existe
      if (messageBox) {
        messageBox.textContent = "Cuenta eliminada correctamente";
        messageBox.classList.add("show");
      } else {
        // fallback: alert si no existe el contenedor
        alert("Cuenta eliminada correctamente");
      }

      // redirige después de 1.5s (ajusta tiempo si quieres)
      setTimeout(() => {
        window.location.replace("index.html");
      }, 1500);
    });
  }

  // --- CANCELAR: Redirigir al perfil ---
  const cancelLink = document.querySelector(".btn-cancell-delete a");
  const cancelDiv = document.querySelector(".btn-cancell-delete");
  const cancelTarget = cancelLink || cancelDiv;

  if (!cancelTarget) {
    console.warn(
      "No se encontró .btn-cancell-delete ni .btn-cancell-delete a. Revisa el HTML."
    );
  } else {
    cancelTarget.addEventListener("click", (e) => {
      e.preventDefault();
      // (opcional) mostrar mensaje breve antes de redirigir:
      // if (messageBox) { messageBox.textContent = 'Acción cancelada'; messageBox.classList.add('show'); }
      window.location.href = "mi_cuenta.html";
    });
  }
});
