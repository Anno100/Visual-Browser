class gameObject {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.color = color;
    }
    rotate = (angle) => {
        this.angle += angle;
    };

}
