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
function mostrarRegistro() {
    //Esto Desaparece todo lo de Inicio de sesion
    document.querySelector("h1").style.display = "none";
    correo.style.display = "none";
    contraseña.style.display = "none";
    document.querySelector("#btn-confi").style.display = "none";
    document.querySelector("#btn-regis").style.display = "none";
    document.querySelector("#labelCorreo").style.display = "none";
    document.querySelector("#labelContra").style.display = "none";

    const contenedor = document.querySelector("#conte-registro");
    contenedor.innerHTML = ""; //Esto limpia si ya hay contenido

    //Creo los campos de Registro
    const titulo = document.createElement("h2");
    titulo.textContent = "Registro";

    const usuario = document.createElement("input");
    usuario.textContent = "Ingresa un Usuario: ";
    usuario.type = "text";

    const apellido = document.createElement("input");
    apellido.textContent = "Ingresa un Apellido: ";
    apellido.type = "text";

    const correoReg = document.createElement("input");
    correoReg.placeholder = "Ingresa un correo";
    correoReg.type = "email";

    const contraReg = document.createElement("input");
    contraReg.placeholder = "Ingrese La Contraseña";
    contraReg.type = "password";

    const contraVal = document.createElement("input");
    contraVal.placeholder = "Ingrese La Contraseña Nuevamente";
    contraVal.type = "password";

    const btnRegistrar = document.createElement("button");
    btnRegistrar.textContent = "Guardar";
    btnRegistrar.type = "button";


    btnRegistrar.addEventListener("click", function () {
        if (contraReg.value !== contraVal.value) {
            alert("Las Contraseñas no Coinciden");
            return;
        }
        alert("Usuario Creado Correctamente");

        Usuarios.push({
            usuario,
            apellido,
            correo,
            contraseña: contraReg
        });

        //Se muestra el inicio de Sesion Otra vez
        document.querySelector("h1").style.display = "block";
        correo.style.display = "inline";
        contraseña.style.display = "inline";
        document.querySelector("#btn-confi").style.display = "inline";
        document.querySelector("#btn-regis").style.display = "inline";
        document.querySelector("#labelCorreo").style.display = "inline";
        document.querySelector("#labelContra").style.display = "inline";
    });



    //Se Agregan al contenedor
    contenedor.appendChild(titulo);
    contenedor.appendChild(usuario);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(apellido);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(correoReg);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(contraReg);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(contraVal);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(btnRegistrar);

}
    */
/*
crear el formulario de registro desde JS
Nombre, Apellido, Correo y contraseña
Validar contraseña
Guardar el Usuario
Pasar de Registro a iniciar sesion
*/

/*
OG
    <form id="form_1">
        <h1>Iniciar Sesion</h1>
        <label id="labelCorreo" for="correo">Correo: </label>
        <input type="email" name="correo" placeholder="Ingresa un Correo" id="input-correo">
        <br>
        <label id="labelContra" for="contraseña">Contraseña: </label>
        <input type="password" name="contraseña" placeholder="Ingresa una contraseña" id="input-contra">
        <br>
        <br>
        <button type="button" id="btn-confi" onclick="leerDatos()">Iniciar Sesion</button>
        <button type="button" id="btn-regis" onclick="mostrarRegistro()">Registro</button>
        <br>
        <br>
    </form>
*/

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