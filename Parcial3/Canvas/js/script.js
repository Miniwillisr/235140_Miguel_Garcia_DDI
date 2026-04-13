const canvas = document.querySelector('#lienzo');
const ctx = canvas.getContext("2d");
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

let x = 500;
let y = 300;

ctx.moveTo(x, y);
ctx.bezierCurveTo(x, y - 100, x - 150, y - 100, x - 150, y); //Curva Izquierda superior
ctx.bezierCurveTo(x - 150, y + 100, x, y + 150, x, y + 200); //Curva Inferior Izquierda
ctx.bezierCurveTo(x, y + 150, x + 150, y + 100, x + 150, y); //Curva Derecha Inferior
ctx.bezierCurveTo(x + 150, y - 100, x, y - 100, x, y); //Curva Superior derecha

ctx.fill();
ctx.stroke();