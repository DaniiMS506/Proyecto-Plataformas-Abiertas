<?php

require_once(__DIR__ . '/../Models/Marca.php');


class MarcaController
{


    private $model;


    public function __construct()
    {
        $this->model = new Marca();
    }


    public function get()
    {
        // Obtener el idMarca de la URL si está presente
        $idMarca = isset($_GET['idMarca']) ? $_GET['idMarca'] : null;

        // Si se proporciona idMarca, filtrar por ese id
        if ($idMarca !== null) {
            $marca = $this->model->find($idMarca); // implementar este método en el model
            echo json_encode($marca);
        } else {
            // Si no se proporciona idMarca, devolver todo el inventario
            echo json_encode($this->model->all());
        }
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
    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        echo  json_encode($this->model->create($data));
    }


    // UPDATE
    public function update($id)
    {
        $id = $_GET['idMarca'];
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($this->model->update($id, $data));
    }


    // DELETE
    public function delete($id)
    {
        $id = $_GET['idMarca']; // Obtiene el ID desde los parámetros de la consulta
        echo json_encode($this->model->delete($id));
    }
}
