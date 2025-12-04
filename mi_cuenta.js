document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const card = document.getElementById(targetId);

      const isEditing = card.classList.contains("editing");

      if (!isEditing) {
        card.classList.add("editing");
        btn.textContent = "Guardar";
        btn.classList.add("save");
      } else {
        const inputs = card.querySelectorAll(".field-input");
        inputs.forEach((input) => {
          const fieldName = input.dataset.input;
          const textElement = card.querySelector(`[data-field='${fieldName}']`);
          textElement.textContent = input.value;
        });

        card.classList.remove("editing");
        btn.textContent = "Editar";
        btn.classList.remove("save");
      }
    });
  });

  // === Eliminar contacto ===
  const deleteBtn = document.getElementById("btn-delete-contact");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const confirmed = confirm(
        "¿Seguro que quieres eliminar este contacto de emergencia?"
      );
      if (confirmed) {
        // Aquí solo navegamos de vuelta al listado
        // (o podrías mostrar otra pantalla de confirmación)
        window.location.href = "contacto_emergencia.html";
      }
    });
  }
});
