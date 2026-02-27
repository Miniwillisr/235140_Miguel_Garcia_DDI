const inicioDiv =document.querySelector("#inicio");
const registroDiv =document.querySelector("#registro");

const Usuarios = [{
    usuario: "maria",
    apellido: "castro",
    correo: "maria.castro@example.com",
    contraseña: "contraseña123",
},
{//2
    usuario: "amancio",
    apellido: "torres",
    correo: "amancio.torres@example.com",
    contraseña: "contraseña456",
}];

class Usuario {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

function mostrarRegistro() {
    inicioDiv.style.display = "none";
    registroDiv.style.display = "block";
}

// Vuelve al Inicio
function volverLogin() {
    registroDiv.style.display = "none";
    inicioDiv.style.display = "block";
}

function regUsuario(){
    console.log("registrar");
    const usuario = document.querySelector("#regUsuario").value.trim();
    const apellido = document.querySelector("#regApellido").value.trim();
    const correo = document.querySelector("#regCorreo").value.trim();
    const contra = document.querySelector("#regContra").value.trim();
    const contra2 = document.querySelector("#regContra2").value.trim();

    if (contra !== contra2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    //volver a Agregar el .push con los datos del usuario
    Usuarios.push({
        usuario,
        apellido,
        correo,
        contraseña: contra
    });
    alert("Usuario registrado correctamente");

    document.querySelector("#formRegistro").reset();
    volverLogin();
}

function leerDatos() {
    const datosFormulario = new FormData(document.querySelector("#formInicio"));
    const datos = Object.fromEntries(datosFormulario.entries());

    if (!datos.correo || !datos.contraseña) {
        alert("Datos Faltantes");
        return;
    }
    const usuarioValido = Usuarios.find(
        user => user.correo === datos.correo && user.contraseña === datos.contraseña
    );
    if (usuarioValido) {
        alert("Sesión iniciada");
    } else {
        alert("Correo o contraseña incorrectos");
    }

}
/*
    if (!usuario || !apellido || !correo || !contra || !contra2) {
        alert("Todos los campos son obligatorios");
        return;

        const existe = Usuarios.some(user => user.correo === correo);

    if (existe) {
        alert("El correo ya está registrado");
        return;
    }
}
*/