<?php
require_once "./Models/Conexion.php";
require_once "./Models/RespuestaJson.php";

$conexion = new Conexion();
$conex = $conexion->getConnection();

header('Content-Type: application/json');

try {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Esto hace una conversion a entero, para comprobar el id

        //Con esto primero se obtienen los datos antes de eliminarlos
        $sql_get = "SELECT * FROM elementos WHERE id = :id";
        $statement_get = $conex->prepare($sql_get);
        $statement_get->bindParam(':id', $id, PDO::PARAM_INT);
        $statement_get->execute();
        $elemento = $statement_get->fetch(PDO::FETCH_ASSOC);

        if ($elemento) {
            // Si hay algun elemento lo elimina
            $sql_delete = "DELETE FROM elementos WHERE id = :id";
            $statement_delete = $conex->prepare($sql_delete);
            $statement_delete->bindParam(':id', $id, PDO::PARAM_INT);


            if ($statement_delete->execute()) {
                RespuestaJson::sendResponse(true, "Elemento eliminado correctamente", $elemento); // $elemento devuelve los datos del elemento eliminado 
            } else {
                RespuestaJson::sendResponse(false, "No se pudo eliminar el elemento");
            }
        } else {

            RespuestaJson::sendResponse(false, "Elemento no encontrado");
        }
    } else {

        RespuestaJson::sendResponse(false, "No se recibió el parámetro 'id'");
    }
} catch (PDOException $e) {

    RespuestaJson::sendResponse(false, "Error en la operación: " . $e->getMessage());
} finally {

    $conex = null;
}
