<?php
require_once __DIR__ . "/models/Element.php";
require_once __DIR__ . "/models/Conexion.php";
require_once __DIR__ . "/models/RespuestaJson.php";

// Leer los datos JSON enviados por el cliente
$data = json_decode(file_get_contents("php://input"), true);

// Validar los datos
$nombreElemento = isset($data["nombre"]) ? $data["nombre"] : '';
$descripcion = isset($data["descripcion"]) ? $data["descripcion"] : '';
$numeroSerie = isset($data["numeroSerie"]) ? $data["numeroSerie"] : '';
$estado = isset($data["estado"]) ? $data["estado"] : null;
$prioridad = isset($data["prioridad"]) ? $data["prioridad"] : 'baja';

$element = new Element($nombreElemento, $descripcion, $numeroSerie, $prioridad, $estado);

$conexion = new Conexion();
$conex = $conexion->getConnection();

try {
    $sql = "INSERT INTO elementos (nombre, descripcion, nserie, estado, prioridad) 
            VALUES (:nombre, :descripcion, :nserie, :estado, :prioridad)";
    $statement = $conex->prepare($sql);

    //bindValue se utiliza para asignar un valor fijo
    $statement->bindValue(':nombre', $element->getNombreElemento());
    $statement->bindValue(':descripcion', $element->getDescripcion());
    $statement->bindValue(':nserie', $element->getNumeroSerie());
    $statement->bindValue(':estado', $element->getEstado());
    $statement->bindValue(':prioridad', $element->getPrioridad());

    $statement->execute();

    $id = $conex->lastInsertId();

    // Preparar la respuesta con los datos insertados
    $response = [
        "id" => $id,
        "nombreElemento" => $element->getNombreElemento(),
        "descripcion" => $element->getDescripcion(),
        "numeroSerie" => $element->getNumeroSerie(),
        "estado" => $element->getEstado(),
        "prioridad" => $element->getPrioridad()
    ];

    RespuestaJson::sendResponse(true, "Elemento creado correctamente", $response);
} catch (PDOException $e) {
    RespuestaJson::sendResponse(false, "Error al crear el elemento: " . $e->getMessage());
}

$conex = null;
