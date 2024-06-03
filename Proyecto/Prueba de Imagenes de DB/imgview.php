<?php
// Conexión a la base de datos
$server = "localhost";
$user = "root";
$pass = "";
$db = "tiendaropa";

// Crear conexión
$conn = new mysqli($server, $user, $pass, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener las imágenes y descripciones de las prendas
$sql = "SELECT Prenda.idPrenda, Prenda.Nombre AS NombrePrenda, ImagenPrenda.Descripcion AS DescripcionImagen, ImagenPrenda.imagen
        FROM Prenda
        INNER JOIN ImagenPrenda ON Prenda.idPrenda = ImagenPrenda.idPrenda";
$result = $conn->query($sql);

// Array para almacenar los datos de las prendas
$prendas = array();

if ($result->num_rows > 0) {
    // Almacenar los datos de las prendas en el array
    while($row = $result->fetch_assoc()) {
        $prendas[] = $row;
    }
}

// Cerrar conexión
$conn->close();
?>

<!-- HTML VIEW -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prendas</title>
</head>
<body>
    <h1>Prendas</h1>
    <table id="tablaPrendas">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción de la imagen</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($prendas as $prenda): ?>
                <tr>
                    <td><?php echo $prenda['NombrePrenda']; ?></td>
                    <td><?php echo $prenda['DescripcionImagen']; ?></td>
                    <td><img src="data:image/jpeg;base64,<?php echo base64_encode($prenda['imagen']); ?>" alt="<?php echo $prenda['NombrePrenda']; ?>" width="100"></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <script>

    </script>
</body>
</html>
