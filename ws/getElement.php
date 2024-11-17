<?php
require_once "./Models/Conexion.php"; 
require_once "./Models/RespuestaJson.php"; 

$conexion = new Conexion();
$conex = $conexion->getConnection();


header('Content-Type: application/json');

try {
    // Esto comprueba si se ha recibido el id por la url con Get
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Esto hace una conversion a entero, para comprobar el id

        // Esta consulta lo que hace es obtener un solo elemento por el id dado.
        $sql = "SELECT * FROM elementos WHERE id = :id";
        $statement = $conex->prepare($sql);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->execute();

        // Verifica si se encuentra el resultado
        $elemento = $statement->fetch(PDO::FETCH_ASSOC);

        if ($elemento) {
            RespuestaJson::sendResponse(true, "Elemento encontrado", $elemento);
        } else {
            RespuestaJson::sendResponse(false, "Elemento no encontrado");
        }
    } else {
        // Esta consulta obtiene todos los elementos si no se recibe un id
        $sql = "SELECT * FROM elementos";
        $statement = $conex->prepare($sql);
        $statement->execute();

        $elementos = $statement->fetchAll(PDO::FETCH_ASSOC);

        RespuestaJson::sendResponse(true, "Elementos encontrados", $elementos);
    }
} catch (PDOException $e) {
  
    RespuestaJson::sendResponse(false, "Error en la consulta: " . $e->getMessage());
} finally {
   
    $conex = null;
}
