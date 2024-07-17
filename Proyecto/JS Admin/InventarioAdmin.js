// Llenado dinamico de los Selects con los datos de la DB usando APIs

$(document).ready(function () {
    // Cargar PRENDAS
    $.ajax({
        url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Venta?type=prendas',
        method: 'GET',
        success: function (data) {
            const prendas = JSON.parse(data);
            const $selPrenda = $('#selPrenda');
            prendas.forEach(prenda => {
                //$selPrenda.append(new Option(prenda.nombre, prenda.idPrenda));
                // Crear una nueva opción
                const option = document.createElement('option');
                option.value = prenda.idPrenda;
                option.text = prenda.nombre;
                option.setAttribute('data-precio', prenda.precio); // Establecer data-precio como atributo

                // Agregar la opción al select
                $selPrenda.append(option);
            });
        },
        error: function (error) {
            console.error("Error al cargar prendas:", error);
        }
    });

});


///////////////////////////////////////////

// INSERT VENTA

$(document).ready(function () {

    // Función para validar los campos antes de enviar la venta
    function validarCampos() {
        const idPrenda = $('#selPrenda').val();
        const txtCantidad = parseInt($('#txtCantidad').val()) || 0;

        if (!idPrenda || txtCantidad <= 0 || !txtCantidad) {
            //alert('Por favor, complete todos los campos correctamente.');
            swal("Alerta!", "Por favor, complete todos los campos correctamente!", "warning");
            return false;
        }

        return true;
    }

    // Evento clic del botón para registrar la venta
    $('#btn_RegistrarInventario').on('click', function (e) {
        e.preventDefault();

        // Validar campos antes de enviar
        if (!validarCampos()) {
            return;
        }

        // Datos a enviar
        const ventaData = {
            idPrenda: $('#selPrenda').val(),
            Cantidad: parseInt($('#txtCantidad').val())
        };

        // Realizar el POST mediante AJAX
        $.ajax({
            url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Inventario',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ventaData),
            success: function (response) {
                console.log("Inventario registrado:", response);
                swal("Inventario Registrado!", "¡Inventario registrada correctamente!", "success");
                // Limpiar campos después de la venta exitosa
                $('#selPrenda').val('');
                $('#txtCantidad').val('');
            },
            error: function (error) {
                console.error("Error al registrar Inventario:", error);
                //alert('Error al registrar la venta. Por favor, intente de nuevo.');
                swal("Error!", "¡Error al registrar el Inventario. Por favor, intente de nuevo!", "error");
            }
        });
    });

});
