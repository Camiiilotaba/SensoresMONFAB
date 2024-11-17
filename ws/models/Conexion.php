<?php
require __DIR__ . '/../config.php';


class Conexion {
    protected $conexion_db;

    public function __construct() {
        try {
            // Usar las constantes definidas en config.php para crear la conexión
            $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME;
            $this->conexion_db = new PDO($dsn, DB_USER, DB_PASS);
            $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion_db->exec("SET CHARACTER SET " . DB_CHARSET);
        } catch (Exception $e) {
            echo "Error al conectar a la base de datos: " . $e->getMessage() . "<br>";
            echo "La línea de error es: " . $e->getLine() . "<br>";
            die();
        }
    }

    // Método para obtener la conexión
    public function getConnection() {
        return $this->conexion_db;
    }
}
