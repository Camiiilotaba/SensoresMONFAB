const elementos = [
    { nombre: 'Sensor de temperatura', descripcion: 'Mide la temperatura ambiente', numeroSerie: '001', estado: 'Activo', prioridad: 'Alta' },
    { nombre: 'Sensor de humedad', descripcion: 'Mide la humedad relativa', numeroSerie: '002', estado: 'Inactivo', prioridad: 'Media' },
];

window.onload = () => {
    cargarTabla();  
};


function cargarTabla() {
    const tbody = document.getElementById('tabla-sensores').querySelector('tbody');
    tbody.innerHTML = '';  // Limpiar cualquier contenido anterior
    elementos.forEach((elemento, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>
                <button onclick="eliminarFila(this)">X</button>
                <button onclick="editarTabla(${index})">EDITAR</button>
            </td>
            <td>${elemento.nombre}</td>
            <td>${elemento.descripcion}</td>
            <td>${elemento.numeroSerie}</td>
            <td>${elemento.estado}</td>
            <td>${elemento.prioridad}</td>
        `;
    });
}


function eliminarFila(button) {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
    // Obtener la fila mas cercana al botón pulsado, en este caso, la fila que contiene el botón
    const row = button.closest('tr');
    row.remove();
    }
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


function editarTabla(index) {
    fetch('../formulario.html')
        .then(response => response.text())
        .then(html => {
            const formContainer = document.createElement('div');
            formContainer.id = 'formulario-edicion';
            formContainer.innerHTML = html;

            // Carga los valores del formulario ya existente, y los prerellena
            const elemento = elementos[index];
            formContainer.querySelector('#nombre').value = elemento.nombre;
            formContainer.querySelector('#descripcion').value = elemento.descripcion;
            formContainer.querySelector('#numeroSerie').value = elemento.numeroSerie;
            formContainer.querySelector('#estado').checked = elemento.estado === 'Activo';
            formContainer.querySelector(`#${elemento.prioridad.toLowerCase()}`).checked = true;

            // Elimina el boton de enviar y agrega los botones de guardar y cancelar
            formContainer.querySelector('input[type="submit"]').remove();
            cargarBotones(formContainer, index);

            document.getElementById('formulario-container').innerHTML = ''; // vacia el contenedor
            document.getElementById('formulario-container').appendChild(formContainer);
        })
        .catch(error => console.error('Error al cargar el formulario:', error));
}


function cargarBotones(formContainer, index) {
    const guardarBoton = document.createElement('button');
    guardarBoton.textContent = 'Guardar';
    guardarBoton.onclick = () => guardarEdicion(index, formContainer);
    formContainer.querySelector('form').appendChild(guardarBoton);

    const cancelarBoton = document.createElement('button');
    cancelarBoton.textContent = 'Cancelar';
    cancelarBoton.onclick = cancelarEdicion;
    formContainer.querySelector('form').appendChild(cancelarBoton);
}


function guardarEdicion(index, formContainer) {
    const nombre = formContainer.querySelector('#nombre').value;
    const descripcion = formContainer.querySelector('#descripcion').value;
    const numeroSerie = formContainer.querySelector('#numeroSerie').value;
    const estado = formContainer.querySelector('#estado').checked ? 'Activo' : 'Inactivo';
    const prioridad = formContainer.querySelector('input[name="prioridad"]:checked').value;

/* 
    if (!nombre || !descripcion || !numeroSerie) {
        alert('Todos los campos son obligatorios');
        return;
    }
    
     Iba a añadir estas validaciones, el problema esque al saltar el error por no tener los formularios rellenados saltaba un error 405 y yo lo que queria aqui es que
     al saltar el alert pudiera corregir el error. Pero no que me saltara a una pagina de erro 405

*/

    // Actualiza la lista
    elementos[index] = { nombre, descripcion, numeroSerie, estado, prioridad };
    // Recarga la tabla 
    cargarTabla();
    // Cierra el form
    cancelarEdicion();
}


function cancelarEdicion() {
    const form = document.getElementById('formulario-edicion');
    if (form) {
        form.remove();
    }
}

