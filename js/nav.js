document.addEventListener("DOMContentLoaded", async () => {
  const scriptPath = document.currentScript.src; // Obtiene la URL completa de nav.js
  const scriptDir = scriptPath.substring(0, scriptPath.lastIndexOf('/')); // Obtiene el directorio base
  
  // Construir la ruta absoluta 
  const RUTA_ARCHIVO = `${scriptDir}/../nav.html`; 

  // Añade el nav bar
  const navbar = document.createElement("div");
  navbar.id = "navbar-JS";
  document.body.insertBefore(navbar, document.body.firstChild);

  try {
    // Solicitud para obtener el contenido de nav.html
    const response = await fetch(RUTA_ARCHIVO);

    if (!response.ok) {
      throw new Error(
        `Error al cargar ${RUTA_ARCHIVO}: ${response.statusText}`
      );
    }

    // Añade el navbar al DOM
    const html = await response.text();
    navbar.innerHTML = html;

    // Resalta la ruta actual
    mostrarRutaActual();
  } catch (error) {
    console.error("Error al cargar la barra de navegación:", error);
  }
});

// Función para resaltar la ruta actual en el navbar
function mostrarRutaActual() {
  const rutaActual = window.location.pathname.split("/").pop(); // Nombre del archivo actual
  const enlaces = document.querySelectorAll("#navbar-JS a"); // Enlaces dentro del navbar

  for (let enlace of enlaces) {
    if (enlace.getAttribute("href") === rutaActual) {
      enlace.classList.add("activo"); // Añadir clase activo si coincide la ruta
    }
  }
}
