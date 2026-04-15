const canvas = document.querySelector('#lienzo'); //refencia al Canvas del HTML
const ctx = canvas.getContext("2d"); //Contexto del Canvas, es el que nos permite dibujar en el lienzo

const posicionesCursor ={ //Objeto para guardar las posiciones del Cursor
    iniciales: {x: 0, y: 0}, //Ponemos en 0 para evitar errores
    finales: {x: 0, y: 0}
}

let presionado = false; //Variable para saber si se esta presionando el Click

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
    console.log("Se Presiono el Click");
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
}

function MantenerClick(event) {
    console.log("Se Mantiene el Click");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    DibujarLinea();
    if(presionado){
        DibujarLinea();
    }
    //ctx.lineTo(event.offsetX, event.offsetY);
}

function SoltarClick(event) {
    console.log("Se Solto el Click");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    //ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpiar todo el Canvas
    DibujarLinea();
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
