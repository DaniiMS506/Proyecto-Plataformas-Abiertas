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


    //UPDATE
    public function update($id, $data)
    {
        $stmt = $this->db->prepare("UPDATE Venta SET idUsuario = ?, idPrenda = ?, Cantidad = ?, Fecha = ?, Descripcion = ?, Total = ? WHERE idVenta = ?");
        $stmt->execute([$data['idUsuario'], $data['idPrenda'], $data['Cantidad'], $data['Fecha'], $data['Descripcion'], $data['Total'], $id]);
        return ['success' => true];
    }


    // DELETE
    public function delete($id)
    {
        try {
            $stmtPrenda = $this->db->prepare("DELETE FROM Venta WHERE idVenta = ?");
            $stmtPrenda->execute([$id]);

            return ['Eliminado' => true];
        } catch (Exception $e) {
            echo $e->getMessage(); // Muestra el mensaje de error para depurar
            return ['Error al Eliminar' => false];
        }
    }
}
?>