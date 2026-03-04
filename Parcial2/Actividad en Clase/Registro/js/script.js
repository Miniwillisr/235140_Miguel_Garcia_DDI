const inicioDiv =document.querySelector("#inicio");
const registroDiv =document.querySelector("#registro");
const dashboardDiv = document.querySelector("#dashboard");

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
        inicioDiv.style.display = "none";
        dashboardDiv.style.display = "block";

        obtenerGatito();
    } else {
        alert("Correo o contraseña incorrectos");
    }

}

function obtenerGatito() {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
    });
    
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        .then(response => response.json()) // Cambiamos a .json() para manipularlo como objeto
        .then(result => {
            // La API devuelve un arreglo, tomamos el primer elemento [0]
            const urlImagen = result[0].url; 
            
            const contenedorGatito = document.querySelector("#info-gatito");
            contenedorGatito.innerHTML = `<img src="${urlImagen}" alt="Gatito aleatorio" style="max-width: 100%; border-radius: 8px;">`;
        })
        .catch(error => {
            console.log('error', error);
            document.querySelector("#info-gatito").innerHTML = "Hubo un error con el gatito.";
        });
}

function cerrarSesion() {
    dashboardDiv.style.display = "none";
    inicioDiv.style.display = "block";

    //Limpiamos los contenedores
    document.querySelector("#formInicio").reset();
    document.querySelector("#info-gatito").innerHTML = "Creando Gatito Ideal...";
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