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

////Cargar datos del inventario a la tabla
$(document).ready(function(){
    
    ////////////////////////////////////////
    /* Llenado de la Tabla */
    ////////////////////////////////////////

    // Llenado dinámico inicial de Tabla Reporte de Inventario
    function llenarTablaReporteInventario() {
        fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Inventario")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('TablaRepInventario');
                tableBody.innerHTML = ''; // Limpiar tabla antes de llenar

                if (Array.isArray(data)) {
                    let count = 1;
                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${count}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td>`;
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
    function inicializarPaginacion(inventario) {
        const registrosPorPagina = 7;
        let paginaActual = 1;

        function mostrarPagina(pagina) {
            const tableBody = document.getElementById('TablaRepInventario');
            tableBody.innerHTML = '';
            const inicio = (pagina - 1) * registrosPorPagina;
            const fin = inicio + registrosPorPagina;
            const registrosPagina = inventario.slice(inicio, fin);

            registrosPagina.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${inicio + index + 1}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td> <td id="contenedor${row.id}"> 
                    <abbr title="Editar"><button class="btn btn_danger" onclick="cargarDatosParaEditar(${row.idInventario})" style='border-color:#0B7DE1; border-radius: 12px; margin-left: 8px'>  <i class="fa fa-pencil-square-o" style='color:#238ce8;'></i> </button></abbr>
                    <abbr title="Eliminar"><button class="btn btn_danger" onclick="eliminarInventario(${row.idInventario})" style='border-color:#D60404; border-radius: 12px;'>  <i class="fa fa-trash" style='color:#D60404; font-weight: bold;'></i> </button></abbr>
                </td>`;
                tableBody.appendChild(tr);
            });

            actualizarPaginacion();
        }

        function actualizarPaginacion() {
            const totalPaginas = Math.ceil(inventario.length / registrosPorPagina);
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

    // Llenar la tabla de reporte de marcas al iniciar la página
    llenarTablaReporteInventario();

    ////////////////////////////////////////
});

/////////////////////////////////////////////////////////////////////////
/* DELETE */
/////////////////////////////////////////////////////////////////////////

function eliminarInventario(idInventario){
    // Confirmar con SweetAlert antes de eliminar
    swal({
        title: "¿Estás seguro?",
        text: `¿Estás seguro de eliminar el Inventario con ID ${idInventario}?`,
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
                // URL del endpoint para eliminar Inventario
                const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Inventario?idInventario=${idInventario}`;

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
                            throw new Error(`Error al eliminar ${idInventario}: ${response.status} - ${response.statusText}`);
                        }
                        return response.json(); // Intentar parsear la respuesta como JSON
                    })
                    .then(data => {
                        // Manejar la respuesta
                        swal("¡Eliminado!", "La prenda ha sido eliminada correctamente del Inventario.", "success");
                        console.log('Marca eliminada:', data);
                        // Refrescar la página después de 2 segundos
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error al eliminar la Marca:', error.message);
                        swal("Error", `No se pudo eliminar la Marca ${idMarca}`, "error");
                    });

            } else {
                swal("Cancelado", `La Marca ${idInventario} no ha sido eliminada.`, "error");
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
    var idInventario = $(this).closest('tr').find('.idInventario').val();

    cargarDatosParaEditar(idInventario);
});


// Cargar los Datos para Editarlos
function cargarDatosParaEditar(idInventario) {
    // Confirmar con SweetAlert antes de editar
    swal({
        title: "¿Desea Editar?",
        text: `¿Estás seguro de Editar el inventario con ID ${idInventario}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, Editar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            // URL del endpoint para obtener los datos de la marca
            const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Inventario?idInventario=${idInventario}`;

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
                        throw new Error(`Error al obtener datos del inventario ${idInventario}: ${response.status} - ${response.statusText}`);
                    }
                    return response.json(); // Intentar parsear la respuesta como JSON
                })
                .then(data => {
                    //console.log(data); // Imprimir la respuesta para verificar
                    if (data) {
                        $("#selPrenda").val(data.idPrenda);
                        $("#txtCantidad").val(data.Cantidad);

                        $("#btn_Update").show(); // Mostrar el botón de editar

                        editando = true;
                        asignarEventoActualizar(idInventario);

                        // Enviar mensaje de éxito después de cargar los datos
                        swal("¡Datos Cargados!", "Los datos han sido cargados para editar.", "success");
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los datos de la marca:', error.message);
                    swal("Error", "Error al cargar los datos para editar", "error");
                });
        } else {
            swal("Cancelado", `La edición de la marca ${idInventario} ha sido cancelada.`, "error");
        }
    });
}

//Funcion encargada de ejecutar el evento actualizar
function asignarEventoActualizar(idInventario) {
    //Se ejecuta cuando se le da click al boton de editar
    $("#btn_Update").click(function (event) {
        event.preventDefault();
        if (editando) {
            // Datos a enviar
            const inventarioData = {
                idPrenda: $('#selPrenda').val(),
                Cantidad: $('#txtCantidad').val()
            };

            $.ajax({
                type: "PUT",
                url: `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Inventario?idInventario=${idInventario}`,
                contentType: 'application/json',
                data: JSON.stringify(inventarioData),
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