//Importamos la Clase Cuadrado del Archivo figuras.js
import { Cuadrado, Circulo, Linea, Sticker, Corazon, Pincel, Borrador } from "./figuras.js";

const canvas = document.querySelector('#lienzo'); //refencia al Canvas del HTML
const ctx = canvas.getContext("2d"); //Contexto del Canvas, es el que nos permite dibujar en el lienzo
const elementos = []; //Array para guardar las figuras que se van a dibujar
const elementosDeshechos = []; //Array para guardar las figuras que se han deshecho para poder rehacerlas
const opciones = {
    pincel: false,
    linea: false,
    cuadrado: false,
    circulo: false,
    corazon: false,
    sticker: false,
    borrador: false,
}

const posicionesCursor = { //Objeto para guardar las posiciones del Cursor
    iniciales: { x: 0, y: 0 }, //Ponemos en 0 para evitar errores
    finales: { x: 0, y: 0 }
}

let presionado = false; //Variable para saber si se esta presionando el Click
let urlStickerActual = "../Recursos/Totodile.png"; //Variable para guardar la URL del sticker que se va a dibujar:

//Se cambio al Script porque se esta utilizando modulos, por lo que no se pueden usar los eventos en el HTML, se deben usar en el JS
canvas.addEventListener("mousedown", (event) => PresionarClick(event)); //Evento para detectar cuando se presiona el Click
canvas.addEventListener("mousemove", (event) => MantenerClick(event)); //Evento para detectar cuando se mueve el Mouse
canvas.addEventListener("mouseup", (event) => SoltarClick(event)); //Evento para detectar cuando se suelta el Click

//Opciones para el Celular
// Cuando el dedo toca la pantalla (Equivale a mousedown)
canvas.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Evita que la pantalla haga scroll mientras se dibuja
    const rect = canvas.getBoundingClientRect(); // Obtenemos el tamaño real del canvas en pantalla
    const toque = event.touches[0]; // Tomamos el primer dedo que tocó
    
    // Calculamos la proporción entre los 1000px internos y lo que mide en pantalla
    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;

    // Multiplicamos la posición del dedo por la escala
    const eventoSimulado = {
        offsetX: (toque.clientX - rect.left) * escalaX,
        offsetY: (toque.clientY - rect.top) * escalaY
    };
    
    PresionarClick(eventoSimulado); // función del primer clic
}, { passive: false });

// Cuando el dedo se mueve por la pantalla (Equivale a mousemove)
canvas.addEventListener("touchmove", (event) => {
    event.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const toque = event.touches[0];
    
    // Si el dedo se sale del canvas, forzamos la función de soltar el click para terminar el dibujo
    if (toque.clientX < rect.left || toque.clientX > rect.right ||
        toque.clientY < rect.top || toque.clientY > rect.bottom) {
        
        // Si se salió, forzamos la función de soltar el click para terminar el dibujo
        SoltarClick({ offsetX: posicionesCursor.finales.x, offsetY: posicionesCursor.finales.y });
        return; // Detenemos la función aquí
    }

    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;

    const eventoSimulado = {
        offsetX: (toque.clientX - rect.left) * escalaX,
        offsetY: (toque.clientY - rect.top) * escalaY
    };
    
    MantenerClick(eventoSimulado); // función para arrastrar
}, { passive: false });

// Cuando el dedo se levanta de la pantalla (Equivale a mouseup)
canvas.addEventListener("touchend", (event) => {
    event.preventDefault();
    
    SoltarClick({ offsetX: posicionesCursor.finales.x, offsetY: posicionesCursor.finales.y }); 
}, { passive: false });

// Si el ratón se sale del canvas, forzamos que se suelte el click
canvas.addEventListener("mouseleave", () => {
    SoltarClick({ offsetX: posicionesCursor.finales.x, offsetY: posicionesCursor.finales.y });
});

// Lo mismo pero por si el dedo se sale de la pantalla o el celular interrumpe el toque
canvas.addEventListener("touchcancel", () => {
    SoltarClick({ offsetX: posicionesCursor.finales.x, offsetY: posicionesCursor.finales.y });
});


//Eventos para los botones de las opciones, nos ayuda a saber la opcion activa
document.querySelector("#btn_pincel").addEventListener("click", () => { cambiarOpcion("pincel"); })
document.querySelector("#btn_linea").addEventListener("click", () => { cambiarOpcion("linea"); })
document.querySelector("#btn_cuadro").addEventListener("click", () => { cambiarOpcion("cuadrado"); })
document.querySelector("#btn_circulo").addEventListener("click", () => { cambiarOpcion("circulo"); })
document.querySelector("#btn_corazon").addEventListener("click", () => { cambiarOpcion("corazon"); })
document.querySelector("#btn_sticker").addEventListener("click", () => { cambiarOpcion("sticker"); })
document.querySelector("#btn_borrador").addEventListener("click", () => { cambiarOpcion("borrador"); })

document.querySelector("#btn_deshacer").addEventListener("click", Deshacer);
document.querySelector("#btn_rehacer").addEventListener("click", Rehacer);
document.querySelector("#btn_limpiar").addEventListener("click", Limpiar);
document.querySelector("#btn_guardar").addEventListener("click", Guardar);

document.querySelector("#btn_bn").addEventListener("click", () => AplicarFiltro("bn"));
document.querySelector("#btn_rojo").addEventListener("click", () => AplicarFiltro("rojo"));
document.querySelector("#btn_verde").addEventListener("click", () => AplicarFiltro("verde"));
document.querySelector("#btn_azul").addEventListener("click", () => AplicarFiltro("azul"));
document.querySelector("#btn_sepia").addEventListener("click", () => AplicarFiltro("sepia"));
document.querySelector("#btn_negativo").addEventListener("click", () => AplicarFiltro("negativo"));


document.querySelector("#input_imagen").addEventListener("change", (event) => {
    // Tomamos el primer archivo que el usuario seleccionó
    const archivo = event.target.files[0];
    if (archivo) {
        const lector = new FileReader(); // Creamos el lector de archivos    
        lector.onload = function (e) {
            urlStickerActual = e.target.result; // Guardamos la nueva imagen 
        }
        // Le damos la orden de leerlo
        lector.readAsDataURL(archivo);
    }
});


function cambiarOpcion(opcion) {
    for (let clave in opciones) {
        opciones[clave] = false; //Ponemos todas las opciones en false para que solo se active la que se selecciono
        console.log(clave);
    }
    opciones[opcion] = true; //Activamos la opcion seleccionada
}

/*
//Dibujar una Imagen y texto
ctx.font = "48px serif"; //Tipo de Letra y Tamaño
ctx.strokeText("Totodile", 400, 50); //Texto, x, y, Esto es el contorno del Texto
ctx.fillText("Totodile", 400, 50); //Texto, x, y, Esto es el relleno del Texto


const imagen = new Image(); //Creamos un nuevo Objeto de Imagen
imagen.src = "../Recursos/Totodile.png"; //Ruta de la Imagen
imagen.onload = () => { //Evento que se ejecuta para poder dibujar la imagen
    ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height,
        0, 0, 200, 200
    ); // Imagen, sx, sy,
}
*/

function PresionarClick(event) {
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
}

function MantenerClick(event) {
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    //DibujarLinea();
    if (presionado) {
        //Se copian las posiciones para evitar que se modifiquen las posiciones originales mientras se dibuja
        let copiaPosiciones = {
            iniciales: { x: posicionesCursor.iniciales.x, y: posicionesCursor.iniciales.y },
            finales: { x: posicionesCursor.finales.x, y: posicionesCursor.finales.y }
        };
        let colorLinea = document.querySelector("#color_linea").value;
        let colorRelleno = document.querySelector("#color_relleno").value;
        let grosor = document.querySelector("#grosor_linea").value;

        let elementoTemp;

        if (opciones.pincel) {
            //opcion de dibujar con el pincel
            elementoTemp = new Pincel(copiaPosiciones, colorLinea, grosor);
            elementos.push(elementoTemp);

            posicionesCursor.iniciales.x = event.offsetX;
            posicionesCursor.iniciales.y = event.offsetY;
        }
        else if (opciones.linea) {
            //opcion de dibujar una linea
            elementoTemp = new Linea(copiaPosiciones, colorLinea, grosor);
        }
        else if (opciones.cuadrado) {
            //opcion de dibujar un cuadrado
            elementoTemp = new Cuadrado(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.circulo) {
            //opcion de dibujar un circulo
            elementoTemp = new Circulo(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.corazon) {
            //opcion de dibujar un corazon
            elementoTemp = new Corazon(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elementoTemp = new Sticker(copiaPosiciones, urlStickerActual);
        }
        else if (opciones.borrador) {
            //opcion de borrar para limpiar el Canvas
            elementoTemp = new Borrador(copiaPosiciones, grosor * 2);
            elementos.push(elementoTemp);

            posicionesCursor.iniciales.x = event.offsetX;
            posicionesCursor.iniciales.y = event.offsetY;
        }
        else {

        }

        Renderizar();
        //Dibuja el temporal para que se vea mientras se esta dibujando, pero no se agrega al Array de Elementos para que no se quede dibujado permanentemente
        if (elementoTemp && !opciones.pincel) {
            elementoTemp.Dibujar(ctx, canvas);
        }
    }
    //presionado = false;  no funciona correctamente porque se necesita que se mantenga presionado para poder dibujar
}
function SoltarClick(event) {
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    if (presionado) {
        //Se copian las posiciones para evitar que se modifiquen las posiciones originales mientras se dibuja
        let copiaPosiciones = {
            iniciales: { x: posicionesCursor.iniciales.x, y: posicionesCursor.iniciales.y },
            finales: { x: posicionesCursor.finales.x, y: posicionesCursor.finales.y }
        };
        let colorLinea = document.querySelector("#color_linea").value;
        let colorRelleno = document.querySelector("#color_relleno").value;
        let grosor = document.querySelector("#grosor_linea").value;

        let elementoFinal;

        if (opciones.pincel) {
            //opcion de dibujar con el pincel
            //elemento = new Pincel(copiaPosiciones, "black", 5);
        }
        else if (opciones.linea) {
            //opcion de dibujar una linea
            elementoFinal = new Linea(copiaPosiciones, colorLinea, grosor);
        }
        else if (opciones.cuadrado) {
            //opcion de dibujar un cuadrado
            elementoFinal = new Cuadrado(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.circulo) {
            //opcion de dibujar un circulo
            elementoFinal = new Circulo(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.corazon) {
            //opcion de dibujar un corazon
            elementoFinal = new Corazon(copiaPosiciones, colorRelleno, colorLinea, grosor);
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elementoFinal = new Sticker(copiaPosiciones, urlStickerActual);
        }
        else if (opciones.borrador) {
            //opcion de borrar para limpiar el Canvas
            //elementoFinal = new Borrador(copiaPosiciones, 15);
        }
        else {

        }
        if (elementoFinal) {
            elementos.push(elementoFinal); //Agregamos el elemento final al Array de Elementos para que se quede dibujado permanentemente
            elementosDeshechos.length = 0; //Limpiamos la lista de deshechos cada vez que se dibuja algo nuevo
        }

        Renderizar();
    }
    presionado = false;
}

function DibujarLinea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limita a dibujar solo una linea
    ctx.beginPath();
    ctx.moveTo(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y);
    ctx.lineTo(posicionesCursor.finales.x, posicionesCursor.finales.y);
    ctx.stroke();
    ctx.closePath();
}

function Renderizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpiar todo el Canvas
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].Dibujar(ctx, canvas);
    }
}

function Limpiar() {
    //elementos = []; //Limpiamos el Array de Elementos para que no se vuelvan a dibujar
    elementos.length = 0;
    elementosDeshechos.length = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Guardar() {
    // Se Crea un elemento <a> temporal en la memoria
    const enlace = document.createElement("a");
    // Convertimos el canvas a una imagen PNG y se la pasamos al enlace
    enlace.href = canvas.toDataURL("image/png");
    // Le decimos qué nombre tendrá el archivo cuando se descargue
    enlace.download = "Mi_Arte_Canvas.png";
    // Simulamos un click en ese enlace para forzar la descarga
    enlace.click();
}

function Deshacer() {
    if (elementos.length > 0) {
        // .pop() saca el último elemento del arreglo
        let ultimoElemento = elementos.pop();
        // Lo guardamos en nuestra lista de deshechos por si queremos rehacerlo
        elementosDeshechos.push(ultimoElemento);
        // Volvemos a dibujar el canvas (como ya le quitamos el último, desaparecerá de la pantalla)
        Renderizar();
    }
}

function Rehacer() {
    // Solo podemos rehacer si hay algo en la "papelera"
    if (elementosDeshechos.length > 0) {
        // .pop() lo saca de la papelera
        let elementoRecuperado = elementosDeshechos.pop();
        // Lo regresamos a los dibujos principales
        elementos.push(elementoRecuperado);
        // Volvemos a dibujar el canvas para que reaparezca
        Renderizar();
    }
}

function AplicarFiltro(tipo) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Recorremos cada píxel de 4 en 4 (Rojo, Verde, Azul, Alfa)
    for (let i = 0; i < data.length; i += 4) {
        let rojo = data[i];
        let verde = data[i + 1];
        let azul = data[i + 2];

        if (tipo === "bn") {
            // Blanco y Negro: Promediamos los 3 colores
            let gris = (rojo + verde + azul) / 3;
            data[i] = gris;
            data[i + 1] = gris;
            data[i + 2] = gris;
        } 
        else if (tipo === "rojo") {
            // Escala de Rojos: Apagamos el verde y el azul
            data[i + 1] = 0; 
            data[i + 2] = 0; 
        } 
        else if (tipo === "verde") {
            // Escala de Verdes: Apagamos el rojo y el azul
            data[i] = 0;     
            data[i + 2] = 0; 
        } 
        else if (tipo === "azul") {
            // Escala de Azules: Apagamos el rojo y el verde
            data[i] = 0;     
            data[i + 1] = 0; 
        } 
        else if (tipo === "sepia") {
            // Sepia: Fórmula estándar de pesos de color
            data[i] = (rojo * 0.393) + (verde * 0.769) + (azul * 0.189);
            data[i + 1] = (rojo * 0.349) + (verde * 0.686) + (azul * 0.168);
            data[i + 2] = (rojo * 0.272) + (verde * 0.534) + (azul * 0.131);
        }
        else if (tipo === "negativo") {
            // Negativo: Invertimos los colores restándolos a 255
            data[i] = 255 - rojo;
            data[i + 1] = 255 - verde;
            data[i + 2] = 255 - azul;
        }
    }
    // Devolvemos los píxeles modificados al Canvas
    // los cambios no se guardan en el Canvas porque modificamos directamente los datos de la imagen
    ctx.putImageData(imgData, 0, 0);
}