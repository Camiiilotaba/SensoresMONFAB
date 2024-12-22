let elementos = [];

window.onload = () => {
    cargarTabla();
};

function cargarTabla() {
    const tbody = document.getElementById('tabla-sensores').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar cualquier contenido anterior

    fetch('./ws/getElement.php')
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                elementos = responseData.data;  // Guardamos los datos obtenidos en el array

                elementos.forEach((elemento) => {
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td>
                            <button onclick="eliminarFila(this, ${elemento.id})">X</button> <!-- Botón de eliminar -->
                            <button onclick="editarTabla(${elemento.id})">EDITAR</button> <!-- Botón de editar -->
                        </td>
                        <td>${elemento.nombre}</td>
                        <td>${elemento.descripcion}</td>
                        <td>${elemento.nserie}</td>
                        <td>${elemento.estado}</td>
                        <td>${elemento.prioridad}</td>
                    `;
                });
            } else {
                Swal.fire(
                    'Error!',
                    responseData.message || 'Hubo un problema al cargar los elementos',
                    'error'
                );
            }
        })
        .catch(error => {
            Swal.fire(
                'Error!',
                'Hubo un problema al cargar los elementos',
                'error'
            );
            console.error('Error al cargar los elementos:', error);
        });
}

// Eliminar un elemento
function eliminarFila(button, idElemento) {
    Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este elemento?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`./ws/deleteElement.php?id=${idElemento}`, {
                method: 'GET'  
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                   
                    Swal.fire(
                        'Eliminado!',
                        'El elemento ha sido eliminado correctamente',
                        'success'
                    );
                    button.closest('tr').remove(); 
                } else {
                    Swal.fire(
                        'Error!',
                        data.message || 'Hubo un problema al eliminar el elemento de la base de datos',
                        'error'
                    );
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al conectar con el servidor',
                    'error'
                );
                console.error('Error al eliminar el elemento:', error);
            });
        }
    });
}



// Editar un elemento
function editarTabla(idElemento) {
    // Buscar el elemento a editar por su id desde el array de 'elementos'
    const elemento = elementos.find(e => e.id === idElemento);

    if (elemento) {
        const formContainer = document.createElement('div');
        formContainer.id = 'formulario-edicion';
        
        formContainer.innerHTML = `
            <form id="form-editar">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" value="${elemento.nombre}" required />
                <br>
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" value="${elemento.descripcion}" required />
                <br>
                <label for="numeroSerie">Número de Serie:</label>
                <input type="text" id="numeroSerie" value="${elemento.nserie}" required />
                <br>
                <label for="estado">Estado:</label>
                <input type="checkbox" id="estado" ${elemento.estado === 'Activo' ? 'checked' : ''} />
                <br>
                <label>Prioridad:</label>
                <input type="radio" name="prioridad" value="Alta" ${elemento.prioridad === 'Alta' ? 'checked' : ''}> Alta
                <input type="radio" name="prioridad" value="Media" ${elemento.prioridad === 'Media' ? 'checked' : ''}> Media
                <input type="radio" name="prioridad" value="Baja" ${elemento.prioridad === 'Baja' ? 'checked' : ''}> Baja
                <br>
            </form>
        `;

        cargarBotones(formContainer, idElemento);

        // Asegúrate de que el contenedor de formulario exista y agregar el formulario
        const formularioContainer = document.getElementById('formulario-container');
        if (formularioContainer) {
            formularioContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar el formulario
            formularioContainer.appendChild(formContainer);
        } else {
            console.error("No se encontró el contenedor 'formulario-container' en el HTML.");
        }
    } else {
        console.error('Elemento no encontrado para editar');
    }
}

// Función para agregar los botones de guardar y cancelar
function cargarBotones(formContainer, idElemento) {
    const guardarBoton = document.createElement('button');
    guardarBoton.textContent = 'Guardar';
    guardarBoton.type = 'button';  
    guardarBoton.onclick = (event) => guardarEdicion(idElemento, formContainer, event); 
    formContainer.querySelector('form').appendChild(guardarBoton);

    const cancelarBoton = document.createElement('button');
    cancelarBoton.textContent = 'Cancelar';
    cancelarBoton.onclick = cancelarEdicion;
    formContainer.querySelector('form').appendChild(cancelarBoton);
}

function guardarEdicion(idElemento, formContainer, event) {
    event.preventDefault();  

    // Obtener los valores del formulario
    const nombre = formContainer.querySelector('#nombre').value;
    const descripcion = formContainer.querySelector('#descripcion').value;
    const numeroSerie = formContainer.querySelector('#numeroSerie').value;
    const estado = formContainer.querySelector('#estado').checked ? 'Activo' : 'Inactivo';
    const prioridad = formContainer.querySelector('input[name="prioridad"]:checked')?.value;  // Asegurarse de que haya una prioridad seleccionada

    // Validación previa para asegurarse de que todos los campos estén completos
    if (!nombre || !descripcion || !numeroSerie || !prioridad) {
        Swal.fire(
            'Error!',
            'Por favor, rellene todos los campos antes de guardar',
            'error'
        );
        return;
    }

    Swal.fire({
        title: '¿Estás seguro de que quieres guardar los cambios?',
        text: "Esta acción actualizará los datos del elemento",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const queryParams = new URLSearchParams({
                id: idElemento,
                nombre,
                descripcion,
                numeroSerie,
                estado,
                prioridad
            }).toString(); // Convierte los datos en una cadena de consulta

            fetch(`./ws/modifyElements.php?${queryParams}`, {
                method: 'GET',  
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire(
                        '¡Éxito!',
                        'El elemento ha sido modificado correctamente',
                        'success'
                    );
                    cargarTabla();  
                    cancelarEdicion();  
                } else {
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al guardar los cambios',
                        'error'
                    );
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al conectar con el servidor',
                    'error'
                );
                console.error('Error al modificar el elemento:', error);
            });
        } else {
            cancelarEdicion();  
        }
    });
}


// Cancelar la edición
function cancelarEdicion() {
    const form = document.getElementById('formulario-edicion');
    if (form) {
        form.remove();
    }
}
