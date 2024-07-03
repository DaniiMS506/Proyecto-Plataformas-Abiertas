<?php
    //Response
    require_once (__DIR__ . '/../Scr/Utils/Response.php');

    // Controllers
    require_once (__DIR__ . '/../Scr/Controllers/PrendaController.php');
    require_once (__DIR__ . '/../Scr/Controllers/MarcaController.php');
    require_once (__DIR__ . '/../Scr/Controllers/InventarioController.php');
    require_once (__DIR__ . '/../Scr/Controllers/UsuarioController.php');
    require_once (__DIR__ . '/../Scr/Controllers/VentaController.php');

/* *********************************************************************************************************************** */

    /* Logica de la API */
    $method = $_SERVER['REQUEST_METHOD'];
    var_dump($method ); //get

    $path = trim($_SERVER['PATH_INFO'], '/');
    var_dump($path); // prueba

    //Llamado de API's ejm: 
    // http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda

    //PRENDA
    if($path  == "Prenda") {
        $objectosPrenda = new PrendaController();
        switch ($method) {
            case 'GET':
                $objectosPrenda->get();
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }
    
    // MARCA
    elseif($path  == "Marca")
    {
        $objectosMarca = new MarcaController();
    
        switch ($method) {
            case 'GET':
                $objectosMarca->get();
                
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }

    // Inventario
    elseif($path  == "Inventario")
    {
        $objectosInventario = new InventarioController();
    
        switch ($method) {
            case 'GET':
                $objectosInventario->get();
                
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }

    // Usuario
    elseif($path  == "Usuario")
    {
        $objectosUsuario = new UsuarioController();
    
        switch ($method) {
            case 'GET':
                $objectosUsuario->get();
                
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }

    // Venta
    elseif($path  == "Venta")
    {
        $objectosVenta = new VentaController();
    
        switch ($method) {
            case 'GET':
                $objectosVenta->get();
                
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }
    
    //Error en URL
    else{
        include "error/response.html";
    }

?>