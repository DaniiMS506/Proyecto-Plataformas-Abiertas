<?php

    //Archivo Configuración a la Base de Datos
    require_once (__DIR__ . '/../DB/conn.php');

    class Prenda {
        private $db;
        public function __construct()
        {
            $this->db = Database::connect();
        }

        public function all()
        {
            $stmt = $this->db->query("select * from Prenda");
            return $stmt->fetchAll();
        }

    }

?>