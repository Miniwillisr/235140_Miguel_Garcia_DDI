/*function LeerArchivo(event) {
    const archivo = event.target.files[0];
    if (archivo) {
        if (archivo.type === "image/jpeg" || archivo.type === "image/png") {
            const lectorArchivo = new FileReader();

            lectorArchivo.onload = function (elemento) {
                const urlImagen = elemento.target.result;
                const imagen = new Image();
                imagen.src = urlImagen;
                document.body.appendChild(imagen);
            }

            lectorArchivo.readAsDataURL(archivo); //Funciona con readAsDataURL para mostrar la imagen, pero con readAsText no se muestra la imagen
        } else {
            console.log("Archivo en silla de ruedas");
        }
    } else {
        console.log("Esta mal");
    }
}*/

document.querySelector("#inputIMG").addEventListener("change", (event) => {
    const url = LeerArchivo(event.target.files[0]);
    url.then((dato) => {
        const imagen = new Image();
        imagen.src = dato;
        document.body.appendChild(imagen);
    }).catch(() => {
        console.log("Error al cargar la imagen");
    });
});


// con Promesas
    function LeerArchivo(archivo) {
        return new Promise((resolve, reject) => {
            if (archivo) {
                if (archivo.type === "image/jpeg" || archivo.type === "image/png") {
                    const lectorArchivo = new FileReader();

                    lectorArchivo.onload = (elemento) => {
                        const urlImagen = elemento.target.result;
                        resolve(urlImagen);
                    }

                    lectorArchivo.readAsDataURL(archivo);
                } else {
                    reject("Tipo de archivo no válido");
                }
            } else {
                reject("No se seleccionó ningún archivo");
            }
        });
    }
