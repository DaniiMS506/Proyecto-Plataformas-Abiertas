<?php

    //Archivo Configuración a la Base de Datos
    require_once (__DIR__ . '/../DB/conn.php');

    class Inventario {
        private $db;
        public function __construct()
        {
            $this->db = Database::connect();
        }

        public function all()
        {
            $stmt = $this->db->query("SELECT * FROM Inventario");
            return $stmt->fetchAll();
        }

        // Function Consulta por ID
        public function find($id)
        {
            $stmt = $this->db->prepare("SELECT * FROM Inventario WHERE idInventario = ?");
            $stmt->execute([$id]);
            return $stmt->fetch();
        }

    }

?>