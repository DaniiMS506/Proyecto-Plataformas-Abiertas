<?php

    //Archivo Configuración a la Base de Datos
    require_once (__DIR__ . '/../DB/conn.php');

    class Marca {
        private $db;
        public function __construct()
        {
            $this->db = Database::connect();
        }

        public function all()
        {
            $stmt = $this->db->query("SELECT * FROM Marca");
            return $stmt->fetchAll();
        }

        // Método para obtener todas las marcas con ventas VIEW
        public function allWithSales()
        {
            $stmt = $this->db->query("SELECT * FROM MarcasConVentas");
            return $stmt->fetchAll();
        }

        // Método para obtener top 5 marcas vendidas VIEW
        public function topSales()
        {
            $stmt = $this->db->query("SELECT * FROM Top5MarcasVendidas");
            return $stmt->fetchAll();
        }

    }

?>