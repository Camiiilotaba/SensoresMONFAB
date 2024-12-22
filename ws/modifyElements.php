<?php
require_once "./Models/Conexion.php";
require_once "./Models/RespuestaJson.php";

$conexion = new Conexion();
$conex = $conexion->getConnection();

header('Content-Type: application/json');

// Verifica si los datos llegaron por GET
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $nombre = $_GET['nombre'];
    $descripcion = $_GET['descripcion'];
    $nserie = $_GET['numeroSerie'];
    $estado = $_GET['estado'];
    $prioridad = $_GET['prioridad'];

    try {
        // Primero buscamos por id el elemento
        $sql_get = "SELECT * FROM elementos WHERE id = :id";
        $statement_get = $conex->prepare($sql_get);
        $statement_get->bindParam(':id', $id, PDO::PARAM_INT);
        $statement_get->execute();
        $elemento = $statement_get->fetch(PDO::FETCH_ASSOC);

        if ($elemento) {
            // Actualiza el elemento con los nuevos datos
            $sql_update = "UPDATE elementos SET nombre = :nombre, descripcion = :descripcion, nserie = :nserie, estado = :estado, prioridad = :prioridad WHERE id = :id";
            $statement_update = $conex->prepare($sql_update);
            $statement_update->bindValue(':nombre', $nombre);
            $statement_update->bindValue(':descripcion', $descripcion);
            $statement_update->bindValue(':nserie', $nserie);
            $statement_update->bindValue(':estado', $estado);
            $statement_update->bindValue(':prioridad', $prioridad);
            $statement_update->bindValue(':id', $id, PDO::PARAM_INT);

            // Ejecuta el update
            if ($statement_update->execute()) {
                RespuestaJson::sendResponse(true, "Elemento actualizado correctamente");
            } else {
                RespuestaJson::sendResponse(false, "No se pudo actualizar el elemento");
            }
        } else {
            RespuestaJson::sendResponse(false, "Elemento no encontrado");
        }
    } catch (PDOException $e) {
        RespuestaJson::sendResponse(false, "Error en la operación: " . $e->getMessage());
    }
} else {
    RespuestaJson::sendResponse(false, "Faltan datos para actualizar el elemento");
}
$conex = null;

