
const elementos = [
    { nombre: 'Sensor de temperatura', descripcion: 'Mide la temperatura ambiente', numeroSerie: '001', estado: 'Activo', prioridad: 'Alta' },
    { nombre: 'Sensor de humedad', descripcion: 'Mide la humedad relativa', numeroSerie: '002', estado: 'Inactivo', prioridad: 'Media' },
    
];

window.onload = function() {
    const tbody = document.getElementById('tabla-sensores').querySelector('tbody');
    elementos.forEach((elemento, index) => {
        const row = tbody.insertRow();
        //Uso de backticks para intercalar variables en el HTML
        row.innerHTML = `
            <td><button onclick="eliminarFila(this)">X</button></td>
            <td>${elemento.nombre}</td>
            <td>${elemento.descripcion}</td>
            <td>${elemento.numeroSerie}</td>
            <td>${elemento.estado}</td>
            <td>${elemento.prioridad}</td>
        `;
    });
};


function eliminarFila(button) {
    // Obtener la fila mas cercana al botón pulsado, en este caso, la fila que contiene el botón
    const row = button.closest('tr');
    row.remove();
}


// Evento para filtrar la tabla al escribir en el input
function filtrarTabla() {
    const input = document.getElementById('filtro');
    const filter = input.value.toLowerCase();
    const tbody = document.getElementById('tabla-sensores').querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');

    if (filter.length < 3) {
        for (let row of rows) {
            row.style.display = ''; // Mostrar todas las filas
        }
        return;
    }

    for (let row of rows) {
        const nombre = row.cells[1].textContent.toLowerCase();
        const descripcion = row.cells[2].textContent.toLowerCase();
        if (nombre.includes(filter) || descripcion.includes(filter)) {
            row.style.display = ''; // Mostrar fila si hay coincidencia
        } else {
            row.style.display = 'none'; // Ocultar fila si no hay coincidencia
        }
    }
}
