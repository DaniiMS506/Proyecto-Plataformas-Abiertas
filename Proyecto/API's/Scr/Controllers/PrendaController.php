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
            // Si no se proporciona idPrenda, devolver todas las prendas
            $results = $this->model->all();

            // Se manejan así por contener imágenes y dar formato más gráfico
            // [opcional a: echo json_encode($this->model->all());]
            if ($results) {
                foreach ($results as $row) {
                    echo "<br>"; // Salto de línea
                    echo "ID: " . $row['idPrenda'] . "<br>";
                    echo "Nombre: " . $row['Nombre'] . "<br>";
                    echo "Cantidad: " . $row['Cantidad'] . "<br>";
                    echo "Precio: " . $row['Precio'] . "<br>";
                    echo "Descripción: " . $row['Descripcion'] . "<br>";
                    echo "ID Marca: " . $row['idMarca'] . "<br>";
                    echo "<hr>"; // Separador entre registros
                }
            } else {
                echo "No se encontraron prendas.";
            }
        }
    }
}
