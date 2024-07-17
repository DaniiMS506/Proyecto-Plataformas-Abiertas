// INSERT MARCA

$(document).ready(function () {

    // Función para validar los campos antes de enviar la venta
    function validarCampos() {
        const txt_Nombre = $('#txtNombre').val();
        const txt_Descripcion = $('#txtDescripcion').val();

        if (!txt_Nombre || !txt_Descripcion) {
            //alert('Por favor, complete todos los campos correctamente.');
            swal("Alerta!", "Por favor, complete todos los campos correctamente!", "warning");
            return false;
        }

        return true;
    }

    // Evento clic del botón para registrar la venta
    $('#btn_RegistrarMarca').on('click', function (e) {
        e.preventDefault();

        // Validar campos antes de enviar
        if (!validarCampos()) {
            return;
        }

        // Datos a enviar
        const marcaData = {
            Nombre: $('#txtNombre').val(),
            Descripcion: $('#txtDescripcion').val()
        };

        // Realizar el POST mediante AJAX
        $.ajax({
            url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Marca',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(marcaData),
            success: function (response) {
                console.log("Marca registrada:", response);
                swal("Marca Registrada!", "¡Marca registrada correctamente!", "success");
                // Limpiar campos después de la venta exitosa
                $('#txtNombre').val('');
                $('#txtDescripcion').val('');
            },
            error: function (error) {
                console.error("Error al registrar la Marca:", error);
                //alert('Error al registrar la venta. Por favor, intente de nuevo.');
                swal("Error!", "¡Error al registrar la Marca. Por favor, intente de nuevo!", "error");
            }
        });
    });

});