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


    // Obtener la fecha actual y Llenado dinamico de Fecha
    const today = new Date();

    // Formatear la fecha en formato yyyy-mm-dd
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedToday = `${yyyy}-${mm}-${dd}`;

    // Asignar la fecha actual al input de fecha
    document.getElementById('txtFecha').value = formattedToday;

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


/////////////////////////////////////////////////////////////////////////
/* INSERT */
/////////////////////////////////////////////////////////////////////////

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

    //////

    // Llenado dinámico inicial de Tabla Reporte de Ventas
    function llenarTablaReporteVentas() {
        fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('TablaRepVentas');
                tableBody.innerHTML = ''; // Limpiar tabla antes de llenar

                let count = 1; // Inicializa el contador
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${count}</td><td>${row.idUsuario}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td><td>${row.Fecha}</td><td>${row.Descripcion}</td><td>${row.Total}</td>`;
                    tableBody.appendChild(tr);
                    count++; // Incrementa el contador
                });

                // Inicializar paginación después de cargar los datos
                inicializarPaginacion(data);
            })
            .catch(error => console.error('Error:', error));
    }

    // Función para inicializar la paginación
    function inicializarPaginacion(ventas) {
        const registrosPorPagina = 7;
        let paginaActual = 1;

        function mostrarPagina(pagina) {
            const tableBody = document.getElementById('TablaRepVentas');
            tableBody.innerHTML = '';
            const inicio = (pagina - 1) * registrosPorPagina;
            const fin = inicio + registrosPorPagina;
            const registrosPagina = ventas.slice(inicio, fin);

            registrosPagina.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${inicio + index + 1}</td><td>${row.idUsuario}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td><td>${row.Fecha}</td><td>${row.Descripcion}</td><td>${row.Total}</td> <td id="contenedor${row.id}"> 
                        <abbr title="Editar"><button class="btn btn_danger" onclick="cargarDatosParaEditar(${row.idVenta})" style='border-color:#0B7DE1; border-radius: 12px; margin-left: 8px'>  <i class="fa fa-pencil-square-o" style='color:#238ce8;'></i> </button></abbr>
                        <abbr title="Eliminar"><button class="btn btn_danger" onclick="eliminarVenta(${row.idVenta})" style='border-color:#D60404; border-radius: 12px;'>  <i class="fa fa-trash" style='color:#D60404; font-weight: bold;'></i> </button></abbr>
                    </td>`;
                tableBody.appendChild(tr);
            });

            actualizarPaginacion();
        }

        function actualizarPaginacion() {
            const totalPaginas = Math.ceil(ventas.length / registrosPorPagina);
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';

            for (let i = 1; i <= totalPaginas; i++) {
                const li = document.createElement('li');
                li.className = 'page-item' + (i === paginaActual ? ' active' : '');
                const a = document.createElement('a');
                a.className = 'page-link';
                a.href = '#';
                a.textContent = i;
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    paginaActual = i;
                    mostrarPagina(paginaActual);
                });
                li.appendChild(a);
                pagination.appendChild(li);
            }
        }

        mostrarPagina(paginaActual);
    }


    //////

    // Llenar la tabla de reporte de ventas al iniciar la página
    llenarTablaReporteVentas();

    //////

    // Evento click del botón para registrar la venta
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

                // Actualizar dinámicamente la tabla de reporte de ventas
                llenarTablaReporteVentas();
            },
            error: function (error) {
                console.error("Error al registrar la venta:", error);
                swal("Error!", "¡Error al registrar la venta. Por favor, intente de nuevo!", "error");
            }
        });
    });

});


/////////////////////////////////////////////////////////////////////////
/* DELETE */
/////////////////////////////////////////////////////////////////////////

function eliminarVenta(idVenta) {
    // Confirmar con SweetAlert antes de eliminar
    swal({
        title: "¿Estás seguro?",
        text: `¿Estás seguro de eliminar la venta con ID ${idVenta}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, eliminarla",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                // URL del endpoint para eliminar venta
                const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta?idVenta=${idVenta}`;

                // Configuración de la solicitud AJAX
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                // Realizar la solicitud DELETE mediante fetch
                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error al eliminar ${idVenta}: ${response.status} - ${response.statusText}`);
                        }
                        return response.json(); // Intentar parsear la respuesta como JSON
                    })
                    .then(data => {
                        // Manejar la respuesta
                        swal("¡Eliminado!", "La venta ha sido eliminada correctamente.", "success");
                        console.log('Venta eliminada:', data);
                        // Refrescar la página después de 2 segundos
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error al eliminar la venta:', error.message);
                        swal("Error", `No se pudo eliminar la venta ${idVenta}`, "error");
                    });

            } else {
                swal("Cancelado", `La venta ${idVenta} no ha sido eliminada.`, "error");
            }
        });
}





/////////////////////////////////////////////////////////////////////////
/* UPDATE */
/////////////////////////////////////////////////////////////////////////

//Se declara la variable editando en false, para que no se active el modo de edicion
var editando = false;
//Se ejecuta cuando se le da click al boton de editar, y se ejecuta la funcion
$(document).on('click', '.editar', function (event) {
    event.preventDefault();
    var idVenta = $(this).closest('tr').find('.idVenta').val();

    cargarDatosParaEditar(idVenta);
});

//funcion encargada de traer los datos para poder editarlos
function cargarDatosParaEditar(idVenta) {
    $.ajax({
        url: `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta`,
        type: 'GET',
        data: {
            idVenta: idVenta
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data) {
                //$("#idVenta").val(idVenta);
                $("#selUsuario").val(data.idUsuario);
                $("#selPrenda").val(data.idPrenda);
                $("#txtStock").val(data.Cantidad);
                $("#txtUnd").val(data.Cantidad);
                $("#txtDescripcion").val(data.Descripcion);
                $("#txtFecha").val(data.Fecha);
                $("#txtPrecio").val(data.Total);

                $("#btn_Update").show(); //Se muestra el botón de editar después de cargar los datos
                //La variable editando paso a true, ya que el evento actualizar se esta ejecutando
                editando = true;
                //asignarEventoActualizar(); //Se asigna el evento click después de mostrar el botón
            }
        },
        error: function () {
            alert("Error al cargar los datos para editar");
        }
    })
}