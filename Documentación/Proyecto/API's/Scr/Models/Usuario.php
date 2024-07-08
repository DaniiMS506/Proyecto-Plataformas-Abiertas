<?php

//Archivo Configuración a la Base de Datos
require_once(__DIR__ . '/../DB/conn.php');

class Usuario
{
    private $db;
    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM Usuario");
        return $stmt->fetchAll();
    }

    // Function Consulta por ID
    public function find($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Usuario WHERE idUsuario = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }


    //CREATE INSERT
    public function create($data)
    {
        $stmt = $this->db->prepare("INSERT INTO Usuario (Nombre, Apellidos, Rol, Email, Telefono, Direccion, Password) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['Nombre'], $data['Apellidos'], $data['Rol'], $data['Email'], $data['Telefono'], $data['Direccion'], $data['Password']]);
        return ['id' => $this->db->lastInsertId()];
    }

    //UPDATE
    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE Usuario SET Nombre = ?, Apellidos = ?, Rol = ?, Email = ?, Telefono = ?, Direccion = ?, Password = ? WHERE idUsuario = ?");
        $stmt->execute([$data['Nombre'], $data['Apellidos'], $data['Rol'], $data['Email'], $data['Telefono'], $data['Direccion'], $data['Password'], $id]);
        return ['success' => true];
    }
    
    // DELETE
    public function delete($id)
    {
        try {
            // Actualiza el campo idUsuario a NULL en la tabla venta
            $stmtVenta = $this->db->prepare("UPDATE venta SET idUsuario = NULL WHERE idUsuario = ?");
            $stmtVenta->execute([$id]);

            // Luego elimina el usuario
            $stmtInventario = $this->db->prepare("DELETE FROM Usuario WHERE idUsuario = ?");
            $stmtInventario->execute([$id]);

            return ['Eliminado' => true];
        } catch (Exception $e) {
            echo $e->getMessage(); // Muestra el mensaje de error para depurar
            return ['Error al Eliminar' => false];
        }
    }
}
?>