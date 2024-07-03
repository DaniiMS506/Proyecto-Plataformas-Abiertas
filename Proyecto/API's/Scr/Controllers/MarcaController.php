<?php

require_once (__DIR__ . '/../Models/Marca.php');


class MarcaController
{


    private $model;


    public function __construct()
    {
        $this->model = new Marca();
    }


    public function get()
    {
        echo json_encode($this->model->all());
    }
}

?>