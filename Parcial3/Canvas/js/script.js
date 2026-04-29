//Importamos la Clase Cuadrado del Archivo figuras.js
import { Cuadrado, Circulo, Linea, Sticker } from "./figuras.js";

const canvas = document.querySelector('#lienzo'); //refencia al Canvas del HTML
const ctx = canvas.getContext("2d"); //Contexto del Canvas, es el que nos permite dibujar en el lienzo
const elementos = []; //Array para guardar las figuras que se van a dibujar
const opciones = {
    pincel: false,
    linea: false,
    cuadrado: false,
    circulo: false,
    triangulo: false,
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
document.querySelector("#btn_triangulo").addEventListener("click", () => { cambiarOpcion("triangulo"); })
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
ctx.beginPath(); // Inicia un Nuevo Trazo, en este caso un Cuadrado
ctx.fillStyle = "blue"; // Color de Relleno
ctx.strokeStyle = "red"; // Color del Contorno
ctx.lineWidth = 10; // Ancho del Contorno
ctx.fillRect(100, 100, 500, 500); // Dibuja un Cuadrado con relleno (x, y, alto, ancho)
ctx.strokeRect(100, 100, 500, 500); // Contorno de la figura

//Circulo
ctx.beginPath(); 
ctx.fillStyle = "red"; // Color de Relleno
ctx.strokeStyle = "blue"; // Color del Contorno
ctx.lineWidth = 10; // Ancho del Contorno
ctx.arc(670, 600, 50, 0, Math.PI * 2); // Dibuja un Circulo (x, y, radio, anguloInicial, anguloFinal)
ctx.fill();
ctx.stroke();

//Lineas 
ctx.beginPath();
ctx.moveTo(10, 50); //Punto de Inicio (x, y)
ctx.lineTo(10, 100); //Punto Final (x, y)
ctx.lineTo(100, 600);
ctx.lineTo(10, 800);
ctx.stroke();
*/

/* Ejercicio de Clase
//Dibujar un Triangulo
ctx.beginPath();
ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.lineTo(200, 300);
ctx.lineTo(100, 100);
ctx.fill();
ctx.stroke();

//Corazon
ctx.beginPath();
ctx.fillStyle = "pink";
ctx.strokeStyle = "red";
ctx.lineWidth = 5;

let x = 500; // Constante para X para poder tener la simetria del Corazon mas facil
let y = 300; // Constante para Y para poder tener la simetria del Corazon mas facil

ctx.moveTo(x, y);
ctx.bezierCurveTo(x, y - 100, x - 150, y - 100, x - 150, y); //Curva Izquierda superior
ctx.bezierCurveTo(x - 150, y + 100, x, y + 150, x, y + 200); //Curva Inferior Izquierda
ctx.bezierCurveTo(x, y + 150, x + 150, y + 100, x + 150, y); //Curva Derecha Inferior
ctx.bezierCurveTo(x + 150, y - 100, x, y - 100, x, y); //Curva Superior derecha

ctx.fill();
ctx.stroke();
*/

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
/*
//Dibujar con Click
function detectarClick(event) {
    console.log(event.offsetX, " - ", event.offsetY); //Coordenadas del Click
    ctx.beginPath();
    ctx.fillRect(event.offsetX, event.offsetY, 100, 100);
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
        else if (opciones.triangulo) {
            //opcion de dibujar un triangulo
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elemento = new Sticker(copiaPosiciones, "../Recursos/Totodile.png");
        }
        else if (opciones.borrador) {
            //opcion de borrar
        }
        else {

        }

        elemento.Dibujar(ctx, canvas);
    }
    //ctx.lineTo(event.offsetX, event.offsetY);
}
function SoltarClick(event) {
   // console.log("Se Solto el Click");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    let elemento;

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
    
    if (presionado) {
        let elemento;
        //Se copian las posiciones para evitar que se modifiquen las posiciones originales mientras se dibuja
        let copiaPosiciones = {
            iniciales: { x: posicionesCursor.iniciales.x, y: posicionesCursor.iniciales.y },
            finales: { x: posicionesCursor.finales.x, y: posicionesCursor.finales.y }
        };

        if (opciones.pincel) {
            //opcion de dibujar con el pincel
            
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
        else if (opciones.triangulo) {
            //opcion de dibujar un triangulo
        }
        else if (opciones.sticker) {
            //opcion de dibujar un sticker
            elemento = new Sticker(copiaPosiciones, "../Recursos/Totodile.png");
        }
        else if (opciones.borrador) {
            //opcion de borrar
        }
        else {

        }
        //ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpiar todo el Canvas
        elementos.push(elemento);
        console.log(elementos);
        elementos.forEach(elemento => 
            elemento.Dibujar(ctx, canvas)
        ); //Dibujamos todos los elementos del Array para que no se borren los anteriores

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
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].Dibujar(ctx);
    }
}

function Limpiar() {
    elementos = []; //Limpiamos el Array de Elementos para que no se vuelvan a dibujar
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}