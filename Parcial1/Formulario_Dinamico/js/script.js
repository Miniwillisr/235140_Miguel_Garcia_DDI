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