<?php

require_once(__DIR__ . '/../Models/Inventario.php');


class InventarioController
{


    private $model;


    public function __construct()
    {
        $this->model = new Inventario();
    }


    public function get()
    {
        // Obtener el idInventario de la URL si está presente
        $idInventario = isset($_GET['idInventario']) ? $_GET['idInventario'] : null;

        // Si se proporciona idInventario, filtrar por ese id
        if ($idInventario !== null) {
            $inventario = $this->model->find($idInventario); // implementar este método en el model
            echo json_encode($inventario);
        } else {
            // Si no se proporciona idInventario, devolver todo el inventario
            echo json_encode($this->model->all());
        }
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
        $id = $_GET['idInventario'];
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($this->model->update($id, $data));
    }


    //DELETE
    public function delete($id)
    {
        $id = $_GET['idInventario']; // Obtiene el ID desde los parámetros de la consulta
        echo json_encode($this->model->delete($id));
    }
}
?>