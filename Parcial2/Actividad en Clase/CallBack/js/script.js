/*setTimeout(()=>{
    console.log("Esto es un Callback");
}, 1000);
*/
console.log("Esto es el final");
class Usuario{
    constructor(nombre, correo){
        this.nombre = nombre;
        this.correo = correo;
    }
    callback(funcion){
        if( typeof funcion === "function"){
            console.log("Ejecutando la función callback");
            funcion(this.nombre, this.correo);
        }
    }
}

const usuarioActual= new Usuario("Miguel", "miguel@example.com");
usuarioActual.callback((nombre, correo)=>{
    console.log("Funcion que envio desde el objeto usuario",nombre, correo);
    //console.log(`Nombre: ${nombre}, Correo: ${correo}`);
});