<?php

require_once (__DIR__ . '/../Models/Prenda.php');


class PrendaController
{


    private $model;


    public function __construct()
    {
        $this->model = new Prenda();
    }


    public function get()
    {
        echo json_encode($this->model->all());
    }
}

?>