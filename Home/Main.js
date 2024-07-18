class Canvas {

    /**@type {Number} */
    width;
    /**@type {Number} */
    height;
    /**@typedef {{width:Number,height:Number,depth:Number,angle:Number}} */
    pix = { width: 1, height: 1, depth: 0, angle: 0 }

    /**@typedef {{x:Number,y:Number}} */
    center = { x: 0, y: 0 }

    update = () => { }
    draw = () => { }

    /**
     * 
     * @param {Number} p_width 
     * @param {Number} p_height 
     * @param {HTMLElement} p_parent 
     */
    constructor(p_width = 100, p_height = 100, p_parent = document.body) {

        //Create Canvas
        this.get = document.createElement('canvas');
        this.get.style.borderStyle = 'solid';
        this.setScreenSize(p_width, p_height);


        //Add Canvas to parent
        p_parent.appendChild(this.get);
        this.parent = p_parent;

        //Create Graphics
        this.g = this.get.getContext("2d");


        //Start Update-Interval
        this.update_interval = setInterval(() => {
            this.update();
        });

        //Start Draw-Interval
        this.draw_interval = setInterval(() => {
            this.draw();
        });

    }
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    setScreenSize = (p_width, p_height) => {
        this.width = p_width;
        this.height = p_height;
        this.get.width = p_width;
        this.get.height = p_height;
        return this;
    }

    setColor = (p_color) => {
        this.g.fillStyle = p_color;
        this.g.strokeStyle = p_color;
        return this;
    }

    setCenter = (x, y) => {
        this.center.x = x;
        this.center.y = y;
        return this;
    }
    setPixels = (w, h) => {
        this.pix.width = w;
        this.pix.height = h;
        return this;
    }


    drawLine = (x1, y1, x2, y2) => {
        this.g.beginPath();
        this.g.moveTo(x1, y1);
        this.g.lineTo(x2, y2);
        this.g.stroke();

        return this;
    }
    drawGrid = () => {


        let g = this.g;
        g.beginPath();
        g.moveTo(this.center.x * this.pix.width, 0);
        g.lineTo(this.center.x * this.pix.width, this.height);
        g.stroke();

        g.beginPath();
        g.moveTo(0, this.center.y * this.pix.width);
        g.lineTo(this.width, this.center.y * this.pix.width);
        g.stroke();

        this.fillRect(0, 0, 10 / this.pix.width, 10 / this.pix.height, 0, 'red');
        return this;

    }


    /**
     * 
     * @param {CanvasFillStrokeStyles.fillStyle.color} p_color 
     */
    fill = (p_color = null) => {
        if (p_color) this.g.fillStyle = p_color;
        this.g.fillRect(0, 0, this.width, this.height);
        return this;
    }

    fillRect = (p_x, p_y, p_width, p_height, p_angle = 0, p_color = null) => {

        //change for pixelsize
        p_x *= this.pix.width;
        p_y *= this.pix.height;
        p_width *= this.pix.width;
        p_height *= this.pix.height;
        const v_center = { x: this.center.x * this.pix.width, y: this.center.y * this.pix.height }

        if (p_color) this.g.fillStyle = p_color;
        p_angle = Math.PI * p_angle / 180;

        this.g.translate(p_x + v_center.x, p_y + v_center.y);
        this.g.rotate(p_angle);
        this.g.fillRect(-p_width / 2, -p_height / 2, p_width, p_height);
        this.g.rotate(-p_angle);
        this.g.translate(-p_x - v_center.x, -p_y - v_center.y);

        return this;
    }

    clear = () => {
        this.g.clearRect(0, 0, this.width, this.height);
        return this;
    }

    toFullScreen = () => {
        //this.parent.requestFullscreen();
        this.setScreenSize(window.innerWidth - 25, window.innerHeight - 30);
        return this;
    }

    toString = () => {
        return `Screen: ${this.width}x${this.height}`;
    }
}



function Main() {
    let dragging = true;
    

    const c = new Canvas(500,500).setPixels(20,2);
    
    document.body.onmousemove = (e) => {
        c.setCenter(e.offsetX / c.pix.width,e.offsetY / c.pix.height);
        
    }

    c.update = () => {

    }


    c.draw = () => {
            c.fill('green')
            .drawGrid()
        

        console.log(c.toString())

    }




}