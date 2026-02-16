const boton = document.querySelector('#btn-cambiar');
const parrafo = document.querySelector('#texto-cambiante');
const titulo = document.querySelector('#titulo-texto');

let TextoOG = true;

boton.addEventListener('click', function () {

    if (TextoOG) {
        titulo.innerText = "Detalles de la Cancion"; //Texto alternativo para el título y párrafo
        parrafo.innerText = "Esta Cancion se Llama Dark Ocean Summoning y es parte vital del climax del videojuego donde se le da una gran importancia a la letra de la canción, ya que esta se relaciona con el lore del juego y el desenlace del mismo.";
        boton.innerText = "Volver a la presentación";
        TextoOG = false;
    } else {
        titulo.innerText = "Old Gods of Asgard"; //Texto original del título y párrafo
        parrafo.innerText = "Old Gods of Asgard es una banda de heavy metal ficticia perteneciente al universo de Alan Wake. El grupo real tras la ficción es Poets of the Fall, cuya participación es ya conocida por el trabajo anterior con Remedy Entertainment en Max Payne II, interpretando el tema principal del mismo: Late Goodbye.";
        boton.innerText = "Ver detalles técnicos";
        TextoOG = true;
    }
});