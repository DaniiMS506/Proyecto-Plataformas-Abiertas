<?php
require_once(__DIR__ . '/../Models/Prenda.php');

class PrendaController
{
    private $model;

    public function __construct()
    {
        $this->model = new Prenda();
    }

    public function get()
    {
        // Obtener el idPrenda de la URL si está presente
        $idPrenda = isset($_GET['idPrenda']) ? $_GET['idPrenda'] : null;

        // Si se proporciona idPrenda, filtrar por ese id
        if ($idPrenda !== null) {
            $prenda = $this->model->find($idPrenda);
            echo json_encode($prenda);
        } else {
            echo json_encode($this->model->all());
        }
    }


    // Método para obtener todas las prendas con stock VIEW
    public function getWithStock()
    {
        echo json_encode($this->model->allWithStock());
    }


    // CREATE INSERT
    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        echo  json_encode($this->model->create($data));
    }


    // UPDATE
    public function update($id){
        $id = $_GET['idPrenda'];
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($this->model->update($id, $data));
    }


    // DELETE
    public function delete($id)
    {
        $idPrenda = $_GET['idPrenda']; // Obtiene el ID desde los parámetros de la consulta
        echo json_encode($this->model->delete($idPrenda));
    }
}
?>