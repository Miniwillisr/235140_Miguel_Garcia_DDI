//Importamos la Clase Cuadrado del Archivo figuras.js
import { Cuadrado, Circulo, Linea, Sticker, Corazon, Pincel} from "./figuras.js";

const canvas = document.querySelector('#lienzo'); //refencia al Canvas del HTML
const ctx = canvas.getContext("2d"); //Contexto del Canvas, es el que nos permite dibujar en el lienzo
const elementos = []; //Array para guardar las figuras que se van a dibujar
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

//Se cambio al Script porque se esta utilizando modulos, por lo que no se pueden usar los eventos en el HTML, se deben usar en el JS
canvas.addEventListener("mousedown", (event) => PresionarClick(event)); //Evento para detectar cuando se presiona el Click
canvas.addEventListener("mousemove", (event) => MantenerClick(event)); //Evento para detectar cuando se mueve el Mouse
canvas.addEventListener("mouseup", (event) => SoltarClick(event)); //Evento para detectar cuando se suelta el Click


//Eventos para los botones de las opciones, nos ayuda a saber la opcion activa
document.querySelector("#btn_pincel").addEventListener("click", () => { cambiarOpcion("pincel"); })
document.querySelector("#btn_linea").addEventListener("click", () => { cambiarOpcion("linea"); })
document.querySelector("#btn_cuadro").addEventListener("click", () => { cambiarOpcion("cuadrado"); })
document.querySelector("#btn_circulo").addEventListener("click", () => { cambiarOpcion("circulo"); })
document.querySelector("#btn_corazon").addEventListener("click", () => { cambiarOpcion("corazon"); })
document.querySelector("#btn_sticker").addEventListener("click", () => { cambiarOpcion("sticker"); })
document.querySelector("#btn_borrador").addEventListener("click", () => { cambiarOpcion("borrador"); })

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
    //console.log("Se Presiono el Click");
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
}

function MantenerClick(event) {
    //console.log("Se Mantiene el Click");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    //DibujarLinea();
    if (presionado) {
        let elemento;
        
        //Se copian las posiciones para evitar que se modifiquen las posiciones originales mientras se dibuja
        let copiaPosiciones = {
            iniciales: { x: posicionesCursor.iniciales.x, y: posicionesCursor.iniciales.y },
            finales: { x: posicionesCursor.finales.x, y: posicionesCursor.finales.y }
        };

        if (opciones.pincel) {
            //opcion de dibujar con el pincel

            elemento = new Pincel(copiaPosiciones, "black", 5);
            copiaPosiciones.iniciales.x = event.offsetX;
            copiaPosiciones.iniciales.y = event.offsetY;
        }
        else if (opciones.linea) {
            //opcion de dibujar una linea
            elemento = new Linea(copiaPosiciones, "blue", 5);
        }
        else if (opciones.cuadrado) {
            //opcion de dibujar un cuadrado
            elemento = new Cuadrado(copiaPosiciones, "green", "blue", 5);
        }
        else if (opciones.circulo) {
            //opcion de dibujar un circulo
            elemento = new Circulo(copiaPosiciones, "purple", "magenta", 5);
        }
        else if (opciones.corazon) {
            //opcion de dibujar un corazon
            elemento = new Corazon(copiaPosiciones, "pink", "red", 5);
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elemento = new Sticker(copiaPosiciones, "../Recursos/Totodile.png");
        }
        else if (opciones.borrador) {
            //opcion de borrar para limpiar el Canvas
        
        }
        else {

        }
        elemento.Dibujar(ctx, canvas);
    }
}
function SoltarClick(event) {
   // console.log("Se Solto el Click");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    
/*
    //Filtro de Color
    const imgeData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight); //Obtenemos los datos de la imagen del Canvas
    const data = imgeData.data; //Obtenemos el arreglo de datos de la imagen
    for (let i = 0; i < data.length; i+=4) { //i+=4 porque cada pixel tiene 4 datos (R, G, B, A) 
        let rojo = data[i] //Rojo 
        let verde = data[i + 1] //Verde
        let azul = data[i + 2] //Azul
        let alfa = data[i + 3] //Alfa (Transparencia)

        data[i] = rojo + 50; //Aumentamos el valor del rojo para darle un efecto de filtro
        data[i + 1] = verde / 2; //Disminuimos el valor para darle un efecto de filtro
        data[i + 2] = azul / 2;
        data[i + 3] = alfa; //No modificamos el valor del alfa para mantener la transparencia
    }
    ctx.putImageData(imgeData, 0, 0); //Volvemos a poner los datos de la imagen en el Canvas para mostrar el efecto del filtro
  */

    if (presionado) {
        //Se copian las posiciones para evitar que se modifiquen las posiciones originales mientras se dibuja
        let copiaPosiciones = {
            iniciales: { x: posicionesCursor.iniciales.x, y: posicionesCursor.iniciales.y },
            finales: { x: posicionesCursor.finales.x, y: posicionesCursor.finales.y }
        };

        if (opciones.pincel) {
            //opcion de dibujar con el pincel
            //elemento = new Pincel(copiaPosiciones, "black", 5);
        }
        else if (opciones.linea) {
            //opcion de dibujar una linea
            elementos.push(new Linea(copiaPosiciones, "blue", 5));
        }
        else if (opciones.cuadrado) {
            //opcion de dibujar un cuadrado
            elementos.push(new Cuadrado(copiaPosiciones, "green", "blue", 5));
        }
        else if (opciones.circulo) {
            //opcion de dibujar un circulo
            elementos.push(new Circulo(copiaPosiciones, "purple", "magenta", 5));
        }
        else if (opciones.corazon) {
            //opcion de dibujar un corazon
            elementos.push(new Corazon(copiaPosiciones, "pink", "red", 5));
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elementos.push(new Sticker(copiaPosiciones, "../Recursos/Totodile.png"));
        }
        else if (opciones.borrador) {
            //opcion de borrar para limpiar el Canvas
            
        }
        else {

        }

    }
    Renderizar();
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
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].Dibujar(ctx, canvas);
    }
}

function Limpiar() {
    elementos = []; //Limpiamos el Array de Elementos para que no se vuelvan a dibujar
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}