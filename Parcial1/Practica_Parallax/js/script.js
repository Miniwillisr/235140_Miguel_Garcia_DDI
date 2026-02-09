<<<<<<< HEAD
const elemento1 = document.querySelector("#ele-1");
const elemento2 = document.querySelector("#ele-2");
const elemento3 = document.querySelector("#ele-3");
const elemento4 = document.querySelector("#ele-4");
const elemento5 = document.querySelector("#ele-5");


const boton1 = document.getElementById("btn1"); // El # solo se usa en QuerySelector, no en getElementById
const boton2 = document.getElementById("btn2");
const boton3 = document.getElementById("btn3");
const boton4 = document.getElementById("btn4");
const boton5 = document.getElementById("btn5");
const texto3= document.getElementById("texto3");

let bandera=false;
let grande=false;
let textoOG = false;

//Seccion 1
function cambiarColor(color){
    elemento1.style.backgroundColor=color;
}
boton1.addEventListener('click', ()=>{
    if(bandera){
        cambiarColor("white");
        bandera=false;
    }else{
        cambiarColor("crimson");
        bandera=true;
    }
});

//Seccion 2
function cambiarSize(){ 
        elemento2.addEventListener('mouseenter', () => {
        elemento2.style.transform = "scale(1.1)";
        elemento2.style.transition = "transform 0.3s";
    });

    elemento2.addEventListener('mouseleave', () => {
        elemento2.style.transform = "scale(1)";
    });
}
cambiarSize();

//Seccion 3
function cambiarTexto(){
    if(textoOG){
        texto3.textContent = "Seccion 3";
    }else{
        texto3.textContent = "Texto Nuevo!";
    }
    textoOG = !textoOG;
}
boton3.addEventListener('click', cambiarTexto);

//Seccion 4
function efectoSombra(){
    
}

function colorRandom(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    elemento4.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
=======
const elemento1 = document.querySelector("#ele-1");
const elemento2 = document.querySelector("#ele-2");
const elemento3 = document.querySelector("#ele-3");
const elemento4 = document.querySelector("#ele-4");

const boton1 = document.getElementById("btn1"); // El # solo se usa en QuerySelector, no en getElementById
const boton2 = document.getElementById("btn2");
const boton3 = document.getElementById("btn3");
const boton4 = document.getElementById("btn4");
const texto3= document.getElementById("texto3");

let bandera=false;
let grande=false;
let textoOG = false;

//Seccion 1
function cambiarColor(color){
    elemento1.style.backgroundColor=color;
}
boton1.addEventListener('click', ()=>{
    if(bandera){
        cambiarColor("white");
        bandera=false;
    }else{
        cambiarColor("crimson");
        bandera=true;
    }
});

//Seccion 2
function cambiarSize(){ //Uso de Triada
    elemento2.style.transform = grande ? "scale(1)" : "scale(1.1)";
    elemento2.style.transition = "transform 0.3s";
    grande = !grande;
}
boton2.addEventListener('click', cambiarSize);

//Seccion 3
function cambiarTexto(){
    if(textoOG){
        texto3.textContent = "Seccion 3";
    }else{
        texto3.textContent = "Texto Nuevo!";
    }
    textoOG = !textoOG;
}
boton3.addEventListener('click', cambiarTexto);
//Seccion 4
function colorRandom(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    elemento4.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
>>>>>>> ce60fde512881f9656ba857fa23f80bf5fe06886
    boton4.addEventListener('click', colorRandom);