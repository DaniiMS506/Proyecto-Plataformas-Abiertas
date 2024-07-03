<?php

require_once (__DIR__ . '/../Models/Usuario.php');


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

}

?>