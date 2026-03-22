// Verifica la sesion
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogeado'));
if (!usuarioActivo) {
    window.location.href = "../../index.html"; // Expulsar si no hay sesión
}

const inputNombre = document.querySelector('#editNombre');
const inputCorreo = document.querySelector('#editCorreo');
const inputContra = document.querySelector('#editContra');
const inputFoto = document.querySelector('#editFoto');
const btnGuardar = document.querySelector('#btnGuardarPerfil');
const linkCerrarSesion = document.querySelector('#navCerrarSesion');

// Prellena los datos actuales
inputNombre.value = usuarioActivo.nombreCompleto;
inputCorreo.value = usuarioActivo.correo;
inputContra.value = usuarioActivo.contrasenia;

// Guarda los cambios
btnGuardar.addEventListener('click', () => {
    const nuevoNombre = inputNombre.value.trim();
    const nuevaContra = inputContra.value;

    if (!nuevoNombre || !nuevaContra) {
        alert("El nombre y la contraseña no pueden estar vacíos.");
        return;
    }

    let nombreFoto = usuarioActivo.fotoDePerfil; // Mantener foto actual por defecto
    if (inputFoto.files.length > 0) {
        nombreFoto = inputFoto.files[0].name; // Actualiza si subió una nueva
    }

    // Actualixa el objeto del usuario Activo
    usuarioActivo.nombreCompleto = nuevoNombre;
    usuarioActivo.contrasenia = nuevaContra;
    usuarioActivo.fotoDePerfil = nombreFoto;

    // Guarda la sesión actualizada
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioActivo));

    // Buscar al usuario en la base de datos general y actualizamos ahí también
    let usuariosBD = JSON.parse(localStorage.getItem('usuariosBlockbuster')) || [];
    
    // findIndex nos dice en qué posición está nuestro usuario
    const indiceUsuario = usuariosBD.findIndex(user => user.correo === usuarioActivo.correo);
    
    if (indiceUsuario !== -1) {
        usuariosBD[indiceUsuario] = usuarioActivo; // Reemplazamos los datos viejos con los nuevos
        localStorage.setItem('usuariosBlockbuster', JSON.stringify(usuariosBD));
    }

    alert("¡Tus datos han sido actualizados con éxito!");
    window.location.href = "../../index.html";
});

// Cierre de sesion
if (linkCerrarSesion) {
    linkCerrarSesion.addEventListener('click', (evento) => {
        evento.preventDefault();
        localStorage.removeItem('usuarioLogeado');
        window.location.href = "../../index.html"; 
    });
}