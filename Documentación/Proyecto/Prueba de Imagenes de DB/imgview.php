<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "tiendaropa";

// Conexión a la base de datos
$conn = new mysqli($server, $user, $pass, $db);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla Prenda
$sql = "SELECT idPrenda, Nombre, Cantidad, Precio, Descripcion, Imagen FROM Prenda";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Imprimir los datos en una tabla HTML
    echo "<table border='1'>
    <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Descripción</th>
    <th>Imagen</th>
    </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['idPrenda'] . "</td>";
        echo "<td>" . $row['Nombre'] . "</td>";
        echo "<td>" . $row['Cantidad'] . "</td>";
        echo "<td>" . $row['Precio'] . "</td>";
        echo "<td>" . $row['Descripcion'] . "</td>";
        echo "<td><img src='data:image/jpeg;base64," . base64_encode($row['Imagen']) . "' width='100' height='100'/></td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "0 resultados";
}
$conn->close();
?>
