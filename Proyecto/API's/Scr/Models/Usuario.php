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
}
?>