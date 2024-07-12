// Obtener la fecha actual y Llenado dinamico de Fecha
const today = new Date();

// Formatear la fecha en formato yyyy-mm-dd
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
const dd = String(today.getDate()).padStart(2, '0');

const formattedToday = `${yyyy}-${mm}-${dd}`;

// Asignar la fecha actual al input de fecha
document.getElementById('txtFecha').value = formattedToday;


//////////////////////////////////////////////////////////


// Llenado dinamico de los Selects con los datos de la DB usando APIs

$(document).ready(function () {
    // Cargar USUARIOS
    $.ajax({
        url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Venta?type=usuarios',
        method: 'GET',
        success: function (data) {
            const usuarios = JSON.parse(data);
            const $selUsuario = $('#selUsuario');
            usuarios.forEach(usuario => {
                const nombreCompleto = `${usuario.Nombre} ${usuario.Apellidos}`;
                $selUsuario.append(new Option(nombreCompleto, usuario.idUsuario));
            });
        },
        error: function (error) {
            console.error("Error al cargar usuarios:", error);
        }
    });


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


//////////////////////////////////////////////////////////

// Llenado dinamico del Stock usando APIs y la DB

$(document).ready(function () {
    // Actualizar stock al seleccionar prenda
    $('#selPrenda').on('change', function () {
        const idPrenda = $(this).val();
        if (idPrenda) {
            $.ajax({
                url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Venta',
                method: 'GET',
                data: {
                    type: 'stock',
                    idPrenda: idPrenda
                },
                dataType: 'json', // Especificamos que esperamos JSON como respuesta
                success: function (data) {
                    try {
                        if (data.error) {
                            console.error("Error al obtener stock:", data.error);
                            $('#txtStock').val('');
                            $('#txtPrecio').val('');
                        } else {
                            $('#txtStock').val(data.Cantidad);
                            const precioUnitario = parseFloat($('#selPrenda option:selected').data('precio')) || 0;
                            const unidades = parseInt($('#txtUnd').val()) || 0;
                            const precioTotal = unidades * precioUnitario;
                            $('#txtPrecio').val(precioTotal.toFixed(2));
                        }
                    } catch (e) {
                        console.error("Error al parsear stock:", e);
                    }
                },
                error: function (error) {
                    console.error("Error al cargar stock:", error);
                }
            });
        } else {
            $('#txtStock').val('');
            $('#txtPrecio').val('');
        }
    });


    //////////////////////////////////////////////////////////

    // Validar unidades ingresadas
    $('#txtUnd').on('input', function () {
        const unidades = parseInt($(this).val()) || 0;
        const stock = parseInt($('#txtStock').val()) || 0;

        if (unidades > stock) {
            //alert('Las unidades ingresadas no pueden ser mayores que el stock disponible.');
            swal("Alerta!", "Las unidades ingresadas no pueden ser mayores que el stock disponible!", "warning");
            $(this).val('');
        }

        calcularPrecioTotal();
    });


    // Función para calcular el precio total
    function calcularPrecioTotal() {
        const unidades = parseInt($('#txtUnd').val()) || 0;
        const precioUnitario = parseFloat($('#selPrenda option:selected').data('precio')) || 0;

        const precioTotal = unidades * precioUnitario;
        //$('#txtPrecio').val(precioTotal.toFixed(2) + ' ₡');
        $('#txtPrecio').val(precioTotal.toFixed(2));

    }

});


///////////////////////////////////////////

// INSERT VENTA

$(document).ready(function () {

    // Función para validar los campos antes de enviar la venta
    function validarCampos() {
        const idUsuario = $('#selUsuario').val();
        const idPrenda = $('#selPrenda').val();
        const unidades = parseInt($('#txtUnd').val()) || 0;
        const stock = parseInt($('#txtStock').val()) || 0;

        if (!idUsuario || !idPrenda || unidades <= 0 || unidades > stock) {
            //alert('Por favor, complete todos los campos correctamente.');
            swal("Alerta!", "Por favor, complete todos los campos correctamente!", "warning");
            return false;
        }

        return true;
    }

    // Evento clic del botón para registrar la venta
    $('#btn_RegistrarVenta').on('click', function (e) {
        e.preventDefault();

        // Validar campos antes de enviar
        if (!validarCampos()) {
            return;
        }

        // Datos a enviar
        const ventaData = {
            idUsuario: $('#selUsuario').val(),
            idPrenda: $('#selPrenda').val(),
            Cantidad: parseInt($('#txtUnd').val()),
            Fecha: $('#txtFecha').val(),
            Descripcion: $('#txtDescripcion').val(),
            Total: parseFloat($('#txtPrecio').val())
        };

        // Realizar el POST mediante AJAX
        $.ajax({
            url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Venta',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ventaData),
            success: function (response) {
                console.log("Venta registrada:", response);
                swal("Venta Registrada!", "¡Venta registrada correctamente!", "success");
                // Limpiar campos después de la venta exitosa
                $('#selUsuario').val('');
                $('#selPrenda').val('');
                $('#txtStock').val('');
                $('#txtUnd').val('');
                $('#txtDescripcion').val('');
                $('#txtPrecio').val('');
                // Actualizar dinámicamente los elementos necesarios (si es necesario)
            },
            error: function (error) {
                console.error("Error al registrar la venta:", error);
                //alert('Error al registrar la venta. Por favor, intente de nuevo.');
                swal("Error!", "¡Error al registrar la venta. Por favor, intente de nuevo!", "error");           
            }
        });
    });

});
