
/**
 * Erstellt ein Canvas-Objekt und fügt es nach der letzten Region ein
 */
class Canvas {
    Draw = () => { }
    constructor(width = 500, height = 500, parent = document.getElementsByClassName('t-Body-contentInner')[0]) {
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.DOM = document.createElement('canvas');
        this.DOM.width = width;
        this.DOM.height = height;
        parent.appendChild(this.DOM);

        this.g = this.DOM.getContext("2d");
        this.center = { x: this.height/2, y: this.width/2 }



        this.INTERVAL = setInterval(() => {
            this.Draw();
        });
    }

    resetInterval = (msec) => {
        clearInterval(this.INTERVAL);
        this.INTERVAL = setInterval(() => {
            this.Draw();
        }, msec);
    }

    pixlength = 20;

    setResolution = (width, height = null) => {

        if (!height) height = width;

        this.width = width;
        this.height = height;
        this.DOM.width = width;
        this.DOM.height = height;
    }


    drawGrid = (dx,dy,color = "red") => {

        this.g.strokeStyle = color;
        this.g.fillStyle = color;

        

        this.g.beginPath()
        this.g.moveTo(0, this.center.y);
        this.g.lineTo(this.width, this.center.y);
        this.g.stroke();

        this.g.beginPath()
        this.g.moveTo(this.center.x, 0);
        this.g.lineTo(this.center.x, this.height);
        this.g.stroke();

        for (let i = 0; i * this.pixlength < this.height; i++) {

            if (i % dy == 0) {

                this.g.beginPath()
                this.g.moveTo(0, i * this.pixlength +this.center.y%(this.pixlength*dy));
                this.g.lineTo(this.width, i * this.pixlength+this.center.y%(this.pixlength*dy));
                this.g.stroke();
            }
            if (i % 10 == 0) {

                this.g.beginPath()
                this.g.moveTo(this.center.x-5, i * this.pixlength +this.center.y%(this.pixlength*dy));
                this.g.lineTo(this.center.x+5, i * this.pixlength +this.center.y%(this.pixlength*dy));
                this.g.stroke();
            }
        }
        for (let i = 0; i * this.pixlength < this.width; i++) {

            if (i % dx == 0) {

            this.g.beginPath()
            this.g.moveTo(i * this.pixlength +this.center.x%(this.pixlength*dx), 0);
            this.g.lineTo(i * this.pixlength +this.center.x%(this.pixlength*dx), this.height);
            this.g.stroke();
            }
            
            if (i % 10 == 0) {

                this.g.beginPath()
                this.g.moveTo(i * this.pixlength +this.center.x%(this.pixlength*dx), this.center.y+5);
                this.g.lineTo(i * this.pixlength +this.center.x%(this.pixlength*dx), this.center.y-5);
                this.g.stroke();
            }
        }


        this.g.fillRect(this.center.x - this.pixlength / 4, this.center.y - this.pixlength / 4, this.pixlength / 2, this.pixlength / 2)
    }

    fillPixel = (x, y, color = null) => {
        if (color) this.g.fillStyle = color;
        this.g.fillRect(x * this.pixlength, y * this.pixlength, this.pixlength, this.pixlength);
    }

    clear = () => {
        this.g.clearRect(0, 0, this.width, this.height);
    }
    fill = (color) => {
        this.g.fillStyle = color;
        this.g.fillRect(0, 0, this.width, this.height);
    }

    fillRect = (x, y, width, height, color = null) => {
        if (color) this.g.fillStyle = color;
        this.g.fillRect(x * this.pixlength, y * this.pixlength, width * this.pixlength, height * this.pixlength);
    }

}


class CanvasObject {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Rect extends CanvasObject {
    angle = 0;
    constructor(x, y, width, height, color) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    rotate = (rot) => this.angle += rot;

    /**
     * 
     * @param {Canvas} canvas 
     */
    draw = (canvas) => {

        canvas.g.fillStyle = this.color;
        canvas.g.translate(this.x + canvas.center.x, this.y + canvas.center.y);
        canvas.g.rotate(this.angle);
        canvas.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        canvas.g.rotate(-this.angle);
        canvas.g.translate(-this.x - canvas.center.x, -this.y - canvas.center.y);
    }
}
