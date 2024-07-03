<?php

require_once (__DIR__ . '/../Models/Venta.php');


class VentaController
{


    private $model;


    public function __construct()
    {
        $this->model = new Venta();
    }


    public function get()
    {
        echo json_encode($this->model->all());
    }
}

?>