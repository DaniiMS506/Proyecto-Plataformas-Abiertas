<?php

require_once (__DIR__ . '/../Models/Usuario.php');


class UsuarioController
{


    private $model;


    public function __construct()
    {
        $this->model = new Usuario();
    }


    public function get()
    {
        echo json_encode($this->model->all());
    }
}

?>