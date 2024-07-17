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


//////////////////////////////////////////////////////////

// INSERT VENTA

$(document).ready(function () {

    // Función para validar los campos antes de enviar la venta
    function validarCampos() {
        const txt_Nombre = $('#txtNombre').val();
        const sel_Marca = $('#selMarca').val();
        const txt_Precio = $('#txtPrecio').val();
        const txt_Cantidad = $('#txtCantidad').val();
        const txt_Descripcion = $('#txtDescripcion').val();

        if (!txt_Nombre || !sel_Marca || txt_Precio <= 0 || !txt_Cantidad || !txt_Descripcion) {
            //alert('Por favor, complete todos los campos correctamente.');
            swal("Alerta!", "Por favor, complete todos los campos correctamente!", "warning");
            return false;
        }

        return true;
    }

    // Evento clic del botón para registrar la venta
    $('#btn_RegistrarPrenda').on('click', function (e) {
        e.preventDefault();

        // Validar campos antes de enviar
        if (!validarCampos()) {
            return;
        }

        // Datos a enviar
        const prendaData = {
            Nombre: $('#txtNombre').val(),
            Cantidad: $('#txtCantidad').val(),
            Precio: $('#txtPrecio').val(),
            Descripcion: $('#txtDescripcion').val(),
            idMarca: $('#selMarca').val()
        };

        // Realizar el POST mediante AJAX
        $.ajax({
            url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Prenda',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(prendaData),
            success: function (response) {
                console.log("Prenda registrada:", response);
                swal("Prenda Registrada!", "¡Prenda registrada correctamente!", "success");
                // Limpiar campos después de la venta exitosa
                $('#txtNombre').val('');
                $('#txtCantidad').val('');
                $('#txtPrecio').val('');
                $('#txtDescripcion').val('');
                $('#selMarca').val('');
            },
            error: function (error) {
                console.error("Error al registrar la Prenda:", error);
                //alert('Error al registrar la venta. Por favor, intente de nuevo.');
                swal("Error!", "¡Error al registrar la Prenda. Por favor, intente de nuevo!", "error");
            }
        });
    });

});