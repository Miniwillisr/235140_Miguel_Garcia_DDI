// Verificamos si el usuario es administrador
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogeado'));

// Si no hay usuario logeado O el usuario NO es administrador, lo expulsamos al inicio
if (!usuarioActivo || usuarioActivo.administrador !== true) {
    alert("Acceso denegado. Solo los administradores pueden ver esta página.");
    window.location.href = "../../index.html";
}

const btnCargarJSON = document.querySelector('#btnCargarJSON');
const inputArchivo = document.querySelector('#archivoJSON');
const linkCerrarSesion = document.querySelector('#navCerrarSesion');

// Logica JSON
btnCargarJSON.addEventListener('click', () => {
    // Verificamos si el usuario seleccionó un archivo
    if (inputArchivo.files.length === 0) {
        alert("Por favor, selecciona un archivo JSON primero.");
        return;
    }

    // Tomamos el primer archivo que seleccionó
    const archivo = inputArchivo.files[0];

    // Creamos un "Lector de Archivos"
    const lector = new FileReader();

    // Le decimos qué hacer CUANDO termine de leer el archivo
    lector.onload = function(evento) {
        try {
            // El resultado de la lectura es texto, así que lo convertimos a un objeto JavaScript (JSON)
            const contenidoJSON = JSON.parse(evento.target.result);

            // Guardamos esas películas en el localStorage
            localStorage.setItem('peliculasBlockbuster', JSON.stringify(contenidoJSON));

            alert("¡Cartelera actualizada con éxito! Las reseñas se han guardado.");
            
            // Redirigimos al usuario al inicio para que vea la nueva cartelera
            window.location.href = "../../index.html";

        } catch (error) {
            alert("Error: El archivo no es un JSON válido o está mal escrito.");
            console.error(error);
        }
    };

    // Finalmente, le damos la orden de leer el archivo como texto
    lector.readAsText(archivo);
});

// Logica para cerrar sesión
if (linkCerrarSesion) {
    linkCerrarSesion.addEventListener('click', (evento) => {
        evento.preventDefault();
        localStorage.removeItem('usuarioLogeado');
        alert("Sesión cerrada correctamente.");
        window.location.href = "../../index.html"; 
    });
}