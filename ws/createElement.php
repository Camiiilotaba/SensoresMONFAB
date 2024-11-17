<?php
require_once __DIR__ . "/models/Element.php";
require_once __DIR__ . "/models/Conexion.php";
require_once __DIR__ . "/models/RespuestaJson.php";


$nombreElemento = isset($_POST["nombre"]) ? $_POST["nombre"] : '';
$descripcion = isset($_POST["descripcion"]) ? $_POST["descripcion"] : '';
$numeroSerie = isset($_POST["numeroSerie"]) ? $_POST["numeroSerie"] : '';
$estado = isset($_POST["estado"]) ? $_POST["estado"] : null;
$prioridad = isset($_POST["prioridad"]) ? $_POST["prioridad"] : 'baja';

$element = new Element($nombreElemento, $descripcion, $numeroSerie, $estado, $prioridad);

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


    $data = [
        "id" => $id,
        "nombreElemento" => $element->getNombreElemento(),
        "descripcion" => $element->getDescripcion(),
        "numeroSerie" => $element->getNumeroSerie(),
        "estado" => $element->getEstado(),
        "prioridad" => $element->getPrioridad()
    ];


    RespuestaJson::sendResponse(true, "Elemento creado correctamente", $data);
} catch (PDOException $e) {

    RespuestaJson::sendResponse(false, "Error al crear el elemento: " . $e->getMessage());
}


$conex = null;

