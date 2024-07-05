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

    // Método para obtener todas las marcas con ventas VIEW
    public function getWithSales()
    {
        echo json_encode($this->model->allWithSales());
    }

    // Método para obtener top 5 marcas vendidas VIEW
    public function getTopSales()
    {
        echo json_encode($this->model->topSales());
    }


    //CREATE INSERT
    public function create(){
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        echo  json_encode($this->model->create($data));
    }
}

?>