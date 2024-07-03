<?php
    //Response
    require_once (__DIR__ . '/../Scr/Utils/Response.php');
    // Controllers
    require_once (__DIR__ . '/../Scr/Controllers/PrendaController.php');

    /* Logica de la API */
    $method = $_SERVER['REQUEST_METHOD'];
    var_dump($method ); //get

    $path = trim($_SERVER['PATH_INFO'], '/');
    var_dump($path); // prueba

    //Llamado de API: 
    // http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda

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
    
    /*elseif($path  == "Prenda")
    {
        $objectosPrenda = new PrendaController();
    
        switch ($method) {
            case 'GET':
                $objectosPrenda->get();
                
                break;
            default:
                Response::json(['error' => 'Metodo no permitido'], 405);
        }
    }*/
    
    else{
        include "error/response.html";
    }

?>