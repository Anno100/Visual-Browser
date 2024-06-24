

/**
 * ___
 * Erstellt ein Canvas-Objekt mit direktem Zugriff auf sein Graphics-Objekt
 *
 * @param {String} p_id
 * @param {Number} width
 * @param {Number} height
 * @returns {{c:HTMLCanvasElement,g:{arc: (x: any, y: any, radius: any) => void;beginPath: () => void;clear: () => void;clearRect: (x: any, y: any, w: any, h: any) => void;fill: () => void;fillLine: (x1: any, y1: any, x2: any, y2: any) => void;fillRect: (x: any, y: any, w: any, h: any) => void;setFillStyle: (color: any) => void;rotate: (angle: any) => void;translate: (x: any, y: any) => void;},Draw:Function,id:String,width:Number,height:Number}}
 */
const createCanvas = (p_id, width=100, height=100) => {

    //Canvas
    let canvas = document.createElement("canvas");
    canvas.id = p_id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "solid";
    document.body.appendChild(canvas);
    document.body.appendChild(document.createElement("br"));
    //document.body.innerHTML += '<br>';

    //Graphics
    let graphics = canvas.getContext("2d");


    let ret = {
        c: canvas,
        graphics:graphics,
        g: {
            /**
             * Draw a Circle
             * @param {Number} x 
             * @param {Number} y 
             * @param {Number} radius 
             * @returns 
             */
            arc:(x,y,radius)=>graphics.arc(x,y,radius,0,2*Math.PI),
            beginPath:()=>graphics.beginPath(),
            clear:()=>graphics.clearRect(width/2,0,width,height),
            clearRect:(x,y,w,h)=>graphics.clearRect(x,y,w,h),
            fill:()=>graphics.fill(),
            /**
             * 
             * @param {Number} x1 
             * @param {Number} y1 
             * @param {Number} x2 
             * @param {Number} y2 
             */
            fillLine:(x1,y1,x2,y2)=>{
                graphics.beginPath();
                graphics.moveTo(x1 + canvas.width/2,y1 + canvas.height/2);
                graphics.lineTo(x2 + canvas.width/2,y2 + canvas.height/2);
                graphics.stroke();
            },
            /**
             * 
             * @param {Number} x 
             * @param {Number} y 
             * @param {Number} w 
             * @param {Number} h 
             * @returns 
             */
            fillRect:(x,y,w,h)=>graphics.fillRect(x,y,w,h),
            setFillStyle:(color)=>{graphics.fillStyle = color},
            setStrokeStyle:(color)=>{graphics.strokeStyle = color},
            rotate:(angle)=>graphics.rotate(angle),
            translate:(x,y)=>graphics.translate(x,y),
        },
        id: p_id,
        Draw: () => { },
        resize: (w,h) => {
            canvas.width = w;
            canvas.height = h;
            ret.width = w;
            ret.height = h;
        },
        width: width,
        height: height
    };
    ret.g.parent = ret;

    setInterval(() => { ret.Draw(); }, 1);


    return ret;
};

