let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;
let cambio = false;

function CambiaTama(ancho, alto) {
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

function CambiarIntervalo() {
    console.log("Prueba de Timer");
    if (cambio) {
        contenido.style.width = "1000px";
        contenido.style.height = "300px";
        cambio = false
    } else {
        contenido.style.width = "500px";
        contenido.style.height = "500px";
        cambio=true;
    }

}

function CambioColor(color) {
    contenido.style.background = color;
}
boton.addEventListener('click', () => { //Se pude copiar y pegar el siguiente texto dentro del timer para que cambie tambien el color
    if (bandera) {
        CambioColor("white");
        CambiaTama("1000px", "800px");
        bandera = false;
    } else {
        CambioColor("cyan");
        CambiaTama("500px", "500px");
        bandera = true;
    }
});

setInterval(CambiarIntervalo, 1000);

//document.querySelector("#contenedor_contenido").style.background = "cyan";