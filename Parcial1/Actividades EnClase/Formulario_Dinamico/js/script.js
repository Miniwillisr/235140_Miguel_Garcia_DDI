const nombre = document.querySelector("#input-txt-nombre");
const apellido = document.querySelector("#input-txt-apellido");
const botonConfi = document.querySelector("#btn-confi");

botonConfi.addEventListener("click",(e)=>{
    e.preventDefault();
    const usuario= new Usuario(nombre.value,apellido.value);
    console.log(usuario);
    const nombre_info = document.createElement("h2"); //Metodo que crea elementos
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);  //muestra la informacion
});

function cambiarNumero(event){
        console.log(event.target.value);
        const contenido = document.querySelector("#contenedor_correos");
        contenido.innerHTML = ""; //Limpia la etiqueta antes de empezar
        
        for(let i =1; i <= event.target.value; i++){
            //Se agrega contenido usando la insecion de html por medio del Innerhtml, que agrega todo lo que esta dentro de htmlAgregar
            //Este metodo reemplaza todo lo que esta dentro de la etiquta por lo nuevo
            const htmlAgregar= `<label for="correo-${i}">Ingrese El Correo ${i}</label>
            <input type="email" name="correo-${i}" id="correo-${i}">
            <br>`;
            contenido.innerHTML += htmlAgregar;
        }
}

/*nombre.addEventListener("change", (e)=>{
    console.log(e.target.value);
    const usuario= new Usuario(e.target.value);
    console.log(usuario);
});
apellido.addEventListener("change", (e)=>{
    console.log(e.target.value);
    const usuario= new Usuario(e.target.value);
    console.log(usuario);
});
*/

class Usuario{
    constructor(nom, ape){
        this.nombre= nom;
        this.apellido= ape;
    }
}