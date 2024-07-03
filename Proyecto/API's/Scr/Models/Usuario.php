<?php

    //Archivo Configuración a la Base de Datos
    require_once (__DIR__ . '/../DB/conn.php');

    class Usuario {
        private $db;
        public function __construct()
        {
            $this->db = Database::connect();
        }

        public function all()
        {
            $stmt = $this->db->query("select * from Usuario");
            return $stmt->fetchAll();
        }

    }

?>