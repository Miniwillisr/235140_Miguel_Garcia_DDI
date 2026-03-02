
const url = "https://pokeapi.co/api/v2/pokemon";
//Creamos el XMLHttpRequest, se encarga de las peticiones http de forma asincrona
const xhr = new XMLHttpRequest();

//configuramos el tipo de peticion
//Parametro 1, es el tipo de peticion
//Parametro 2, es la url a la que se va a hacer la peticion
//parametro 3, es si sera asincrono
xhr.open("GET", url, true);

//Establecemos la cabeccera Content-Type, para indicar que el tipo de dato esperamos es JSON
xhr.setRequestHeader("Content-Type", "application/json");

//Definimos la Funcion que se ejecutara cuando la peticion se complete
xhr.onreadystatechange = () => {
    //verificamos el estado de la peticion
    //0=UNSENT, 1=OPENED, 2=HEADERS_RECEIVED, 3=LOADING, 4=DONE.
    //Verificamos que el status sea 4 y se complete.
    if(xhr.readyState === 4 ){

        //Verificamos si la respuesta fue exitosa (200 a 299)
        if(xhr.status >= 200 && xhr.status < 300){
            //Hacemos una conversion de la respuesta a Formato JSON, para poder convertirlo como un objeto de JavaScript que se pueda usar
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
        }
        else{
            //Manejamos el error y lo mostramos en la consola, en caso de que la respuesta no sea 200
            console.error("Error HTTP: ", xhr.status, xhr.statusText);
        }
    }
}

//Se definen el manejo de errores, en caso de conexion fallida, tiempo excedido, etc.
xhr.onerror = () => {
    
}

//Manejamos el tiempo de espera, en caso de que la peticion tarde mas de lo esperado
xhr.ontimeout = () => {
    
}
//definimos el tiempo de espera para la peticion
xhr.timeout = 2000;

//Enviamos la peticion, como es get enviamos null
//Si fuera post o null se enviaria un cuerpo con la peticion
xhr.send(null);

