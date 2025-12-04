const textarea = document.getElementById("reportText");
const btnCancel = document.querySelector(".btn-cancell");
const btnSend = document.querySelector(".btn-sendReport");
const messageBox = document.getElementById("reportMessage");

// Función para mostrar mensajes
function showMessage(text, color = "#482983") {
    messageBox.textContent = text;
    messageBox.style.color = color;
    messageBox.classList.add("show");

    // Ocultar después de 2.5s
    setTimeout(() => {
        messageBox.classList.remove("show");
        messageBox.textContent = "";
    }, 2500);
}

// Enviar reporte
btnSend.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (!text) {
        showMessage("Por favor, escribe un reporte antes de enviar.", "red");
        return;
    }

    textarea.value = "";
    showMessage("Reporte enviado exitosamente 🎉");
});

// Cancelar reporte
btnCancel.addEventListener("click", () => {
    textarea.value = "";
    showMessage("Reporte cancelado exitosamente ❌", "red");
});

