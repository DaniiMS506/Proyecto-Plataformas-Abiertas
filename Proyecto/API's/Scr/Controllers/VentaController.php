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
        // Insertar la venta y obtener el ID
        $ventaId = $this->model->create($data);

        // Actualizar stock en inventario
        $this->model->updateStock($data['idPrenda'], $data['Cantidad']);

        // Retornar el ID de la venta creada en formato JSON
        echo json_encode(['id' => $ventaId]);
    }



    // UPDATE
    public function update($id)
    {
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

    ///////////////////////////

    // Obtener Usuario: Nombre, Apellidos y ID
    public function getUsuarios()
    {
        echo json_encode($this->model->getUsuarios());
    }

    // Obtener Prenda: ID y Nombre
    public function getPrendas()
    {
        echo json_encode($this->model->getPrendas());
    }

    // Obtener Stock Inventario: Cantidad
    public function getStock()
    {
        $idPrenda = $_GET['idPrenda'];
        header('Content-Type: application/json');
        echo json_encode($this->model->getStock($idPrenda));
    }
}
?>