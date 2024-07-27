////Cargar datos del usuario a la tabla
$(document).ready(function(){
    
    ////////////////////////////////////////
    /* Llenado de la Tabla */
    ////////////////////////////////////////

    // Llenado dinámico inicial de Tabla Reporte de Usuario
    function llenarTablaReporteUsuario() {
        fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Usuario")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('TablaRepUsuario');
                tableBody.innerHTML = ''; // Limpiar tabla antes de llenar

                if (Array.isArray(data)) {
                    let count = 1;
                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${count}</td><td>${row.Nombre}</td><td>${row.Apellidos}</td><td>${row.Email}</td><td>${row.Telefono}</td><td>${row.Direccion}</td>`;
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
    function inicializarPaginacion(usuario) {
        const registrosPorPagina = 7;
        let paginaActual = 1;

        function mostrarPagina(pagina) {
            const tableBody = document.getElementById('TablaRepUsuario');
            tableBody.innerHTML = '';
            const inicio = (pagina - 1) * registrosPorPagina;
            const fin = inicio + registrosPorPagina;
            const registrosPagina = usuario.slice(inicio, fin);

            registrosPagina.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${inicio + index + 1}</td><td>${row.Nombre}</td><td>${row.Apellidos}</td><td>${row.Email}</td><td>${row.Telefono}</td><td>${row.Direccion}</td> <td id="contenedor${row.id}"> 
                    <abbr title="Editar"><button class="btn btn_danger" onclick="cargarDatosParaEditar(${row.idUsuario})" style='border-color:#0B7DE1; border-radius: 12px; margin-left: 8px'>  <i class="fa fa-pencil-square-o" style='color:#238ce8;'></i> </button></abbr>
                    <abbr title="Eliminar"><button class="btn btn_danger" onclick="eliminarUsuario(${row.idUsuario})" style='border-color:#D60404; border-radius: 12px;'>  <i class="fa fa-trash" style='color:#D60404; font-weight: bold;'></i> </button></abbr>
                </td>`;
                tableBody.appendChild(tr);
            });

            actualizarPaginacion();
        }

        function actualizarPaginacion() {
            const totalPaginas = Math.ceil(usuario.length / registrosPorPagina);
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

    // Llenar la tabla de reporte de usuarios al iniciar la página
    llenarTablaReporteUsuario();

    ////////////////////////////////////////
});

/////////////////////////////////////////////////////////////////////////
/* DELETE */
/////////////////////////////////////////////////////////////////////////

function eliminarUsuario(idUsuario){
    // Confirmar con SweetAlert antes de eliminar
    swal({
        title: "¿Estás seguro?",
        text: `¿Estás seguro de eliminar el Usuario con ID ${idUsuario}?`,
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
                // URL del endpoint para eliminar Usuario
                const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Usuario?idUsuario=${idUsuario}`;

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
                            throw new Error(`Error al eliminar ${idUsuario}: ${response.status} - ${response.statusText}`);
                        }
                        return response.json(); // Intentar parsear la respuesta como JSON
                    })
                    .then(data => {
                        // Manejar la respuesta
                        swal("¡Eliminado!", "El Usuario ha sido eliminada correctamente.", "success");
                        console.log('Usuario eliminado:', data);
                        // Refrescar la página después de 2 segundos
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error al eliminar el Usuario:', error.message);
                        swal("Error", `No se pudo eliminar el Usuario ${idUsuario}`, "error");
                    });

            } else {
                swal("Cancelado", `El Usuario ${idUsuario} no ha sido eliminado.`, "error");
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
    var idUsuario = $(this).closest('tr').find('.idUsuario').val();

    cargarDatosParaEditar(idUsuario);
});


// Cargar los Datos para Editarlos
function cargarDatosParaEditar(idUsuario) {
    // Confirmar con SweetAlert antes de editar
    swal({
        title: "¿Desea Editar?",
        text: `¿Estás seguro de Editar el Usuario con ID ${idUsuario}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, Editar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            // URL del endpoint para obtener los datos del usuario
            const url = `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Usuario?idUsuario=${idUsuario}`;

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
                        throw new Error(`Error al obtener datos del Usuario ${idUsuario}: ${response.status} - ${response.statusText}`);
                    }
                    return response.json(); // Intentar parsear la respuesta como JSON
                })
                .then(data => {
                    //console.log(data); // Imprimir la respuesta para verificar
                    if (data) {
                        $("#txtNombre").val(data.Nombre);
                        $("#txtApellido").val(data.Apellidos);
                        $("#txtEmail").val(data.Email);
                        $("#selRol").val(data.Rol);
                        $("#txtTelefono").val(data.Telefono);
                        $("#txtDireccion").val(data.Direccion);
                        $("#txtPassword").val(data.Password);

                        $("#btn_Update").show(); // Mostrar el botón de editar

                        editando = true;
                        asignarEventoActualizar(idUsuario);

                        // Enviar mensaje de éxito después de cargar los datos
                        swal("¡Datos Cargados!", "Los datos han sido cargados para editar.", "success");
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los datos del usuario:', error.message);
                    swal("Error", "Error al cargar los datos para editar", "error");
                });
        } else {
            swal("Cancelado", `La edición del Usuario ${idUsuario} ha sido cancelada.`, "error");
        }
    });
}

//Funcion encargada de ejecutar el evento actualizar
function asignarEventoActualizar(idUsuario) {
    //Se ejecuta cuando se le da click al boton de editar
    $("#btn_Update").click(function (event) {
        event.preventDefault();
        if (editando) {
            // Datos a enviar
            const inventarioData = {
                Nombre: $('#txtNombre').val(),
                Apellidos: $('#txtApellido').val(),
                Email: $('#txtEmail').val(),
                Rol: $('#selRol').val(),
                Telefono: $('#txtTelefono').val(),
                Direccion: $('#txtDireccion').val(),
                Password: $('#txtPassword').val()
            };

            $.ajax({
                type: "PUT",
                url: `http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Usuario?idUsuario=${idUsuario}`,
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
            //alert("No se seleccionó ningún usuario para editar");
            swal("Error", "No se seleccionó ningún usuario para editar", "warning");
        }
        //La variable editando pasa a false, ya que se dejo de editar 
        editando = false;
    });
}