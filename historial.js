// Conversaciones simuladas (corregidas)
const conversations = {
  conv_001: {
    with: "Psicóloga Ana Ruiz",
    date: "12 Feb 2025 · 16:32",
    messages: [
      { from: "them", text: "Hola Fabiana, ¿cómo te sientes hoy?" },
      { from: "me", text: "He estado con mucho nerviosismo y ansiedad." },
      { from: "them", text: "Gracias por compartirlo ❤️ ¿Cuándo empezó?" }
    ]
  },

  conv_002: {
    with: "Psicólogo Luis Gómez",
    date: "03 Feb 2025 · 10:12",
    messages: [
      { from: "them", text: "Hola, ¿cómo te puedo ayudar?" },
      { from: "me", text: "Tuve un episodio de estrés..." }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("chatModal");
  const messagesBox = document.getElementById("messagesBox");
  const closeBtn = document.getElementById("closeChat");

  // Mover modal al body por si acaso (evita stacking context del footer)
  if (modal && modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  // Abrir modal con conversación
  function openModalWith(conv) {
    messagesBox.innerHTML = "";

    // título de la conversación (opcional mostrar en header)
    const titleEl = document.getElementById("chatTitle");
    if (titleEl) titleEl.textContent = conv.with;

    conv.messages.forEach((m) => {
      const bubble = document.createElement("div");
      bubble.classList.add("chat-msg", m.from);
      bubble.textContent = m.text;
      messagesBox.appendChild(bubble);
    });

    // scroll al final
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // abrir modal y bloquear scroll del fondo
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  // listeners para "Ver conversación"
  document.querySelectorAll(".msg-open").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const convId = btn.dataset.conv;
      if (!convId) {
        console.warn("No se encontró data-conv en .msg-open", btn);
        return;
      }
      const conv = conversations[convId];
      if (!conv) {
        console.warn("Conversación no encontrada:", convId);
        return;
      }
      openModalWith(conv);
    });
  });

  // Cerrar con botón
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Cerrar al clicar overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  console.log("historial.js ready — conversaciones:", Object.keys(conversations));
});

