document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".btn-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".btn-close");

  if (!burger || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    burger.setAttribute("aria-expanded", String(isOpen));
  };

  burger.addEventListener("click", toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener("click", toggleMenu);
  }
});
// ======================================
//     ATAJO SOS – ACTIVAR CON CTRL + S
// ======================================

document.addEventListener("keydown", function (e) {

  // 🚨 1. Seguridad: NO activar en pantallas del psicólogo
  const ruta = window.location.pathname.toLowerCase();
  if (ruta.includes("psicologo")) return; 
  if (ruta.includes("especialista")) return; 
  if (ruta.includes("panel")) return;

  // 🚨 2. Detectar Ctrl + S
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault(); // Evita "Guardar página"

    // 3. Buscar botón SOS en esta pantalla
    const btnSOS = document.querySelector(".btn-sos, .nav-sos-mobile");

    if (btnSOS) {
      // Guardar la página donde estaba el usuario
      sessionStorage.setItem("origenSOS", window.location.pathname);

      // Activar SOS
      btnSOS.click();
    }
  }
});
