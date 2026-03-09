const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(async function () {
        if (exito) {
            resolve("La tarea Finalizo");
            return "La tarea Finalizo";
        } else {
            reject("La tarea Fallo");
            return "La tarea Fallo";
        }
    }, 1000);
});

async function funcionPrincipal() {
    const resultado= await promesa.then((resultado) => {
        console.log(resultado);
    })
        .catch((error) => {
            console.error(error);
        });

    console.log("Se puede hacer la siguiente tarea", resultado);
}

/*let peticionFetch = new Promise((resolve, reject) => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetch(url).then((resultado) => {
        if (resultado.ok) {
            resolve(resultado.json());
        }
    }).then((datos) => {
        resolve(datos);
    }).catch((error) => {
        reject(error);
    });
});

peticionFetch.then((resultadoPeticion) => {
    console.log(resultadoPeticion);
}).catch((error) => {
    console.error(error);
});
*/

//promesa para una pantalla de carga con espera de 2 segundos
/*
let pantallaCarga = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function() {
        if (exito) {
            resolve("La pantalla de carga ha concluido");
        } else {
            reject("La pantalla de carga fallo");
        }
    }, 2000);
});

pantallaCarga.then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.error(error);
});
*/
//promesa para una pantalla de carga con espera de 2 segundos utilizando eventListener
/*
let pantallaCarga2 = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function() {
        if (exito) {
            resolve("La pantalla de carga ha concluido");
        } else {
            reject("La pantalla de carga fallo");
        }}, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
    pantallaCarga2.then((resultado) => {
        console.log(resultado);
    }).catch((error) => {
        console.error(error);
    });
});
*/