<?php

$server = "localhost";
$user = "root";
$pass = "";
$db = "tiendaropa";

// Configuración de errores de MySQLi
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Crear conexión
    $conn = new mysqli($server, $user, $pass, $db);

    // Validar conexión
    if ($conn->connect_error) {
        throw new Exception("La conexión ha fallado: " . $conn->connect_error);
    }

    // Consulta SQL para obtener los datos de Prenda e ImagenPrenda
    $sql = "SELECT Prenda.Nombre AS PrendaNombre, Prenda.Cantidad, Prenda.Precio, Prenda.Descripcion AS PrendaDescripcion, ImagenPrenda.URL, ImagenPrenda.Descripcion AS ImagenDescripcion
            FROM Prenda
            LEFT JOIN ImagenPrenda ON Prenda.idPrenda = ImagenPrenda.idPrenda";

    $result = $conn->query($sql);

    $prendas = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $prendas[] = $row;
        }
    }

    // Cerrar conexión
    $conn->close();

    // Devolver los resultados como JSON
    echo json_encode($prendas);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
