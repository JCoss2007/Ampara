// foroanonimo.js

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
       MODAL: RESPONDER
    =========================== */
  const responderBtns = document.querySelectorAll(".btn-responder");
  const replyOverlay = document.getElementById("replyOverlay");
  const replyTextarea = document.getElementById("replyTextarea");
  const replyCounter = document.getElementById("replyCharCount");
  const replyCancel = document.getElementById("replyCancel");
  const replySend = document.getElementById("replySend");

  if (
    replyOverlay &&
    replyTextarea &&
    replyCounter &&
    replyCancel &&
    replySend
  ) {
    // Abrir modal responder
    responderBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        replyOverlay.classList.add("is-visible");
        replyTextarea.value = "";
        replyCounter.textContent = "0/200";
        replyTextarea.focus();
      });
    });

    // Cerrar con cancelar
    replyCancel.addEventListener("click", () => {
      replyOverlay.classList.remove("is-visible");
    });

    // Cerrar clic fuera de la tarjeta
    replyOverlay.addEventListener("click", (e) => {
      if (e.target === replyOverlay) {
        replyOverlay.classList.remove("is-visible");
      }
    });

    // Contador de caracteres
    replyTextarea.addEventListener("input", () => {
      replyCounter.textContent = `${replyTextarea.value.length}/200`;
    });

    // Enviar respuesta (por ahora solo cierra)
    replySend.addEventListener("click", () => {
      // Aquí podrías enviar al servidor
      replyOverlay.classList.remove("is-visible");
    });
  }

  /* ==========================
       MODAL: REPORTAR
    =========================== */
  const reportBtns = document.querySelectorAll(".btn-reportar");
  const reportOverlay = document.getElementById("reportOverlay");
  const reportTextarea = document.getElementById("reportTextarea");
  const reportCounter = document.getElementById("reportCharCount");
  const reportCancel = document.getElementById("reportCancel");
  const reportSend = document.getElementById("reportSend");

  if (
    reportOverlay &&
    reportTextarea &&
    reportCounter &&
    reportCancel &&
    reportSend
  ) {
    // Abrir modal reportar
    reportBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        reportOverlay.classList.add("is-visible");
        reportTextarea.value = "";
        reportCounter.textContent = "0/200";
        reportTextarea.focus();
      });
    });

    // Cerrar con cancelar
    reportCancel.addEventListener("click", () => {
      reportOverlay.classList.remove("is-visible");
    });

    // Cerrar clic fuera de la tarjeta
    reportOverlay.addEventListener("click", (e) => {
      if (e.target === reportOverlay) {
        reportOverlay.classList.remove("is-visible");
      }
    });

    // Contador de caracteres
    reportTextarea.addEventListener("input", () => {
      reportCounter.textContent = `${reportTextarea.value.length}/200`;
    });

    // Enviar reporte (por ahora solo cierra)
    reportSend.addEventListener("click", () => {
      // Aquí podrías hacer fetch() para guardar el reporte
      reportOverlay.classList.remove("is-visible");
    });
  }
});
