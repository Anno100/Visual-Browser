gameObject = class gameObject {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.color = color;
        this.type = this.constructor.name;
    }
    rotate = (angle) => {
        this.angle += angle;
    }
    overlap = (other) => {
        return false;
    }
    
    drawTo = (g, other) => g.fillLine(this.x + g.parent.center.x, this.y + g.parent.center.y, other.x + g.parent.center.x, other.y + g.parent.center.y);

}
