const correo = document.querySelector("#input-correo");
const contraseña = document.querySelector("#input-contra");
const formulario = document.querySelector("#form_1");

const Usuarios = [{
    usuario: "maria",
    correo: "maria.castro@example.com",
    contraseña: "contraseña123",
},
{//2
    usuario: "amancio",
    correo: "amancio.torres@example.com",
    contraseña: "contraseña456",
}];

class Usuario {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

function leerDatos() {
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    if (datos.correo !== "" && datos.contraseña !== "") {
        alert("Sesion Iniciada");
        let usuarioNuevo = new Usuario(datos.correo, datos.contraseña);
        console.log(usuarioNuevo);
    }else{
        alert("Datos Faltantes");
    }
}

//al dar click al boton aparece esto
function registro() {
    const contenedor_registros = document.querySelector("#conte-registro");

    const usuario = document.createElement("input");
    usuario.textContent = "Ingresa un Usuario: ";
    usuario.type = "text"

    const correo = document.createElement("input");
    correo.placeholder = "Ingresa un correo"
    correo.type = "email";

    const contraseña = document.createElement("input");
    contraseña.placeholder = "Ingrese La Contraseña";
    contraseña.type = "password";

}
//correo@gmail.com