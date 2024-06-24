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
    };

}
