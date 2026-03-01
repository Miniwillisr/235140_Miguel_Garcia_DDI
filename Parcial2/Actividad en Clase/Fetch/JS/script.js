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
        const contenedor = document.querySelector("#pokeCont");

        for(let i=0; i<datos.results.length; i++){
            console.log(datos.results[i].url);

            fetch(datos.results[i].url)
            .then(respuesta => {
                if(respuesta.ok){
                    return respuesta.json();
                }
            }).then(datos2 => { // se cambia el nombre de datos para que no de conflicto
               //se crea la tarjeta y sus datos como en la practica anterior
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-Pokemon");

                const imagen = document.createElement("img");
                imagen.src = datos2.sprites.front_default;
                imagen.alt = `Imagen de ${datos2.name}`; //texto por si la imagen no carga

                const nombre = document.createElement("h3");
                nombre.textContent = datos2.name;

                const info = document.createElement("p");
                const tipos = datos2.types.map(typeInfo => typeInfo.type.name).join(", "); //Muestra todos los tipos y los une con una coma
                //const tipos = datos2.types[0].type.name; solo muestra el primer tipo
                info.textContent = `Tipo: ${tipos}`;

                tarjeta.appendChild(imagen);
                tarjeta.appendChild(nombre);
                tarjeta.appendChild(info);
                contenedor.appendChild(tarjeta);
            })
        }
    }
)
.catch(
    error => {
        console.error(error.message);
    }
)