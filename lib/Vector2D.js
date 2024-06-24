let check_Vector2D = setInterval(() => {

    if (gameObject) {
        Vector2D = class Vector2D extends gameObject {
            constructor(x, y, color = "black") {
                super(x, y, color);
            }



            draw = (g) => {
                g.setStrokeStyle(this.color);
                //g.translate(g.parent.width / 2,g.parent.height / 2);
                g.rotate(this.angle);
                g.fillLine(0,0,this.x,this.y);
                g.rotate(-this.angle);
                //g.translate(-g.parent.width / 2, -g.parent.height / 2);
            };
        }
        load_vector2d = true;
        clearInterval(check_Vector2D);

    }
    else {
        console.log("wait");
    }

}, 1);