<?php
session_start();
require_once("../../API's/Scr/DB/conn.php");

$email = $_POST['logemail'];
$password = $_POST['logpass'];

try {
    // Conectar usando la clase Database
    $conn = Database::connect();

    // Utiliza consultas preparadas para evitar SQL injection
    $queryUsuario = "SELECT idUsuario, Nombre, Apellidos, Rol FROM Usuario WHERE Email=? AND Password=?";
    $stmtUsuario = $conn->prepare($queryUsuario);
    $stmtUsuario->execute([$email, $password]);

    // Si encuentra una fila que corresponda en Usuario
    if ($stmtUsuario->rowCount() > 0) {
        $usuario = $stmtUsuario->fetch(PDO::FETCH_ASSOC);

        $_SESSION['idUsuario'] = $usuario['idUsuario'];
        $_SESSION['Nombre'] = $usuario['Nombre'];
        $_SESSION['Apellidos'] = $usuario['Apellidos'];
        $_SESSION['Rol'] = $usuario['Rol'];

        // Validar tipo de usuario
        if ($_SESSION['Rol'] == 2) { // Admin
            echo 'Comprobando...';
        } else {
            echo 'Validando Usuario...';
        }

        exit();
    } else {
        echo 'El usuario no existe';
    }
} catch (PDOException $e) {
    // Manejo de errores de conexión o consulta PDO
    echo 'Error en la conexión: ' . $e->getMessage();
}

// Cerrar conexión PDO
$conn = null;
?>