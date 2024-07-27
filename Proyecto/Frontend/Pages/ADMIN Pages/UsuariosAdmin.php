<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios</title>
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
    <script src="https://common.olemiss.edu/_js/sweet-alert/sweet-alert.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://common.olemiss.edu/_js/sweet-alert/sweet-alert.css">

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
        <h1>Administrar Usuarios</h1>
    </header>

    <nav class="navbar">
        <ul>
            <li><a href="../AdminHome.php" class="fa fa-home"> Inicio</a></li>
            
            <li><a href="../Admin Pages/PrendasAdmin.php" class="bx bxs-t-shirt"> Administrar Prendas</a></li>
            <li><a href="../Admin Pages/MarcasAdmin.php" class="bx bxl-medium"> Administrar Marcas</a></li>
            <li><a href="../Admin Pages/InventarioAdmin.php" class="fa fa-dropbox"> Administrar Inventario</a></li>
            <li><a href="../Admin Pages/VentasAdmin.php" class="fa fa-usd"> Administrar Ventas</a></li>
            <li><a href="../Admin Pages/UsuarioAdmin.php" class="active fa fa-address-card"> Administrar Usuarios</a></li>

            <li><a href="../../PHP/logout.php" class="fa fa-sign-out"> Logout</a></li>
            <div class="animation start-home"></div>
        </ul>
    </nav>

    <main class="main">
        <!-- Registrar Producto -->
        <div class="container">
            <div class="container_registro">
                <!--Registro Usuario-->
                <form action="" class="form-control formulario_registro" id="form-control">
                    <div class="accordion" id="accordionExample">

                        <!--Accordion 1 Registrar Usuario-->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="accordionBTN">
                                    Actualizar Usuario
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <h2 style="margin-bottom: 10px;">Registro de Usuarios</h2>

                                    <div>
                                        <label for="txtNombre">Nombre:</label>
                                        <input class="form-control" type="text" name="" id="txtNombre" placeholder="Digite el nombre del usuario">

                                        <label for="txtApellido">Apellidos:</label>
                                        <input class="form-control" type="text" name="" id="txtApellido" placeholder="Digite los apellidos del usuario">
                                    </div>

                                    <label for="txtEmail">Email:</label>
                                    <input class="form-control" type="text" name="" id="txtEmail" placeholder="Digite el email del usuario">

                                    <div>
                                        <label for="selRol" hidden>Seleccione un Rol:</label>
                                        <select class="form-select" name="" id="selRol" hidden>
                                            <option value="" selected>Seleccione el Rol</option>
                                            <option value="2">Administrador</option>
                                            <option value="1">Usuario</option>
                                        </select>
                                    </div>



                                    <label for="txtTelefono">Telefono:</label>
                                    <input class="form-control" type="text" name="" id="txtTelefono" placeholder="Digite el numero de telefono del usuario">

                                    <label for="txtDireccion">Direccion:</label>
                                    <input class="form-control" type="text" name="" id="txtDireccion" placeholder="Digite la direccion del usuario">

                                    <label for="txtPassword" hidden>Password:</label>
                                    <input class="form-control" type="text" name="" id="txtPassword" placeholder="Digite el password del usuario" hidden>

                                    <button type="submit" class="btn btn-dark" id="btn_RegistrarUsuario" style="margin-top: 15px;">Realizar actualizacion del usuario</button>
                                    <button type="submit" class="btn btn-dark" id="btn_Update" style="margin-top: 15px; margin-left: 5px; display: none;">Actualizar Campos</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div><!--Accordion End-->
                </form>
            </div>
        </div>
    </main>

    <!-- Tabla Administrar -->
    <h2 id="tituloProd">Tabla de Usuarios</h2>

    <div id="ReporteUsuario">
        <div class="tabla">
            <table class="table table-dark">
                <thead>
                    <tr class="table-active">
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody id="TablaRepUsuario">
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

</body>

<!-- JS -->
<script src="../../../JS Admin/UserAdmin.js"></script>

</html>