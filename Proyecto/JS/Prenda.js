// Llenado del Select Marcas de forma dinamica
$(document).ready(function () {
    // Cargar MARCAS
    $.ajax({
        url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Marca',
        method: 'GET',
        success: function (data) {
            const marca = JSON.parse(data);
            const $selMarca = $('#selMarca');
            marca.forEach(marcas => {
                const nombreCompleto = `${marcas.Nombre}`;
                $selMarca.append(new Option(nombreCompleto, marcas.idMarca));
            });
        },
        error: function (error) {
            console.error("Error al cargar marcas:", error);
        }
    });

});