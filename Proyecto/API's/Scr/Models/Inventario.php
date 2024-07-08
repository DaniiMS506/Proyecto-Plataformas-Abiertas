<?php

//Archivo Configuración a la Base de Datos
require_once(__DIR__ . '/../DB/conn.php');

class Inventario
{
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


    //CREATE INSERT
    public function create($data)
    {
        $stmt = $this->db->prepare("INSERT INTO Inventario (idPrenda, Cantidad) VALUES (?, ?)");
        $stmt->execute([$data['idPrenda'], $data['Cantidad']]);
        return ['id' => $this->db->lastInsertId()];
    }


    //UPDATE
    public function update($id, $data)
    {
        $stmt = $this->db->prepare("UPDATE Inventario SET idPrenda = ?, Cantidad = ? WHERE idInventario = ?");
        $stmt->execute([$data['idPrenda'], $data['Cantidad'], $id]);
        return ['success' => true];
    }


    // DELETE
    public function delete($id)
    {
        try {
            // Actualiza el campo idPrenda a NULL en la tabla venta
            $stmtVenta = $this->db->prepare("UPDATE venta SET idPrenda = NULL WHERE idPrenda = ?");
            $stmtVenta->execute([$id]);

            // Luego elimina la prenda del inventario
            $stmtInventario = $this->db->prepare("DELETE FROM Inventario WHERE idInventario = ?");
            $stmtInventario->execute([$id]);

            return ['Eliminado' => true];
        } catch (Exception $e) {
            echo $e->getMessage(); // Muestra el mensaje de error para depurar
            return ['Error al Eliminar' => false];
        }
    }
}
?>