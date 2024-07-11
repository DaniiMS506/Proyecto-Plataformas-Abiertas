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
        $stmt = $this->db->prepare("SELECT * FROM prenda WHERE idPrenda = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }


    // Método para obtener todas las prendas con stock VIEW
    public function allWithStock()
    {
        $stmt = $this->db->query("SELECT * FROM PrendasConStock");
        return $stmt->fetchAll();
    }


    // CREATE INSERT
    public function create($data)
    {
        $stmt = $this->db->prepare("INSERT INTO prenda (Nombre, Cantidad, Precio, Descripcion, idMarca) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['Nombre'], $data['Cantidad'], $data['Precio'], $data['Descripcion'], $data['idMarca']]);
        return ['id' => $this->db->lastInsertId()];
    }


    // UPDATE 
    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE prenda SET Nombre = ?, Cantidad = ?, Precio = ?, Descripcion = ?, idMarca = ? WHERE idPrenda = ?");
        $stmt->execute([$data['Nombre'], $data['Cantidad'], $data['Precio'], $data['Descripcion'], $data['idMarca'], $id]);
        return ['success' => true];
    }


    // DELETE
    public function delete($id)
    {
        try {
            // Elimina los registros de inventario relacionados primero de idPrenda
            $stmtInventario = $this->db->prepare("DELETE FROM inventario WHERE idPrenda = ?");
            $stmtInventario->execute([$id]);

            // Actualiza el campo idPrenda a NULL en la tabla venta
            $stmtVenta = $this->db->prepare("UPDATE venta SET idPrenda = NULL WHERE idPrenda = ?");
            $stmtVenta->execute([$id]);

            // Luego elimina la prenda
            $stmtPrenda = $this->db->prepare("DELETE FROM prenda WHERE idPrenda = ?");
            $stmtPrenda->execute([$id]);

            return ['Eliminado' => true];
        } catch (Exception $e) {
            echo $e->getMessage(); // Muestra el mensaje de error para depurar
            return ['Error al Eliminar' => false];
        }
    }
}
?>