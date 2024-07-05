<?php

require_once (__DIR__ . '/../Models/Inventario.php');


class InventarioController
{


    private $model;


    public function __construct()
    {
        $this->model = new Inventario();
    }


    /*public function get()
    {
        echo json_encode($this->model->all());
    }*/

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
}

?>