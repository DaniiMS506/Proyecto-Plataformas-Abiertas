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
        $results = $this->model->all();

        //Se manejan así por contener Imagenes y dar formato mas grafico [opcional a: echo json_encode($this->model->all()); ]
        // Si hay resultados, los mostramos
        if ($results) {
            foreach ($results as $row) {
                echo "<br>"; //salto de linea
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
?>