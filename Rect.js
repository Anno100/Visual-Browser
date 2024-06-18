
console.log("Starte Rect...");
class Rect extends gameObject{
    constructor(x, y, w, h, color = "black") {
        super(x,y,color);
        this.w = w;
        this.h = h;
    }


    draw = (g) => {
        g.setFillStyle(this.color);
        g.translate(this.x + g.parent.width/2, this.y + g.parent.height/2);
        g.rotate(this.angle);
        g.fillRect(-this.w / 2 , -this.h / 2, this.w, this.h);
        g.rotate(-this.angle);
        g.translate(-this.x - g.parent.width/2, -this.y -  g.parent.height/2);
    };

    drawTo = (g,other) => g.fillLine(this.x,this.y,other.x,other.y);
    
}
console.log("End Rect...");


