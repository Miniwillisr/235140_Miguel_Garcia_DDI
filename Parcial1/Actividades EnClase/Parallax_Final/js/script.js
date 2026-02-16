const titulo= document.querySelector("#titulo");
const cocinera= document.querySelector("#cocinera");
const doro= document.querySelector("#doro");
const legiana= document.querySelector("#legiana");

window.addEventListener("scroll", (event)=>{
    //console.log(window.screenY)
    titulo.style.right = window.scrollY *3 +"px";

    cocinera.style.right= window.scrollY *2 +"px";
    cocinera.style.bottom= window.scrollY *2 +"px";

    doro.style.right= window.scrollY *2 +"px";

    legiana.style.left= window.scrollY *3 +"px";
    legiana.style.top= window.scrollY *2 +"px";  
})