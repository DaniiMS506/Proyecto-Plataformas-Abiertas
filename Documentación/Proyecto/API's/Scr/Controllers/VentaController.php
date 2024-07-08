<?php

require_once(__DIR__ . '/../Models/Venta.php');


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


    //CREATE INSERT
    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        echo  json_encode($this->model->create($data));
    }

    // UPDATE
    public function update($id){
        $id = $_GET['idVenta'];
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($this->model->update($id, $data));
    }

    //DELETE
    public function delete($id)
    {
        $id = $_GET['idVenta']; // Obtiene el ID desde los parámetros de la consulta
        echo json_encode($this->model->delete($id));
    }
}
?>