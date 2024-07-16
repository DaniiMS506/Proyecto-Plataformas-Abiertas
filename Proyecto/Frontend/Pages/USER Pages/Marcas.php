<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingresar Marcas</title>
    <!--Web Icon-->
    <link rel='shortcut icon' type='image/png' href='../../IMG/web-icon.png' />

    <!--CSS-->
    <link rel="stylesheet" href="../../CSS/StyleHome.css">
    <link rel="stylesheet" href="../../CSS/StylesVentas.css">
    <link rel="stylesheet" href="../../CSS/scrollBar.css">

    <!--LINKS-->
    <!--Icons-->
    <script src="https://use.fontawesome.com/1cf4292344.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!--JQuery-->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>

    <!--sweetalert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <style>
        .form-select {
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .form-control {
            margin-top: 10px;
            margin-bottom: 10px;
        }

        /* Ajuste Section Ventas 'Stock & Und' */
        .half-width {
            width: 100%;
            display: inline-block;
        }

        .full-width {
            width: 100%;
        }
    </style>
</head>

<body>
    <header class="header">
        <h1>Ingresar Marca</h1>
    </header>

    <nav class="navbar">
        <ul>
            <li><a href="../home.php" class="fa fa-home"> Inicio</a></li>
            <li><a href="../User Pages/Ventas.php" class="fa fa-usd"> Venta</a></li>
            <li><a href="../User Pages/Prendas.php" class="bx bxs-t-shirt"> Prendas</a></li>
            <li><a href="../User Pages/Marcas.php" class="active bx bxl-medium"> Marcas</a></li>
            <li><a href="PagesAdmin/ProductosAdmin.php" class="fa fa-dropbox"> Inventario</a></li>
            <li><a href="../User Pages/ReporteVentas.php" class="fa fa-bar-chart"> Reporte de Ventas</a></li>
            <li><a href="../../PHP/logout.php" class="fa fa-sign-out"> Logout</a></li>
            <div class="animation start-home"></div>
        </ul>
    </nav>

    <main class="main">
        <!-- Registrar -->
        <div class="container">
            <div class="container_registro">
                <!-- Registro -->
                <form action="" class="form-control formulario_registro" id="form-control">
                    <div class="accordion" id="accordionExample">

                        <!--Accordion 1 -->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="accordionBTN">
                                    Ingresar Nueva Marca
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <h2 style="margin-bottom: 10px;">Registrar Marca</h2>

                                    <div>
                                        <label for="txtNombre">Ingrese el Nombre:</label>
                                        <input class="form-control" type="text" name="" id="txtNombre" placeholder="Nombre de la Marca" autocomplete="off" maxlength="30">
                                    </div>

                                    <label for="txtDescripcion">Descripcion:</label>
                                    <input class="form-control" type="text" name="" id="txtDescripcion" placeholder="Descripcion" maxlength="255">

                                    <button type="submit" class="btn btn-dark" id="btn_RegistrarMarca" style="margin-top: 15px;">Registrar Marca</button>
                                </div>
                            </div>
                        </div>
                    </div><!--Accordion End-->
                </form>
            </div>
        </div>
    </main>

</body>

<!-- JS -->
<script src="../../../JS/Marca.js"></script>

</html>