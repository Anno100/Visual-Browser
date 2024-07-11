/**
 * Erstellt ein Canvas-Objekt und fügt es nach der letzten Region ein
 */


class CanvasObject{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Rect extends CanvasObject{
    constructor(x,y,width,height,color){
        super(x,y,color);
        this.width = width;
        this.height = height;
    }

    draw = (canvas) => canvas.fillRect(this.x,this.y,this.width,this.height,this.color);
}
