<?php

//Archivo Configuración a la Base de Datos
require_once(__DIR__ . '/../DB/conn.php');

class Marca
{
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

    // Function Consulta por ID
    public function find($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Marca WHERE idMarca = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
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


    //CREATE INSERT
    public function create($data)
    {
        $stmt = $this->db->prepare("INSERT INTO Marca (Nombre, Descripcion) VALUES (?, ?)");
        $stmt->execute([$data['Nombre'], $data['Descripcion']]);
        return ['id' => $this->db->lastInsertId()];
    }


    //UPDATE
    public function update($id, $data)
    {
        $stmt = $this->db->prepare("UPDATE Marca SET Nombre = ?, Descripcion = ? WHERE idMarca = ?");
        $stmt->execute([$data['Nombre'], $data['Descripcion'], $id]);
        return ['success' => true];
    }


    // DELETE
    public function delete($id)
    {
        try {
            $stmtPrenda = $this->db->prepare("DELETE FROM Marca WHERE idMarca = ?");
            $stmtPrenda->execute([$id]);

            return ['Eliminado' => true];
        } catch (Exception $e) {
            echo $e->getMessage(); // Muestra el mensaje de error para depurar
            return ['Error al Eliminar' => false];
        }
    }
}
