// //Funcion Entrar / Login
$(document).ready(function () {
    $('#btn_Entrar').click(function (e) {
        e.preventDefault();
        //Variables 
        let logemail = $('#LogEmail').val();
        let logpass = $('#LogPass').val();
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //validar formato email

        //VALIDACIONES
        //Email
        if (logemail == "") {
            swal("Alerta!", "Debes ingresar el Email!", "warning");
            return false;
        }
        if (!emailRegex.test(logemail)) { //Valida FORMATO EMAIL
            swal("Alerta!", "El formato del Email es incorrecto", "warning");
            return false;
        }
        //Password
        if (logpass == "") {
            swal("Alerta!", "Debes ingresar la contraseña!", "warning");
            return false;
        }
        if ((logpass).length < 3) {
            swal("Alerta!", "La contraseña debe ser mayor a 3 caracteres", "warning");
            return false;
        }

        //Peticiones tipo ajax ************
        $.ajax({
            url: '../Frontend/PHP/ValidarLogin.php',
            method: 'POST',
            data: {
                logemail: logemail,
                logpass: logpass
            },
            success: function (dataresponse, statustext, response) {
                if (dataresponse == 'El usuario no existe') {
                    swal("Error...", dataresponse, "warning");
                } else {
                    //Captura Tipo de Usuario
                    console.log('Tipo de Usuario:', dataresponse);
                    if (dataresponse == 'Comprobando...') {
                        swal("Validando Admin...", dataresponse, "success");
                        setTimeout(function () {
                            window.location.href = "index.html"; //ADMIN
                        }, 1200);
                    } else {
                        swal("Validando...", dataresponse, "success");
                        setTimeout(function () {
                            window.location.href = "index.html"; //USUARIO
                        }, 1200);
                    }

                }
            },
            error: function (request, errorcode, errortext) { //si no se logra hacer la peticion se captura el error
                swal("Alerta!", request, "warning");
                console.log(errorcode);
                console.log(errortext);
            }
        });
    });//end btn 
});//end

//////////////////////////////////////////////////////////////////////////////

//Funcion Registrarse
$(document).ready(function () {
    $('#btn_Registrarse').click(function (e) {
        e.preventDefault();
        //Variables 
        let txtnombre = $('#txtNombreCompleto').val();
        let txtapellidos = $('#txtApellidos').val();
        let rol_fk = $('#selRol').val();
        let txtEmail = $('#txtEmail').val();
        let txtPhoneNum = $('#txtPhone').val();
        let txtDireccion = $('#txtDireccion').val();
        let contrasena = $('#Contrasena').val();
        let Confirmacontrasena = $('#ConfirmaContrasena').val();

        // Formatos
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //validar formato email
        const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i'); //contante para validar solo letras

        //VALIDACIONES
        //Nombre
        if (txtnombre == "") {
            swal("Alerta!", "Debes ingresar el Nombre!", "warning");
            return false;
        }
        if (!pattern.test(txtnombre)) {  //Valida SOLO LETRAS
            swal("Alerta!", "El nombre debe contener unicamente letras", "warning");
            return false;
        }

        //Apellidos
        if (txtapellidos == "") {
            swal("Alerta!", "Debe ingresar las apellidos!", "warning");
            return false;
        }

        //Telefono
        if (txtPhoneNum == "") {
            swal("Alerta!", "Debe ingresar el numero de telefono!", "warning");
            return false;
        }

        //Direccion
        if (txtDireccion == "") {
            swal("Alerta!", "Debe ingresar la direccion!", "warning");
            return false;
        }

        //Email
        if (txtEmail == "") {
            swal("Alerta!", "Debes ingresar el Email!", "warning");
            return false;
        }
        if (!emailRegex.test(txtEmail)) { //Valida FORMATO EMAIL
            swal("Alerta!", "El formato del correo electronico es incorrecto", "warning");
            return false;
        }

        //Password
        if (contrasena == "") {
            swal("Alerta!", "Debes ingresar la contraseña!", "warning");
            return false;
        }
        if ((contrasena).length < 3) {
            swal("Alerta!", "La contraseña debe ser mayor a 3 caracteres", "warning");
            return false;
        }
        if (contrasena != Confirmacontrasena) {
            swal("Alerta!", "Las contraseñas no coinciden", "warning");
            return false;
        }


        //Peticiones tipo ajax
        $.ajax({
            url: 'http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API%27s/Public/index.php/Usuario', // URL de tu endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Nombre: txtnombre,
                Apellidos: txtapellidos,
                Rol: rol_fk,
                Email: txtEmail,
                Telefono: txtPhoneNum,
                Direccion: txtDireccion,
                Password: contrasena
            }),
            success: function (response) {
                // Manejar la respuesta exitosa
                swal("Registrado!", 'Bienvenido', "success");
            },
            error: function (xhr, status, error) {
                // Manejar errores
                swal("Error!", "Hubo un error al registrar. Por favor, inténtalo de nuevo más tarde.", "error");
                console.error(xhr.responseText);
            }
        });

    });//end btn
});//end


/*************************************************************/

//<!--Mostrar y Ocultar Password Login--> Funcion Entrar/Login
$(document).ready(function () {
    // Agregar funcionalidad para mostrar/ocultar contraseña con checkbox
    $('#showPasswordCheckbox').change(function () {
        togglePasswordVisibility('#LogPass', '#togglePasswordLogin i');
    });

    function togglePasswordVisibility(passwordFieldId, iconId) {
        let passwordField = $(passwordFieldId);
        let icon = $(iconId);

        if ($('#showPasswordCheckbox').prop('checked')) {
            passwordField.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
});

// <!--Mostrar y Ocultar Password Registrarse--> Funcion Registrarse
$(document).ready(function () {
    // Agregar funcionalidad para mostrar/ocultar contraseña con checkbox
    //password
    $('#showRegisterPasswordCheckbox').change(function () {
        togglePasswordVisibility('#Contrasena', '#togglePassword');
    });

    //confirm password
    $('#showRegisterPasswordConfirmCheckbox').change(function () {
        togglePasswordVisibilityCnf('#ConfirmaContrasena', '#toggleConfirmPassword');
    });

    //Codigo Admin 
    $('#showAdminCodeCheckbox').change(function () {
        togglePasswordVisibilityAdminCode('#selRolShow', '#toggleCodeAdminPassword');
    });

    //password
    function togglePasswordVisibility(passwordFieldId, labelId) {
        let passwordField = $(passwordFieldId);
        let label = $(labelId);

        if ($('#showRegisterPasswordCheckbox').prop('checked')) {
            passwordField.attr('type', 'text');
            label.html('<i class="fa fa-eye-slash"></i>');
        } else {
            passwordField.attr('type', 'password');
            label.html('<i class="fa fa-eye"></i>');
        }
    }
    //confirm password
    function togglePasswordVisibilityCnf(passwordFieldId, labelId) {
        let passwordField = $(passwordFieldId);
        let label = $(labelId);

        if ($('#showRegisterPasswordConfirmCheckbox').prop('checked')) {
            passwordField.attr('type', 'text');
            label.html('<i class="fa fa-eye-slash"></i>');
        } else {
            passwordField.attr('type', 'password');
            label.html('<i class="fa fa-eye"></i>');
        }
    }

    //Codigo Admin
    function togglePasswordVisibilityAdminCode(passwordFieldId, labelId) {
        let passwordField = $(passwordFieldId);
        let label = $(labelId);

        if ($('#showAdminCodeCheckbox').prop('checked')) {
            passwordField.attr('type', 'text');
            label.html('<i class="fa fa-eye-slash"></i>');
        } else {
            passwordField.attr('type', 'password');
            label.html('<i class="fa fa-eye"></i>');
        }
    }
});