<?php
//Response
require_once(__DIR__ . '/../Scr/Utils/Response.php');

// Controllers
require_once(__DIR__ . '/../Scr/Controllers/PrendaController.php');
require_once(__DIR__ . '/../Scr/Controllers/MarcaController.php');
require_once(__DIR__ . '/../Scr/Controllers/InventarioController.php');
require_once(__DIR__ . '/../Scr/Controllers/UsuarioController.php');
require_once(__DIR__ . '/../Scr/Controllers/VentaController.php');

/* *********************************************************************************************************************** */

/* Logica de la API */

// Obtener el Método de la Solicitud
$method = $_SERVER['REQUEST_METHOD'];
//var_dump($method ); //prueba get

// Obtener y Procesar la Información del Path
$path = trim($_SERVER['PATH_INFO'], '/');
//var_dump($path); // prueba path

// Dividir el Path en Segmentos
$segmentosDeUrl = explode('/', $path);

// Obtener el Primer Segmento como Ruta del Controlador
$rutaControlador = array_shift($segmentosDeUrl );

// Obtener el Último Segmento como ID
$id = end($segmentosDeUrl );

//Llamado de API's ejm: 
// http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda


//PRENDA
if ($path  == "Prenda") {
    $objectosPrenda = new PrendaController();
    switch ($method) {
        case 'GET':
            $objectosPrenda->get();
            break;
        case 'POST':
            $objectosPrenda->create();
            break;
        case 'PUT':
            $objectosPrenda->update($id);
            break;
        case 'DELETE':
            $objectosPrenda->delete($id);
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}
// PRENDAS CON STOCK VIEW
elseif ($path  == "PrendasConStock") {
    $objectosPrenda = new PrendaController();

    switch ($method) {
        case 'GET':
            $objectosPrenda->getWithStock();
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}


// MARCA
elseif ($path  == "Marca") {
    $objectosMarca = new MarcaController();

    switch ($method) {
        case 'GET':
            $objectosMarca->get();
            break;
        case 'POST':
            $objectosMarca->create();
            break;
        case 'PUT':
            $objectosMarca->update($id);
            break;
        case 'DELETE':
            $objectosMarca->delete($id);
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}
// MARCAS CON VENTAS VIEW
elseif ($path  == "MarcaConVentas") {
    $objectosMarca = new MarcaController();

    switch ($method) {
        case 'GET':
            $objectosMarca->getWithSales();
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}
// MARCAS TOP 5 VENDIDAS VIEW
elseif ($path  == "Top5MarcasVendidas") {
    $objectosMarca = new MarcaController();

    switch ($method) {
        case 'GET':
            $objectosMarca->getTopSales();
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}


// Inventario
elseif ($path  == "Inventario") {
    $objectosInventario = new InventarioController();

    switch ($method) {
        case 'GET':
            $objectosInventario->get();
            break;
        case 'POST':
            $objectosInventario->create();
            break;
        case 'PUT':
            $objectosInventario->update($id);
            break;
        case 'DELETE':
            $objectosInventario->delete($id);
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}


// Usuario
elseif ($path  == "Usuario") {
    $objectosUsuario = new UsuarioController();

    switch ($method) {
        case 'GET':
            $objectosUsuario->get();
            break;
        case 'POST':
            $objectosUsuario->create();
            break;
        case 'PUT':
            $objectosUsuario->update($id);
            break;
        case 'DELETE':
            $objectosUsuario->delete($id);
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}


// Venta
elseif ($path  == "Venta") {
    $objectosVenta = new VentaController();

    switch ($method) {
        case 'GET':
            $objectosVenta->get();
            break;
        case 'POST':
            $objectosVenta->create();
            break;
        case 'PUT':
            $objectosVenta->update($id);
            break;
        case 'DELETE':
            $objectosVenta->delete($id);
            break;
        default:
            Response::json(['error' => 'Metodo no permitido'], 405);
    }
}


//Error en URL
else {
    include "error/Response.html";
}
?>