class Circle extends gameObject {
    constructor(x, y, r, color = "black") {
        super(x, y, color);
        this.r = r;
    }


    draw = (g) => {
        g.setFillStyle(this.color);
        g.translate(this.x + g.parent.width / 2, this.y + g.parent.height / 2);
        g.rotate(this.angle);
        g.beginPath();
        g.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        g.fill();
        g.rotate(-this.angle);
        g.translate(-this.x - g.parent.width / 2, -this.y - +g.parent.height / 2);
    };
}
