const url = "https://pokeapi.co/api/v2/pokemon";
//const url = "https://jsonplaceholder.typicode.com/users";

fetch(url).then( //Este fetch solo aplica para el placeholder
    respuesta => {
        if(respuesta.ok){
            return respuesta.json();
        }
    }
).then(
    datos=> {
        for(let i=0; i<datos.results.length; i++){
            console.log(datos.results[i].url);

            fetch(datos.results[i].url)
            .then(respuesta => {
                if(respuesta.ok){
                    return respuesta.json();
                }
            }).then(datos2 => { // se cambia el nombre de datos para que no de conflicto
                console.log(datos2.forms);
                console.log(datos2.sprites.front_default);
                console.log(datos2.name);
                console.log(datos2.stats);
                console.log(datos2.types);
            })
        }
    }
)
.catch(
    error => {
        console.error(error.message);
    }
)