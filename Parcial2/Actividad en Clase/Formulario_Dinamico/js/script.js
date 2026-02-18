const nombre = document.querySelector("#input-txt-nombre");
const apellido = document.querySelector("#input-txt-apellido");
const botonConfi = document.querySelector("#btn-confi");

const Usuarios = [{ //1
    nombre: "Maria ",
    apellido: "Castro ",
    correo: "maria.castro@example.com",
    contraseña: "contraseña123",
    },                                                                       
    {//2
    nombre: "Amancio ",
    apellido: "Torres ",
    correo: "amancio.torres@example.com",
    contraseña: "contraseña456",
    },
    {//3
    nombre: "Miguel ",
    apellido: "Garcia ",
    correo: "miguel.garcia@example.com",
    contraseña: "contraseña789",
    },
    {//4
    nombre: "Luis ",
    apellido: "Peña ",
    correo: "luis.pena@example.com",
    contraseña: "contraseña101112",
    },
    {//5
    nombre: "Jesus ",
    apellido: "Gonzalez ",
    correo: "jesus.gonzalez@example.com",
    contraseña: "contraseña131415",
    },
    {//6
    nombre: "Ana ",
    apellido: "Hernandez ",
    correo: "ana.hernandez@example.com",
    contraseña: "contraseña161718",
    },
    {//7
    nombre: "Pepe ",
    apellido: "Torres ",
    correo: "pepe.torres@example.com",
    contraseña: "contraseña192021",
    },
     {//8
    nombre: "Benito ",
    apellido: "Juarez ",
    correo: "benito.juarez@example.com",
    contraseña: "contraseña222324",
    },
    {//9
    nombre: "Luis ",
    apellido: "Serna ",
    correo: "luis.serna@example.com",
    contraseña: "contraseña252627",
    },
    {//10
    nombre: "Roberto ",
    apellido: "Lopez ",
    correo: "roberto.lopez@example.com",
    contraseña: "contraseña282930",
    }
]; 

botonConfi.addEventListener("click",(e)=>{
    e.preventDefault();
    const usuario= new Usuario(nombre.value,apellido.value);
    console.log(usuario);
    const nombre_info = document.createElement("h2"); //Metodo que crea elementos
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);  //muestra la informacion

    guardarDatos(usuario);
    guardarDatos= ()=>{
        console.log("Guardando Datos...");
    };
    guardarDatos();
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

    mostrarDatos(){
        console.log(`Nombre: ${this.nombre} Apellido: ${this.apellido}`);
    }
}

//Se creo un objeto y se adigno a una constante.
let usuario2 = { //aqui el profe puso Let
    nombre: "Juan",
    apellido: "Perez",
    Edad: 28,
    mostrarDatos: function(){
        console.log(`Nombre: ${this.nombre} 
            Apellido: ${this.apellido} 
            Edad: ${this.Edad}`);
    }
}

//Nos permite Guardar nombres dentro de una constante
let guardarDatos = (usuario)=>{
    usuario.mostrarDatos();
    usuario2.mostrarDatos();
    usuario2.nombre = "Nuevo Nombre";
    usuario2.mostrarDatos();
}