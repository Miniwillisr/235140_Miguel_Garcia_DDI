class Figura {
    constructor(posicionesCursor =  {}, colorLinea = 'black', colorRelleno = 'black', grosorLinea = 5) { //Lo mejor es inicar las variables por si el usuario no las ingresa

        this.posicionX = Math.min(posicionesCursor.iniciales.x, posicionesCursor.finales.x);
        this.posicionY = Math.min(posicionesCursor.iniciales.y, posicionesCursor.finales.y);

        this.alto = Math.abs(posicionesCursor.finales.y - posicionesCursor.iniciales.y);
        this.ancho = Math.abs(posicionesCursor.finales.x - posicionesCursor.iniciales.x);
        
        this.colorLinea = colorLinea;
        this.colorRelleno = colorRelleno;
        this.grosorLinea = grosorLinea;
    }
}

export class Cuadrado extends Figura { //export para poder usar la clase en otros archivos
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.fillRect(this.posicionX, this.posicionY, this.ancho, this.alto);
        ctx.strokeRect(this.posicionX, this.posicionY, this.ancho, this.alto);
    }
}

//Tarea hacer un criculo
