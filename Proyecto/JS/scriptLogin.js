//Funcion Entrar/Login
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
            url: '/Proyecto/Logica-PHP/ValidarLogin.php',
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
                            window.location.href = "homeAdmin.php"; //ADMIN
                        }, 1200);
                    } else {
                        swal("Validando...", dataresponse, "success");
                        setTimeout(function () {
                            window.location.href = "home.php"; //USUARIO
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
        let nombre = $('#NombreCompleto').val();
        let apellidos = $('#txtApellidos').val();
        let txtCedula = $('#txtCedula').val();

        let Email = $('#txtEmail').val();
        let contrasena = $('#Contrasena').val();
        let Confirmacontrasena = $('#ConfirmaContrasena').val();
        let rol_fk = $('#selTipo').val();

        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //validar formato email
        const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i'); //contante para validar solo letras

        //VALIDACIONES
        //Nombre
        if (nombre == "") {
            swal("Alerta!", "Debes ingresar el Nombre!", "warning");
            return false;
        }
        if (!pattern.test(nombre)) {  //Valida SOLO LETRAS
            swal("Alerta!", "El nombre debe contener unicamente letras", "warning");
            return false;
        }
        //Email
        if (Email == "") {
            swal("Alerta!", "Debes ingresar el Email!", "warning");
            return false;
        }
        if (!emailRegex.test(Email)) { //Valida FORMATO EMAIL
            swal("Alerta!", "El formato del correo electronico es incorrecto", "warning");
            return false;
        }
        //Apellidos
        if (apellidos == "") {
            swal("Alerta!", "Debe ingresar las apellidos!", "warning");
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
            url: '/Proyecto/Logica-PHP/Inserts/insertVendedor.php',
            method: 'POST',
            data: {
                //envio de datos

                //DB vendedor
                nombre: nombre,
                apellidos: apellidos,
                cedula: txtCedula,

                //DB datos_vendedor
                Email: Email,
                contrasena: contrasena,
                rol_fk: rol_fk
            },
            success: function (dataresponse, statustext, response) {  //captura repuesta del jquery
                swal("Registrado!", dataresponse, "success");
            },
            error: function (request, errorcode, errortext) { //si no se logra hacer la peticion se captura el error
                swal("Alerta!", request, "warning");
                console.log(errorcode);
                console.log(errortext);
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
        togglePasswordVisibilityAdminCode('#selTipoShow', '#toggleCodeAdminPassword');
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