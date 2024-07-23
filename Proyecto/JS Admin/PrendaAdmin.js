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


/////////////////////////////////////////////////////////////////////////
/* INSERT */
/////////////////////////////////////////////////////////////////////////

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


    ////////////////////////////////////////
    /* Llenado de la Tabla */
    ////////////////////////////////////////

    // Llenado dinámico inicial de Tabla Reporte de Prendas
    function llenarTablaReportePrendas() {
        fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Prenda")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('TablaRepPrendas');
                tableBody.innerHTML = ''; // Limpiar tabla antes de llenar

                if (Array.isArray(data)) {
                    let count = 1;
                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${count}</td><td>${row.Nombre}</td><td>${row.Cantidad}</td><td>${row.Precio}</td><td>${row.Descripcion}</td><td>${row.idMarca}</td>`;
                        tableBody.appendChild(tr);
                        count++;
                    });

                    // Inicializar paginación después de cargar los datos
                    inicializarPaginacion(data);
                } else {
                    console.error('La respuesta no es un array:', data);
                }
            })
            .catch(error => console.error('Error:', error));
    }


    // Función para inicializar la paginación
    function inicializarPaginacion(ventas) {
        const registrosPorPagina = 7;
        let paginaActual = 1;

        function mostrarPagina(pagina) {
            const tableBody = document.getElementById('TablaRepPrendas');
            tableBody.innerHTML = '';
            const inicio = (pagina - 1) * registrosPorPagina;
            const fin = inicio + registrosPorPagina;
            const registrosPagina = ventas.slice(inicio, fin);

            registrosPagina.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${inicio + index + 1}</td><td>${row.Nombre}</td><td>${row.Cantidad}</td><td>${row.Precio}</td><td>${row.Descripcion}</td><td>${row.idMarca}</td> <td id="contenedor${row.id}"> 
                    <abbr title="Editar"><button class="btn btn_danger" onclick="cargarDatosParaEditar(${row.idPrenda})" style='border-color:#0B7DE1; border-radius: 12px; margin-left: 8px'>  <i class="fa fa-pencil-square-o" style='color:#238ce8;'></i> </button></abbr>
                    <abbr title="Eliminar"><button class="btn btn_danger" onclick="eliminarPrenda(${row.idPrenda})" style='border-color:#D60404; border-radius: 12px;'>  <i class="fa fa-trash" style='color:#D60404; font-weight: bold;'></i> </button></abbr>
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

    // Llenar la tabla de reporte de ventas al iniciar la página
    llenarTablaReportePrendas();

    ////////////////////////////////////////


    ////////////////////////////////////////
    /* INSERT */
    ////////////////////////////////////////

    // Evento clic del botón para registrar la Prenda
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
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
            error: function (error) {
                console.error("Error al registrar la Prenda:", error);
                //alert('Error al registrar la venta. Por favor, intente de nuevo.');
                swal("Error!", "¡Error al registrar la Prenda. Por favor, intente de nuevo!", "error");
            }
        });
    });

});



/////////////////////////////////////////////////////////////////////////
/* DELETE */
/////////////////////////////////////////////////////////////////////////

function eliminarPrenda(idPrenda) {
    // Confirmar con SweetAlert antes de eliminar
    swal({
        title: "¿Estás seguro?",
        text: `¿Estás seguro de eliminar la Prenda con ID ${idPrenda}?`,
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
                // URL del endpoint para eliminar Prenda
                const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Prenda?idPrenda=${idPrenda}`;

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
                            throw new Error(`Error al eliminar ${idPrenda}: ${response.status} - ${response.statusText}`);
                        }
                        return response.json(); // Intentar parsear la respuesta como JSON
                    })
                    .then(data => {
                        // Manejar la respuesta
                        swal("¡Eliminado!", "La Prenda ha sido eliminada correctamente.", "success");
                        console.log('Prenda eliminada:', data);
                        // Refrescar la página después de 2 segundos
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error al eliminar la Prenda:', error.message);
                        swal("Error", `No se pudo eliminar la Prenda ${idPrenda}`, "error");
                    });

            } else {
                swal("Cancelado", `La Prenda ${idPrenda} no ha sido eliminada.`, "error");
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
    var idPrenda = $(this).closest('tr').find('.idPrenda').val();

    cargarDatosParaEditar(idPrenda);
});

// Cargar los Datos para Editarlos
function cargarDatosParaEditar(idPrenda) {
    // Confirmar con SweetAlert antes de editar
    swal({
        title: "¿Desea Editar?",
        text: `¿Estás seguro de Editar la prenda con ID ${idPrenda}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, Editar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            // URL del endpoint para obtener los datos de la prenda
            const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Prenda?idPrenda=${idPrenda}`;

            // Configuración de la solicitud AJAX
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Realizar la solicitud GET mediante fetch
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al obtener datos de la prenda ${idPrenda}: ${response.status} - ${response.statusText}`);
                    }
                    return response.json(); // Intentar parsear la respuesta como JSON
                })
                .then(data => {
                    //console.log(data); // Imprimir la respuesta para verificar
                    if (data) {
                        $("#txtNombre").val(data.Nombre);
                        $("#selMarca").val(data.idMarca);
                        $("#txtPrecio").val(data.Precio);
                        $("#txtCantidad").val(data.Cantidad);
                        $("#txtDescripcion").val(data.Descripcion);

                        $("#btn_Update").show(); // Mostrar el botón de editar

                        editando = true;
                        asignarEventoActualizar(idPrenda);

                        // Enviar mensaje de éxito después de cargar los datos
                        swal("¡Datos Cargados!", "Los datos han sido cargados para editar.", "success");
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los datos de la prenda:', error.message);
                    swal("Error", "Error al cargar los datos para editar", "error");
                });
        } else {
            swal("Cancelado", `La edición de la prenda ${idPrenda} ha sido cancelada.`, "error");
        }
    });
}


//Funcion encargada de ejecutar el evento actualizar
function asignarEventoActualizar(idPrenda) {
    //Se ejecuta cuando se le da click al boton de editar
    $("#btn_Update").click(function (event) {
        event.preventDefault();
        if (editando) {
            // Datos a enviar
            const prendaData = {
                Nombre: $('#txtNombre').val(),
                Cantidad: $('#txtCantidad').val(),
                Precio: $('#txtPrecio').val(),
                Descripcion: $('#txtDescripcion').val(),
                idMarca: $('#selMarca').val()
            };

            $.ajax({
                type: "PUT",
                url: `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Prenda?idPrenda=${idPrenda}`,
                contentType: 'application/json',
                data: JSON.stringify(prendaData),
                success: function (response) {
                    swal("¡Datos Actualizados!", "Los datos han sido actualizados correctamente.", "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    //console.log(response);
                    $("#btn_Update").hide(); //Se oculta el botón de editar después de actualizar los datos
                },
                error: function () {
                    //alert("Error al actualizar la tabla, intente de nuevo");
                    swal("Error", "Error al actualizar los datos, intente de nuevo", "error");
                }
            });
        } else {
            //alert("No se seleccionó ningún producto para editar");
            swal("Error", "No se seleccionó ningún producto para editar", "warning");
        }
        //La variable editando pasa a false, ya que se dejo de editar 
        editando = false;
    });
}