document.addEventListener("DOMContentLoaded", () => {
    // 1. Datos del directorio
    const lines = [
      {
        id: 1,
        name: "Línea 100",
        description: "Línea gratuita del MIMP para orientación y soporte en casos de violencia familiar y sexual.",
        number: "100",
        contactType: "tel", 
        contactLink: "100",
        icon: "linea_100.png",
      },
      {
        id: 2,
        name: "Chat 105",
        description: "Chat confidencial para reportar emergencias si no puedes hablar por teléfono.",
        number: "105",
        contactType: "chat", 
        contactLink: "chatanonimo.html", 
        icon: "105.png",
      },
      {
        id: 3,
        name: "Policía Nacional",
        description: "Central de emergencias para denuncias inmediatas.",
        number: "101",
        contactType: "tel",
        contactLink: "101",
        icon: "policia.png",
      },
      {
        id: 4,
        name: "Atención a la Mujer",
        description: "Centros de Emergencia Mujer (CEM) para asesoría legal y psicológica.",
        number: "102",
        contactType: "tel",
        contactLink: "102",
        icon: "atencion_mujer"
      },
    ];
  
    const directoryList = document.getElementById("directory-list");
    let favorites = loadFavorites();
  
    // 2. Cargar favoritos
    function loadFavorites() {
      const stored = localStorage.getItem("amparaDirectoryFavorites");
      return stored ? JSON.parse(stored) : [];
    }
  
    // 3. Guardar favoritos
    function saveFavorites(favs) {
      localStorage.setItem("amparaDirectoryFavorites", JSON.stringify(favs));
    }
  
    // 4. Toggle de favoritos
    window.toggleFavorite = function (id) {
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(id);
      }
      saveFavorites(favorites);
      filterDirectory();
    };
  
    // 5. Crear HTML de la tarjeta (CON BOTONES DE ACCIÓN)
    function createCardElement(line, isFavorite) {
      const card = document.createElement("div");
      card.className = "directory-card";
      card.dataset.lineId = line.id;
  
      const favoriteIcon = isFavorite ? "favoritos_on.png" : "favoritos_off.png";
      const favoriteText = isFavorite ? "Guardado" : "Favoritos";
      const favoriteClass = isFavorite ? "favorite-btn active" : "favorite-btn";
      
      // Lógica para decidir qué botón mostrar
      let actionButtonHtml = '';
      
      if (line.contactType === 'tel') {
          actionButtonHtml = `
            <a href="tel:${line.contactLink}" class="call-btn">
               Llamar
            </a>`;
      } else if (line.contactType === 'chat') {
          // El botón de chat tiene la clase extra 'chat-btn' para ser rosado
          actionButtonHtml = `
            <a href="${line.contactLink}" class="call-btn chat-btn">
               Chatear
            </a>`;
      }
  
      card.innerHTML = `
          <div class="card-avatar">
              <img src="icons/${line.icon || "organizacion.png"}" alt="Icono" onerror="this.src='icons/organizacion.png'">
          </div>
          <div class="card-details">
              <h3 claseds="line-name">${line.name}</h3>
              <p class="line-description">${line.description}</p>
              <p class="line-number">Número: <strong>${line.number}</strong></p>
          </div>
          <div class="card-actions">
              <button class="${favoriteClass}">
                  <img src="icons/${favoriteIcon}" alt="Favoritos">
                  <span>${favoriteText}</span>
              </button>
              
              ${actionButtonHtml}
          </div>
      `;
      return card;
    }
  
    // 6. Filtro
    window.filterDirectory = function () {
      const searchInput = document.getElementById("main-search-input");
      if(!searchInput) return;

      const searchText = searchInput.value.toLowerCase();
      const showFavs = document.getElementById("show-favorites").checked;
  
      directoryList.innerHTML = "";
  
      lines.forEach((line) => {
        const lineId = line.id;
        const isFavorite = favorites.includes(lineId);
  
        const matchesSearch =
          line.name.toLowerCase().includes(searchText) ||
          line.description.toLowerCase().includes(searchText) ||
          line.number.includes(searchText);
  
        const matchesFavFilter = !showFavs || (showFavs && isFavorite);
  
        if (matchesSearch && matchesFavFilter) {
          const card = createCardElement(line, isFavorite);
          directoryList.appendChild(card);
        }
      });
  
      // Reasignar eventos a los botones favoritos
      document.querySelectorAll(".favorite-btn").forEach((btn) => {
        btn.onclick = (e) => {
          e.preventDefault();
          toggleFavorite(parseInt(btn.closest(".directory-card").dataset.lineId));
        };
      });
    };
  
    // 7. Listeners
    const searchInput = document.getElementById("main-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", filterDirectory);
    }
  
    const favoritesCheckbox = document.getElementById("show-favorites");
    if (favoritesCheckbox) {
      favoritesCheckbox.addEventListener("change", filterDirectory);
    }
  
    // Inicializar
    filterDirectory();
  });