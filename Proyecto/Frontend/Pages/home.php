<?php
session_start();

// Verificar si no existe el idUsuario en la sesión
if (!isset($_SESSION['idUsuario'])) {
    // Redirigir a la página de inicio de sesión
    echo '<script> 
            alert("Debe iniciar sesión y/o Registrarse");
            window.location.href = "../Login.html";
        </script>';
    exit(); // Asegura que el script se detenga después de redirigir
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control de Inventario</title>
    <!--Web Icon-->
    <link rel='shortcut icon' type='image/png' href='../IMG/web-icon.png' />
    <!--CSS-->
    <link rel="stylesheet" href="../CSS/scrollBar.css">
    <link rel="stylesheet" href="../CSS/StyleHome.css">

    <!--LINKS-->
    <!--Icons-->
    <script src="https://use.fontawesome.com/1cf4292344.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Cards Style -->
    <style>
        main h2 {
            text-align: center;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            border-radius: 15px;
            overflow-y: auto;
        }

        /* Estilos responsive */

        @media screen and (max-width: 814px) {
            main {
                overflow: auto;
                flex-direction: column;
                width: 250vw;
                padding: 10px;
                margin: 10px;
            }

            .card {
                margin: 40px;
            }
        }
    </style>

</head>

<body class="body">
    <header class="header">
        <h1>Vistas</h1>
    </header>

    <nav class="navbar">
        <ul>
            <li><a href="home.php" class="active fa fa-home"> Inicio</a></li>
            <li><a href="../Pages/USER Pages/Ventas.php" class="fa fa-usd"> Venta</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="bx bxs-t-shirt"> Prendas</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="bx bxl-medium"> Marcas</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="fa fa-dropbox"> Inventario</a></li>
            <li><a href="Pages/ReporteVentas.php" class="fa fa-bar-chart"> Reporte de Ventas</a></li>
            <li><a href="../PHP/logout.php" class="fa fa-sign-out"> Logout</a></li>

            <div class="animation start-home"></div>
        </ul>
    </nav>

    <main>
        <section id="product-sales" class="card">
            <h2>Todas Las Marcas Con Ventas</h2>
            <!-- Tabla venta productos -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre Marca</th>
                        <th>Total Ventas</th>
                    </tr>
                </thead>
                <tbody id="sales-table-body">
                    <!-- Aquí se insertarán las filas de la tabla mediante JavaScript -->
                </tbody>
            </table>
        </section>

        <section id="recent-sales" class="card">
            <h2>Top 5 Marcas Más Vendidas</h2>
            <!-- Tabla ventas recientes -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre Marca</th>
                        <th>Cantidad de Ventas</th>
                    </tr>
                </thead>
                <tbody id="recent-sales-body">
                    <!-- Aquí se insertarán las filas de la tabla mediante JavaScript -->
                </tbody>
            </table>
        </section>

        <section id="recent-products" class="card">
            <h2>Prendas con Stock y Cantidad Vendida</h2>
            <!-- Tabla productos recientes -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Prenda</th>
                        <th>Stock Restante</th>
                        <th>Cantidad Vendida</th>
                    </tr>
                </thead>
                <tbody id="recent-products-body">
                    <!-- Aquí se insertarán las filas de la tabla mediante JavaScript -->
                </tbody>
            </table>
        </section>
    </main>

    <br></br>
    <footer>
        <!--Social-Media Icons-->
        <div class="social-media">
            <a href="#"> <i class="fa fa-facebook-square" aria-hidden="false"></i> </a>
            <a href="#"> <i class="fa fa-twitter-square" aria-hidden="false"></i> </a>
            <a href="#"> <i class="fa fa-linkedin-square" aria-hidden="false"></i> </a>
        </div>
    </footer>


    <!-- JS -->
    <script src="../../JS/TablasHomeViews.js"></script>
</body>

</html>