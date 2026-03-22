const modalLogin = document.querySelector('#modalLogin');
const formInicio = document.querySelector('#formInicioBlockbuster');
const btnIngresar = document.querySelector('#btnIngresar');
const btnIrRegistro = document.querySelector('#btnIrRegistro');

// Seleccionamos los enlaces del menú de navegación (usando los href como referencia)
const linkSubirArchivo = document.querySelector('a[href="./Paginas/SubirArchivo/SubirArchivo.html"]');
const linkCerrarSesion = document.querySelector('a[href="#"]'); // El que tiene href="#"
const linkPerfil = document.querySelector('#navPerfil');

// Obserbador de sesión
function verificarSesion() {
    // Buscamos si hay un usuario activo guardado
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogeado'));

    if (usuarioActivo) {
        // Si hay un usuario activo
        modalLogin.style.display = 'none'; // Ocultamos el cuadro de login
        linkCerrarSesion.style.display = 'block'; // Mostramos la opción de salir

        if(linkPerfil)
            linkPerfil.style.display='block'; // muestra el Perfil

        // Verificamos el booleano 'administrador'
        if (usuarioActivo.administrador === true) {
            linkSubirArchivo.style.display = 'block'; // Mostrar a los admins
        } else {
            linkSubirArchivo.style.display = 'none'; // Ocultar a los visitantes
        }
    } else {
        // Si no hay un usuario activo
        modalLogin.style.display = 'flex'; // Obligamos a ver el cuadro de login
        linkCerrarSesion.style.display = 'none'; // Ocultamos la opción de salir
        linkSubirArchivo.style.display = 'none'; // Por seguridad, ocultamos subir archivo
    
        if(linkPerfil)
            linkPerfil.style.display='none'; //oculta el perfil
    }
}

// La función se ejecutará apenas cargue la página
window.addEventListener('load', () => {
    // Primero revisa si hay una sesión activa.
    verificarSesion(); 
    // Luego cargamos la cartelera dinámica.
    renderizarCartelera();
});

// Inicio de sesión
btnIngresar.addEventListener('click', () => {
    const correo = document.querySelector('#inicioCorreo').value.trim();
    const contra = document.querySelector('#inicioContra').value;

    if (!correo || !contra) {
        alert("Por favor, ingresa tu correo y contraseña.");
        return;
    }

    // Traemos la lista de usuarios (si no hay, devuelve un arreglo vacío)
    const usuariosBlockbuster = JSON.parse(localStorage.getItem('usuariosBlockbuster')) || [];

    // Buscamos a un usuario que tenga el mismo correo Y contraseña
    const usuarioValido = usuariosBlockbuster.find(
        user => user.correo === correo && user.contrasenia === contra
    );

    if (usuarioValido) {
        //Guardamos quién inició sesión en el localStorage
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioValido));
        
        alert(`¡Bienvenido a BlockBuster, ${usuarioValido.nombreCompleto}!`);
        formInicio.reset(); // Limpiamos las cajas
        verificarSesion(); // Llamamos al observador para que actualice la vista y quite el modal
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

// Boton de Registro
btnIrRegistro.addEventListener('click', () => {
    // Como estamos en la raíz (index.html), entramos a las carpetas así:
    window.location.href = './Paginas/Registro/Registro.html';
});

// Cerrar sesión
linkCerrarSesion.addEventListener('click', (evento) => {
    evento.preventDefault(); // Evita que el navegador brinque al inicio de la página por el href="#"
    
    // Borramos la sesión actual del localStorage
    localStorage.removeItem('usuarioLogeado');
    
    // Llamamos al observador, como ya no hay sesión, volverá a poner la pantalla negra
    verificarSesion(); 
});

// Función para la cartelera dinámica
function renderizarCartelera() {
    const contenedor = document.querySelector('#contenedorCartelera');
    
    if (!contenedor) return; // Por seguridad, si no existe el contenedor, salimos.

    // Traemos las películas del localStorage y las convertimos a objeto
    const peliculasDB = JSON.parse(localStorage.getItem('peliculasBlockbuster')) || [];
    // Limpiamos cualquier contenido previo por seguridad
    contenedor.innerHTML = '';

    // Verificamos si hay películas guardadas
    if (peliculasDB.length === 0) {
        // Si no hay películas, mostramos un mensaje
        contenedor.innerHTML = '<p style="color: #94A3B8; grid-column: 1/-1; text-align: center;">Un administrador debe cargar el archivo JSON de películas.</p>';
        return;
    }

    //Se crea una tarjeta por cada película
    peliculasDB.forEach(peli => {
        // Crea la estructura HTML de la tarjeta usando un "Template Literal" (las comillas invertidas ` ` )
        const htmlTarjeta = `
            <div class="peli-card">
                <div class="card-peli-content" style="background-color: ${peli.colorFondo};">
                    </div>
                <div class="card-peli-info">
                    <h3 class="card-peli-title">${peli.titulo}</h3>
                    <p class="card-peli-review">${peli.resena}</p>
                </div>
            </div>
        `;
        // Agregamos la tarjeta al contenedor
        contenedor.innerHTML += htmlTarjeta;
    });
}

