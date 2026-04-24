class Figura { //Clase padre, Solo propiedades genericas
    constructor(posicionesCursor, colorLinea, colorRelleno, grosorLinea) { //Lo mejor es inicar las variables por si el usuario no las ingresa
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.colorLinea = colorLinea;
        this.grosorLinea = grosorLinea;

        this.colorLinea = colorLinea;
        this.colorRelleno = colorRelleno;
        this.grosorLinea = grosorLinea;
    }
}

//Dibuja un Cuadrado
export class Cuadrado extends Figura { //export para poder usar la clase en otros archivos
    constructor(posicionesCursor, colorLinea, colorRelleno, grosorLinea) {
        super(colorLinea, colorRelleno, grosorLinea); //Llamamos al constructor de la clase padre para inicializar las variables genericas
        this.posicionX = Math.min(posicionesCursor.iniciales.x, posicionesCursor.finales.x);
        this.posicionY = Math.min(posicionesCursor.iniciales.y, posicionesCursor.finales.y);
       
        this.alto = Math.abs(posicionesCursor.finales.y - posicionesCursor.iniciales.y);
        this.ancho = Math.abs(posicionesCursor.finales.x - posicionesCursor.iniciales.x); 
    }
    
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.fillRect(this.posicionX, this.posicionY, this.ancho, this.alto);
        ctx.strokeRect(this.posicionX, this.posicionY, this.ancho, this.alto);
        ctx.closePath();
    }
}


//Dibuja un criculo
export class Circulo extends Figura {
    constructor(posicionesCursor = {}, colorLinea = 'black', colorRelleno = 'black', grosorLinea = 5) {  //Se pueden inicializar valores para que el usuario no los ingrese
        super(colorLinea, colorRelleno, grosorLinea); //Super para llamar al constructor de la clase padre y inicializar las variables genericas
        //El centro del circulo es el punto exacto donde se hace click
        this.centroX = (posicionesCursor.iniciales.x + posicionesCursor.finales.x) / 2;
        this.centroY = (posicionesCursor.iniciales.y + posicionesCursor.finales.y) / 2;

        //Calculamos el radio utilizando la distancia entre las posiciones iniciales y finales utilizando el teorema de pitagoras.
        let catetoX = posicionesCursor.finales.x - posicionesCursor.iniciales.x;
        let catetoY = posicionesCursor.finales.y - posicionesCursor.iniciales.y;
        this.radio = Math.sqrt((catetoX * catetoX) + (catetoY * catetoY)) / 2; //El radio es la mitad de la distancia entre las posiciones iniciales y finales
        // Si no se divide entre 2, el circulo se dibujaria con un radio igual a la distancia entre las posiciones iniciales y finales 
    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        //.arc pide x, y, radio, anguloInicial, anguloFinal, y Math.PI * 2 es el angulo completo para dibujar un circulo completo
        ctx.arc(this.centroX, this.centroY, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

//Dibuja una linea
export class Linea {
    constructor(posicionesCursor, colorLinea = 'black', grosorLinea = 5) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.colorLinea = colorLinea;
        this.grosorLinea = grosorLinea;

    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.lineCap = "round"; //Para que las lineas se vean mas suaves
        ctx.lineJoin = "round"; // Para que la union de las lineas se vea mas suave
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y); //Punto de Inicio
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y);
        ctx.stroke();
        ctx.closePath();
    }
}

//Sticker
export class Sticker {
    constructor(posicionesCursor, urlImagen) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.imagen = new Image();
        this.imagen.src = urlImagen;

    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height,
            this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y, this.imagen.width/2, this.imagen.height/2
        );

    }
}