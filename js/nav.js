document.addEventListener("DOMContentLoaded", async () => {
  const RUTA_ARCHIVO = "nav.html";

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

    // Añade el navbar al dom
    const html = await response.text();
    navbar.innerHTML = html;

    // Se llama a la funcion para resaltar la ruta actual
    mostrarRutaActual();
  } catch (error) {
    console.error("Error al cargar la barra de navegación:", error);
  }
});

// Función para resaltar la ruta actual en el navbar
function mostrarRutaActual() {
  // Obtiene el nombre del archivo de la ruta actual
  const rutaActual = window.location.pathname.split("/").pop();

  // Selecciona todos los enlaces dentro del navbar con ese id
  const enlaces = document.querySelectorAll("#navbar-JS a");

  // con el for recorre los enlaces del navbar hasta ver uno que sea igual y le añade la clase activo
  for (let enlace of enlaces) {
    if (enlace.getAttribute("href") === rutaActual) {
      enlace.classList.add("activo");
    }
  }
}





