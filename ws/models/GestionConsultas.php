<?php

class GestionConsultas
{
    private $conexion;

    public function __construct(Conexion $conexion)
    {
        $this->conexion = $conexion;
    }

    public function getElementos($id = null)
    {
        try {
            // Si hay un id, se devuelve el elemento con ese id
            if ($id) {
                $statement = $this->conexion->getConnection()->prepare("SELECT * FROM elementos WHERE id = :id");
                //Se usa bindParam en vez de bindValue porque el id puede cambiar antes de ejecutarse la consulta
                $statement->bindParam(':id', $id, PDO::PARAM_INT);
                $statement->execute();
                return $statement->fetch(PDO::FETCH_ASSOC); // El fetch devuelve solo un elemento
            } else {

                $statement = $this->conexion->getConnection()->prepare("SELECT * FROM elementos");
                $statement->execute();
                return $statement->fetchAll(PDO::FETCH_ASSOC); // El fetchAll se ocupa de devolver todos los elementos
            }
        } catch (PDOException $e) {

            RespuestaJson::sendResponse(false, 'Error en la consulta: ' . $e->getMessage());
            exit();
        }
    }
}
