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

##

### Endpoints Consultas VIEWS (*Vistas*)
1. Consulta de Vista Todas las Marcas con Ventas
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/MarcaConVentas
2. Consulta de Vista Prendas con Stock y Cantidad Vendida
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/PrendasConStock 
3. Consulta de Vista de las Top 5 Marcas más Vendidas con Cantidad Vendida
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Top5MarcasVendidas

##

### Endpoints Insertar **POST** (*Insert / Create*)
1. Insertar datos en Prenda **POST**
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "Nombre": "Bolso Gucci",
         "Cantidad": 22,
         "Precio": 668,
         "Descripcion": "Bolso Gucci Pequeño",
         "Imagen": "",
         "idMarca": 7
      } ')
2. Insertar datos en Marca **POST**
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Marca 
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "Nombre": "Gucci",
         "Descripcion": "Ropa Gucci"
      } ')
3. Insertar datos en Inventario **POST**
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Inventario
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "idPrenda": 7,
         "Cantidad": 22
      } ')
4. Insertar datos en Usuario **POST**
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Usuario
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "Nombre": "Genesis",
         "Apellidos": "Zuñiga",
         "Rol": 2,
         "Email": "Genesis@gmail.com",
         "Telefono": "555-1233",
         "Direccion": "Calle 31 Cartago",
         "Password": "123"
      } ')
5. Insertar datos en Venta **POST**
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "idUsuario": 6,
         "idPrenda": 7,
         "Cantidad": 1,
         "Fecha": "2024-07-05",
         "Descripcion": "Compra Bolso Gucci",
         "Total": 668
      } ')

##

### Endpoints Actualizar **PUT** (*Update*)
1. Actualizar datos de Prenda
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda?idPrenda=6
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "Nombre": "Zara Basic T-Shirt",
         "Cantidad": 200,
         "Precio": 12500,
         "Descripcion": "Camiseta básica de Zara.",
         "idMarca": 5
      } ')
2. Actualizar datos de Marca
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Marca?idMarca=6
   2. Debe colocar los datos con este formato, en 'Body', 'Raw', utilizando Postman (' {
         "Nombre": "Guess",
         "Descripcion": "Articulos de la marca Guess Originales"
      } ')
3. Actualizar datos de Inventario
   1. 
   2. 
4. Actualizar datos de Usuario
   1. 
   2. 
5. Actualizar datos de Venta
   1. 
   2. 

##### Nota: *Para actualizar un registro coloque la URL seguido del signo '?', el nombre, y el 'ID' del elemento que desea actualizar junto a su numero, ejemplo URL/Prenda?idMarca=6*

##

### Endpoints Eliminar **DELETE** (*Delete*)
1. Eliminar datos de Prenda 
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda?idPrenda=7 
2. Eliminar datos de Marca
   1. http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Marca?idMarca=7
3. Eliminar datos de Inventario 
   1. 
4. Eliminar datos de Usuario 
   1. 
5. Eliminar datos de Venta
   1. 

##### Nota: *Para eliminar un registro coloque la URL seguido del signo '?', el nombre, y el 'ID' del elemento que desea eliminar junto a su numero, ejemplo URL/Prenda?idPrenda=7*

##

#### Notas: *Para usar la busqueda por ID utilice solamente (Prenda, Inventario y Usuario) en la URL deberá colocar un signo de pregunta '?' seguido de (idPrenda, idInventario y idUsuario) respectivamente para cada caso, acompañado de un igual '=' junto al numero del ID que desea filtrar la busqueda, ejemplo: URL/Prenda?idPrenda=3*

##
###