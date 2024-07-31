# Proyecto Desarrollo con Plataformas Abiertas
El Proyecto Desarrollo con Plataformas Abiertas está organizado en una estructura de carpetas bien definida, que facilita la navegación y el manejo del código.

## Estructura del Proyecto
### Navegación y Uso de los Archivos: 
1. API's: 
    1. Public/index.php: Punto de entrada principal para todas las solicitudes de las API's.
        1. Public/Error/Response.html: Página HTML que se muestra en caso de que una solicitud mediante la URL de la API falle.
    2. Scr:
        1. Controllers: Contiene los controladores que manejan las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las entidades como Inventario, Marca, Prenda, Usuario y Venta.
        2. DB/conn.php: Archivo que establece la conexión a la base de datos.
        3. Models: Contiene las definiciones de las entidades de la base de datos y las operaciones asociadas a ellas.
        4. Utils/Response.php: Utilidad para manejar las respuestas de las API.

2. Frontend:
    1. CSS: Contiene los archivos de estilos CSS para diferentes partes del sitio web, incluyendo el carrusel, login, scroll bar, etc.
    2. IMG: Almacena todas las imágenes utilizadas en el sitio web, como logotipos, imágenes de productos y fondos.
    3. index.html y Login.html: Páginas principales de acceso público para el inicio y login del sitio web.

    4. Pages:
        1. ADMIN Pages: Páginas dedicadas específicamente a los administradores/jefes para gestionar inventario, marcas, prendas, entre otros.
        2. USER Pages: Páginas específicas para los usuarios/empleados como Inventario, Marcas, Prendas, etc.
        3. PHP: Carpeta que contiene scripts PHP esenciales para el logout.php y ValidarLogin.php.

3. JS:
    1. Contiene archivos JavaScript para manejar las interacciones del lado del cliente, como animaciones de login, scripts para la página de inicio, inventario, marca, prendas, reporte de ventas, etc.
    2. JS Admin: Archivos JavaScript específicos para las funcionalidades administrativas. 

### Estructura de Carpetas y Archivos del Proyecto:
```
└── 📁Proyecto
    └── 📁API's
        └── 📁Public
            └── 📁Error
                └── Response.html
            └── index.php
        └── readme.md
        └── 📁Scr
            └── 📁Controllers
                └── InventarioController.php
                └── MarcaController.php
                └── PrendaController.php
                └── UsuarioController.php
                └── VentaController.php
            └── 📁DB
                └── conn.php
            └── 📁Models
                └── Inventario.php
                └── Marca.php
                └── Prenda.php
                └── Usuario.php
                └── Venta.php
            └── routes.php
            └── 📁Utils
                └── Response.php
    └── 📁Frontend
        └── 📁CSS
            └── CarouselStyle.css
            └── estilosLogin.css
            └── RepVentasStyles.css
            └── scrollBar.css
            └── StyleHome.css
            └── StyleIndex.css
            └── StylesVentas.css
        └── 📁IMG
            └── 24-hours.png
            └── best-product.png
            └── bg-login.jpg
            └── bg.jpg
            └── 📁Carousel IMG
                └── Air Jordan 1 Louis Vuitton.jpg
                └── Air Jordan 1.jpg
                └── Nike Air Force 1.jpg
                └── Nike Air Mag.jpg
            └── Logo.png
            └── new-product.png
            └── 📁Prendas
                └── AdidasUltraboost.avif
                └── Levi's501OriginalFitJeans.jpg
                └── NikeAirForce1.jpg
                └── NikeAirJordan1.jpg
                └── PumaSuedeClassic.jpg
                └── ZaraBasicT-Shirt.jpg
            └── web-icon.png
        └── index.html
        └── Login.html
        └── 📁Pages
            └── 📁ADMIN Pages
                └── InventarioAdmin.php
                └── MarcasAdmin.php
                └── PrendasAdmin.php
                └── UsuariosAdmin.php
                └── VentasAdmin.php
            └── AdminHome.php
            └── home.php
            └── 📁USER Pages
                └── Inventario.php
                └── Marcas.php
                └── Prendas.php
                └── ReporteVentas.php
                └── Ventas.php
        └── 📁PHP
            └── logout.php
            └── ValidarLogin.php
    └── 📁JS
        └── AnimacionesLogin.js
        └── Home.js
        └── Inventario.js
        └── Marca.js
        └── Prenda.js
        └── ReporteVentas.js
        └── scriptLogin.js
        └── TablasHomeViews.js
        └── VentasUser.js
    └── 📁JS Admin
        └── InventarioAdmin.js
        └── MarcaAdmin.js
        └── PrendaAdmin.js
        └── UserAdmin.js
        └── VentasAdmin.js
    └── readme.md
```

##
###