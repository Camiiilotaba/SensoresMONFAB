<?php
require_once "./Models/Conexion.php";
require_once "./Models/RespuestaJson.php";

$conexion = new Conexion();
$conex = $conexion->getConnection();


header('Content-Type: application/json');


function obtenerValor($campo, $valorActual)
{
    return !empty($_POST[$campo]) ? $_POST[$campo] : $valorActual;
}

try {
    // Comprobamos si se ha recibido el id por el get
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);

        // Primero buscamos por id el elemento
        $sql_get = "SELECT * FROM elementos WHERE id = :id";
        $statement_get = $conex->prepare($sql_get);
        $statement_get->bindParam(':id', $id, PDO::PARAM_INT);
        $statement_get->execute();
        $elemento = $statement_get->fetch(PDO::FETCH_ASSOC);

        
        if ($elemento) {
            
            $sql_update = "UPDATE elementos SET nombre = :nombre, descripcion = :descripcion, nserie = :nserie, estado = :estado, prioridad = :prioridad WHERE id = :id";
            $statement_update = $conex->prepare($sql_update);

            // Usamos la funcion obtenerValor para asignar los valores correspondientes
            $statement_update->bindValue(':nombre', obtenerValor('nombre', $elemento['nombre']));
            $statement_update->bindValue(':descripcion', obtenerValor('descripcion', $elemento['descripcion']));
            $statement_update->bindValue(':nserie', obtenerValor('nserie', $elemento['nserie']));
            $statement_update->bindValue(':estado', obtenerValor('estado', $elemento['estado']));
            $statement_update->bindValue(':prioridad', obtenerValor('prioridad', $elemento['prioridad']));
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
    } else {
        RespuestaJson::sendResponse(false, "No se recibió el parámetro 'id'");
    }
} catch (PDOException $e) {
    RespuestaJson::sendResponse(false, "Error en la operación: " . $e->getMessage());
} finally {
    $conex = null;
}
