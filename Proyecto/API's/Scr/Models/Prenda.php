<?php
require_once(__DIR__ . '/../DB/conn.php');

class Prenda
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM prenda");
        return $stmt->fetchAll();
    }

    // Function Consulta por ID !Imagen por formato
    public function find($id)
    {
        $stmt = $this->db->prepare("SELECT idPrenda, Nombre, Cantidad, Precio, Descripcion, idMarca FROM prenda WHERE idPrenda = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }


    // Método para obtener todas las prendas con stock VIEW
    public function allWithStock()
    {
        $stmt = $this->db->query("SELECT * FROM PrendasConStock");
        return $stmt->fetchAll();
    }
}
