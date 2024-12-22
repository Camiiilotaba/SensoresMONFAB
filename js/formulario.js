document.getElementById('formulario-sensor').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Obtenemos los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const numeroSerie = document.getElementById('numeroSerie').value;
    const estado = document.getElementById('estado').checked ? 'Activo' : 'Inactivo';
    const prioridad = document.querySelector('input[name="prioridad"]:checked') ? document.querySelector('input[name="prioridad"]:checked').value : '';

    // Mostrar alerta de confirmación antes de enviar
    Swal.fire({
        title: '¿Estás seguro de que quieres crear este elemento?',
        text: "Una vez enviado, se guardarán los datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, enviamos los datos al servidor
            fetch('ws/createElement.php', {
                method: 'POST',
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    numeroSerie,
                    estado,
                    prioridad
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire(
                        'Exito!',
                        'El elemento ha sido creado correctamente',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error',
                        'Hubo un problema al crear el elemento',
                        'error'
                    );
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error',
                    'Hubo un problema con la conexión al servidor',
                    'error'
                );
            });
        }
    });
});
