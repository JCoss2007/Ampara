const instituciones = [
  {
    nombre: "Centro de Apoyo Mujer Segura",
    categoria: "Apoyo Psicológico",
    distrito: "Miraflores",
    direccion: "Av. Larco 123",
    telefono: "01 456 7890",
    descripcion:
      "Brinda orientación psicológica gratuita para mujeres en situación de riesgo.",
    tag: "psicologico",
  },
  {
    nombre: "Casa Refugio Esperanza",
    categoria: "Refugios",
    distrito: "San Juan de Lurigancho",
    direccion: "Dirección protegida",
    telefono: "0800 12345",
    descripcion:
      "Refugio temporal para mujeres y niños en situación de violencia.",
    tag: "refugio",
  },
  {
    nombre: "Defensa Legal Mujer",
    categoria: "Asesoría Legal",
    distrito: "Cercado de Lima",
    direccion: "Jr. Lampa 450",
    telefono: "01 334 5566",
    descripcion: "Asesoría legal gratuita en casos de violencia y denuncias.",
    tag: "legal",
  },
  {
    nombre: "Centro Integral Warmi",
    categoria: "Apoyo Psicológico",
    distrito: "Comas",
    direccion: "Av. Universitaria 900",
    telefono: "01 900 2244",
    descripcion: "Terapia psicológica y apoyo emocional para víctimas.",
    tag: "psicologico",
  },
  {
    nombre: "Refugio Ángeles",
    categoria: "Refugios",
    distrito: "Callao",
    direccion: "Ubicación reservada",
    telefono: "0800 77777",
    descripcion: "Refugio seguro para víctimas de violencia severa.",
    tag: "refugio",
  },
  {
    nombre: "Legal Perú Mujer",
    categoria: "Asesoría Legal",
    distrito: "Barranco",
    direccion: "Av. Bolognesi 520",
    telefono: "01 777 9922",
    descripcion:
      "Apoyo en denuncias, medidas de protección y orientación legal.",
    tag: "legal",
  },
];

let elementosMostrados = 0;
const cantidadPorCarga = 3;
let categoriaSeleccionada = "Todos";

const lista = document.getElementById("institucionesList");
const btnCargarMas = document.getElementById("cargarMas");
const buscador = document.querySelector(".search-input");
const tabs = document.querySelectorAll(".tab");

function crearCardHTML(data) {
  let tagClass = "";
  if (data.tag === "psicologico") tagClass = "tag-psicologico";
  if (data.tag === "refugio") tagClass = "tag-refugio";
  if (data.tag === "legal") tagClass = "tag-legal";

  return `
        <div class="institucion-card">
          <div class="card-content">
            <span class="tag ${tagClass}">${data.categoria}</span>
            <h3>${data.nombre}</h3>
            <p><strong>Distrito:</strong> ${data.distrito}</p>
            <p><strong>Dirección:</strong> ${data.direccion}</p>
            <p><strong>Teléfono:</strong> ${data.telefono}</p>
            <p class="description">${data.descripcion}</p>
          </div>
  
          <div class="card-actions">
            <a href="#" class="action-link">Ver más</a>
            <a href="#" class="action-link">Contactar</a>
          </div>
        </div>
      `;
}

function obtenerFiltrados() {
  const texto = buscador.value.toLowerCase();

  return instituciones.filter((inst) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      inst.categoria === categoriaSeleccionada;
    const coincideBusqueda =
      inst.nombre.toLowerCase().includes(texto) ||
      inst.distrito.toLowerCase().includes(texto) ||
      inst.descripcion.toLowerCase().includes(texto);

    return coincideCategoria && coincideBusqueda;
  });
}

function cargarInstituciones() {
  const filtrados = obtenerFiltrados();

  const fin = elementosMostrados + cantidadPorCarga;
  const mostrarAhora = filtrados.slice(elementosMostrados, fin);

  mostrarAhora.forEach((inst) => {
    lista.innerHTML += crearCardHTML(inst);
  });

  elementosMostrados = fin;

  btnCargarMas.style.display =
    elementosMostrados >= filtrados.length ? "none" : "block";
}

function reiniciarYMostrar() {
  elementosMostrados = 0;
  lista.innerHTML = "";
  cargarInstituciones();
}

btnCargarMas.addEventListener("click", cargarInstituciones);
buscador.addEventListener("input", reiniciarYMostrar);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    categoriaSeleccionada = tab.textContent.trim();
    reiniciarYMostrar();
  });
});

reiniciarYMostrar();
