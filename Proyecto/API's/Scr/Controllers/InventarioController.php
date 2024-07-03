<?php

require_once (__DIR__ . '/../Models/Inventario.php');


class InventarioController
{


    private $model;


    public function __construct()
    {
        $this->model = new Inventario();
    }


    public function get()
    {
        echo json_encode($this->model->all());
    }
}

?>