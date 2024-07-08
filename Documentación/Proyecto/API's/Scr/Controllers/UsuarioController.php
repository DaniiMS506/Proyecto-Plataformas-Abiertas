<?php

require_once(__DIR__ . '/../Models/Usuario.php');


class UsuarioController
{


    private $model;


    public function __construct()
    {
        $this->model = new Usuario();
    }

    /*public function get()
    {
        echo json_encode($this->model->all());
    }*/

    public function get()
    {
        // Obtener el idUsuario de la URL si está presente
        $idUsuario = isset($_GET['idUsuario']) ? $_GET['idUsuario'] : null;

        // Si se proporciona idUsuario, filtrar por ese id
        if ($idUsuario !== null) {
            $usuario = $this->model->find($idUsuario); // implementar este método en el model
            echo json_encode($usuario);
        } else {
            // Si no se proporciona idUsuario, devolver todos los usuarios
            echo json_encode($this->model->all());
        }
    }


    //CREATE INSERT
    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        echo  json_encode($this->model->create($data));
    }

    // UPDATE
    public function update($id){
        $id = $_GET['idUsuario'];
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($this->model->update($id, $data));
    }
    //DELETE
    public function delete($id)
    {
        $id = $_GET['idUsuario']; // Obtiene el ID desde los parámetros de la consulta
        echo json_encode($this->model->delete($id));
    }
}
?>