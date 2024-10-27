<?php
require_once __DIR__ . "/../interfaces/IToJson.php";

class Element implements ItoJson
{

    public $nombreElemento;
    public $descripcion;
    public $numeroSerie;
    public $estado;
    public $prioridad;


    public function __construct($nombreElemento, $descripcion, $numeroSerie, $prioridad, $estado)
    {
        $this->nombreElemento = $nombreElemento;
        $this->descripcion = $descripcion;
        $this->numeroSerie = $numeroSerie;
        $this->prioridad = $prioridad;
        $this->estado = $estado;
    }

    public function toJson()
    {
        // Devuelve un JSON con los atributos del elemento
        return json_encode([
            "nombreElemento" => $this->nombreElemento,
            "descripcion" => $this->descripcion,
            "numeroSerie" => $this->numeroSerie,
            "estado" => $this->estado,
            "prioridad" => $this->prioridad
        ]);
    }


    public function getNombreElemento()
    {
        return $this->nombreElemento;
    }

    public function getDescripcion()  // Añadido
    {
        return $this->descripcion;
    }

    public function getNumeroSerie()
    {
        return $this->numeroSerie;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    public function getPrioridad()
    {
        return $this->prioridad;
    }

    public function setNombreElemento($nombreElemento)
    {
        $this->nombreElemento = $nombreElemento;
    }

    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
    }

    public function setNumeroSerie($numeroSerie)
    {
        $this->numeroSerie = $numeroSerie;
    }

    public function setEstado($estado)
    {
        $this->estado = $estado;
    }

    public function setPrioridad($prioridad)
    {
        $this->prioridad = $prioridad;
    }
}
