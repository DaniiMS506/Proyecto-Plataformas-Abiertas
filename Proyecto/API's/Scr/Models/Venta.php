<?php

//Archivo Configuración a la Base de Datos
require_once(__DIR__ . '/../DB/conn.php');

class Venta
{
    private $db;
    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM Venta");
        return $stmt->fetchAll();
    }


    //CREATE INSERT
    public function create($data)
    {
        $stmt = $this->db->prepare("INSERT INTO Venta (idUsuario, idPrenda, Cantidad, Fecha, Descripcion, Total) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['idUsuario'], $data['idPrenda'], $data['Cantidad'], $data['Fecha'], $data['Descripcion'], $data['Total']]);
        return ['id' => $this->db->lastInsertId()];
    }
}
?>