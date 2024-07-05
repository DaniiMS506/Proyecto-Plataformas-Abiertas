# ¿Cómo crear la estructura inicial de API?

## Estructura de folders

1. Crear folder en **C:\xampp\htdocs\Proyecto Desarrollo con Plataformas Abiertas\Proyecto**
2. Dentro el folder **API's**.
3. Dentro de 'API's' crear dos folders:
    1. Public.
    2. Scr.
4. Dentro de **Public** crear un folder llamado 'Error'.
5. Dentro de **Scr** crear los siguientes folders:
    1. Controllers.
    2. DB.
    3. Models.
    4. Utils

## Archivos

Crear los siguientes archivos:

1. API's\Public\Error\Response.html
2. API's\Public\index.php
3. API's\Src\DB\conn.php
4. API's\Src\routes.php
5. API's\Src\Utils\Response.php

## Utilización de los Endpoints.

### Endpoints Consultas **GET**
1. Consulta de Prendas
    1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda
    2. Consulta de Prenda por ID
      1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda?idPrenda=1
2. Consulta Marcas
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Marca
3. Consulta Inventario
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Inventario
   2. Consulta Inventario por ID
      1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Inventario?idInventario=2
4. Consulta Usuario
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Usuario
   2. Consulta Usuario por ID
      1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Usuario?idUsuario=2
5. Consulta Venta
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta
