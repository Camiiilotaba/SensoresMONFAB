<?php
require_once __DIR__ . "/models/Element.php";
require_once __DIR__ . "/interfaces/IToJson.php";


// recoger datos del formulario
$nombreElemento = isset($_POST["nombre"]) ? $_POST["nombre"] : '';
$descripcion = isset($_POST["descripcion"])? $_POST["descripcion"] : '';
$numeroSerie = isset($_POST["numeroSerie"]) ? $_POST["numeroSerie"] : '';
$estado = isset($_POST["estado"]) ? $_POST["estado"] : null;
$prioridad = isset($_POST["prioridad"]) ? $_POST["prioridad"] : 'baja';


$element = new Element($nombreElemento,$descripcion, $numeroSerie, $estado, $prioridad);

// guardar los datos en un archivo txt
$datosJson = $element->toJson(); 
$rutaArchivo = __DIR__ . '/elementos.txt';  
file_put_contents($rutaArchivo, $datosJson . PHP_EOL, FILE_APPEND);  



echo $element->toJson();
