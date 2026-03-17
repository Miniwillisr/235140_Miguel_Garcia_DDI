// Buscamos si ya hay usuarios guardados. Si no hay, iniciamos un arreglo vacío.
let usuariosBlockbuster = JSON.parse(localStorage.getItem('usuariosBlockbuster')) || [];

// El punto (.) es para clases y el hashtag (#) para IDs
const btnConfirmar = document.querySelector('.btn-confirmar');
const btnVolver = document.querySelector('.btn-volver');
const formulario = document.querySelector('#formRegistroBlockbuster');

// Funcion de Registro
btnConfirmar.addEventListener('click', () => {
    const nombre = document.querySelector('#regNombre').value.trim();
    const correo = document.querySelector('#regCorreo').value.trim();
    const contra = document.querySelector('#regContra').value;
    const verifContra = document.querySelector('#regVerifContra').value;
    
    // Capturamos el Radio Button. Si 'adminSi' está marcado, esto devuelve 'true'. Si no, 'false'.
    const esAdmin = document.querySelector('#adminSi').checked; 

    // Capturamos la foto. 
    const fotoInput = document.querySelector('#regFoto');
    let nombreFoto = "sin-foto.png"; // Valor por defecto
    
    // Verificamos si el usuario seleccionó un archivo
    if (fotoInput.files.length > 0) {
        nombreFoto = fotoInput.files[0].name;
    }

    // Validaciones de los campos
    // 1. Que no haya campos vacíos
    if (!nombre || !correo || !contra || !verifContra) {
        alert("Por favor, completa todos los campos de texto.");
        return; // Detiene la función aquí si hay error
    }

    // 2. Que las contraseñas sean iguales
    if (contra !== verifContra) {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
    }

    // 3. Que el correo no exista ya en nuestra base de datos
    //.some() es un método de los arrays que devuelve 'true' si al menos un elemento cumple la condición dada. En este caso, verificamos si algún usuario ya tiene el mismo correo.
    const correoExiste = usuariosBlockbuster.some(user => user.correo === correo);
    if (correoExiste) {
        alert("Este correo ya está registrado con otra cuenta.");
        return;
    }

    // Creacion de Usuario
    const nuevoUsuario = {
        nombreCompleto: nombre,
        correo: correo,
        contrasenia: contra,
        fotoDePerfil: nombreFoto,
        administrador: esAdmin // true o false
    };

    // Guardado del localStorage
    // Agregamos el nuevo usuario a nuestra lista
    usuariosBlockbuster.push(nuevoUsuario);
    // Sobrescribimos el localStorage con la lista actualizada (convertida a texto)
    localStorage.setItem('usuariosBlockbuster', JSON.stringify(usuariosBlockbuster));
    // Confirmación visual
    alert("¡Registro exitoso! Cuenta creada correctamente.");
    // Limpiamos el formulario para que quede en blanco
    formulario.reset();
    // Redirigimos al usuario a la página de inicio automáticamente
    window.location.href = "../../index.html"; 
});

// Regresa a la página principal sin guardar nada
btnVolver.addEventListener('click', () => {
    window.location.href = "../../index.html";
});