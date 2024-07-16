<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Ventas</title>
    <!--Web Icon-->
    <link rel='shortcut icon' type='image/png' href='../../IMG/web-icon.png' />

    <!--CSS-->
    <link rel="stylesheet" href="../../CSS/StyleHome.css">
    <link rel="stylesheet" href="../../CSS/StylesVentas.css">
    <link rel="stylesheet" href="../../CSS/scrollBar.css">
    <link rel="stylesheet" href="../../CSS/RepVentasStyles.css">

    <!--LINKS-->
    <!--Icons-->
    <script src="https://use.fontawesome.com/1cf4292344.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!--JQuery-->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>

    <!-- CSS -->
    <style>
        @media screen and (max-width: 814px) {
            .tabla {
                overflow-x: scroll;
                overflow-y: scroll;
            }

        }
    </style>
</head>

<body>
    <header class="header">
        <h1>Reporte de Ventas</h1>
    </header>

    <nav class="navbar">
        <ul>
            <li><a href="../home.php" class="fa fa-home"> Inicio</a></li>
            <li><a href="../User Pages/Ventas.php" class="fa fa-usd"> Venta</a></li>
            <li><a href="../User Pages/Prendas.php" class="bx bxs-t-shirt"> Prendas</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="bx bxl-medium"> Marcas</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="fa fa-dropbox"> Inventario</a></li>
            <li><a href="../Pages/User Pages/ReporteVentas.php" class="active fa fa-bar-chart"> Reporte de Ventas</a></li>
            <li><a href="../../PHP/logout.php" class="fa fa-sign-out"> Logout</a></li>

            <div class="animation start-home"></div>
        </ul>
    </nav>

    <div id="ReporteVentas">
        <!-- Registro Ventas -->
        <h1 class="titulo">Ventas de Productos</h1>
        <h3 class="titulo2">Reporte de Ventas: <span class="totalVentas"></span></h3>
        <div class="tabla">
            <table class="table table-dark">
                <thead>
                    <tr class="table-active">
                        <th>#</th>
                        <th>Id Usuario</th>
                        <th>Id Prenda</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody id="TablaRepVentas">
                    <!-- Llenado dinámico mediante JS -->
                </tbody>

            </table>

            <!-- Paginación dinámica -->
            <nav>
                <ul class="pagination" id="pagination">
                    <!-- Llenado de Paginación dinámica -->
                </ul>
            </nav>

        </div>
    </div>

    <!-- JS -->
    <script src="../../../JS/ReporteVentas.js"></script>
</body>

</html>