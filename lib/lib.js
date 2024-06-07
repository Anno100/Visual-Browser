
const gc = {}
const c = document.createElement('canvas');
c.style.borderStyle = 'solid';


c.width = window.innerWidth-10;
c.height = window.innerHeight-10;

document.body.style.backgroundColor = 'white'
document.body.style.margin = '0';


document.body.appendChild(c);

const g = c.getContext('2d');

g.font = '20px Arial';

/**
 * Graphics Objects Draw from Center of Canvas!
 */

gc.setFontSize = (size) => {g.font = `${size}px ${g.font.split(' ')[1]}`};
gc.getFontSize = () => Number(g.font.split('px')[0]);


/**
 * Set Background-Color
 * @param {string|CanvasGradient|CanvasPattern} color 
 */
gc.setBackgroundColor = (color) => {
    c.parentNode.style.backgroundColor = color;
}

/**
 * Set current Fill-Color
 * @param {string|CanvasGradient|CanvasPattern} color 
 */
gc.setFillColor = (color) => {
    g.fillStyle = color;
}


/**
 * Draw in Canvas From Center
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height
 * @param {string|CanvasGradient|CanvasPattern|null} color 
 */
gc.fillRect = (x,y,width,height,color=null) => {
    if(color) gc.setFillColor(color);
    g.fillRect(c.width/2 + x,c.height/2 + y,width,height);
}


/**
 * Fill complete Canvas
 * @param {string|CanvasGradient|CanvasPattern} color 
 */
gc.fill = (color) => {
    gc.fillRect(-c.width/2,-c.height/2,c.width,c.height,color);
}

/**
 * Clear Canvas
 */
gc.clear = () => {
    g.clearRect(0,0,c.width,c.height);
}

/**
 * Clear part of Canvas
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height
 */
gc.clearRect = (x,y,width,height) => {
    g.clearRect(c.width/2 + x,c.height/2 + y,width,height);
}


/**
 * Write in Canvas
 * @param {string} txt
 * @param {number} x 
 * @param {number} y 
 * @param {string|CanvasGradient|CanvasPattern|null} color 
 */
gc.fillText = (txt,x,y,color=null) => {
    if(color) gc.setFillColor(color);
    g.fillText(txt,c.width/2 + x,c.height/2 + y+gc.getFontSize());
}

/**
 * Procedure that builds the animations
 */
gc.run = () => {};
gc.update = () => {};

let Updater = setInterval(()=>{
    gc.update();
},1);
let Drawer = setInterval(() => {
    gc.run();
},1);


/**
 * 
 * @param {File} file 
 */
const importJS = (file) => {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}


/**
 * @type {Window & typeof globalThis[]}
 */
let w = []
/**
 * open form in Popup
 * @param {number} width 
 * @param {number} height
 */
function openAsPopup(e,width = 500,height = 500,top=0,left=0) {
    w.push(window.open('about:blank','Popup_Window','titlebar=0,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizeable=0,width='+ width + ',height='+ height +',left = '+left+',top = ' + top,false));
    e.target = 'Popup_Window';
    
}




/***************************************************** */
/**
 * Create an Object
 */
class Obj {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {string|CanvasGradient|CanvasPattern} color   Write Color with name, rgb(r,g,b,t=1) or hexa 0x000000-0xFFFFFF
     */
    constructor(x, y, color) {
        /**@type {number} */
        this.x = x;
        /**@type {number} */
        this.y = y;
        /**@type {string|CanvasGradient|CanvasPattern} */
        this.color = color;

        /** Defines the distance from camera
         * @type {number}*/
        this.z = 0;
    }

    /**
     * 
     * @param {Obj} other 
     */
    overlap = (other) => {
        console.warn("Create overlap for this Obj");
    }
}


/**
 * Create a rectangle
 * @extends Obj
 */
class Rect extends Obj{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string|CanvasGradient|CanvasPattern} color  Write Color with name, rgb(r,g,b,t=1) or hexa 0x000000-0xFFFFFF
     */
    constructor(x,y,width,height,color){
        super(x,y,color);
        
        /**@type {number} */
        this.width = width;
        
        /**@type {number} */
        this.height = height;
        
    }

    
/**
 * Transform
 * @param {number} dx 
 * @param {number} dy 
 */
    transform = (dx,dy) => {
        return new Rect(this.x + dx, this.y + dy, this.width, this.height);
    }

    /**Transform to top border */
    transform_TopBorder = () => {
        return this.transform(0,-c.height/2 + this.height/2);
    }
    /**Transform to top border */
    transform_BottomBorder = () => {
        return this.transform(0,c.height/2 - this.height/2);
    }
    /**Transform to left border */
    transform_LeftBorder = () => {
        return this.transform(-c.width/2 + this.width/2,0);
    }
    /**Transform to left border */
    transform_RightBorder = () => {
        return this.transform(c.width/2 - this.width/2,0);
    }


/**
 * 
 * @param {Rect} other 
 */
    overlap_right = (other) => new Rect(this.x + 0.49 * this.width,this.y,0.01*this.width,this.height).overlap(other);
    overlap_left = (other) => new Rect(this.x - 0.5 * this.width,this.y,0.01*this.width,this.height).overlap(other);
    overlap_up = (other) => new Rect(this.x - 0 * this.width,this.y - 0.5 * this.height,this.width,0.01*this.height).overlap(other);
    overlap_down = (other) => new Rect(this.x - 0 * this.width,this.y + 0.49 * this.height,this.width,0.01*this.height).overlap(other);
    
/**
 * 
 * @param {Rect} other 
 */
    overlap = (other) => this.x+this.width/2 > other.x - other.width/2 && other.x+other.width/2 > this.x - this.width/2 &&
                        this.y+this.height/2 > other.y - other.height/2 && other.y+other.height/2 > this.y - this.height/2;

    draw = () => {
        gc.setFillColor(this.color);
        gc.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    }

    /**
     * 
     * @param {Rect} rect 
     * @returns {Rect}
     */
    copy = () => {
        return new Rect(this.x,this.y,this.width,this.height,this.color);
    }

    toString = () => {
        return `{x:${this.x},y:${this.y},width:${this.width},height:${this.height},color:${this.color}}`;
    }


}
const Mouse = {x:-1,y:-1,click:false,mousedown:false,mouseup:false}

c.onmouseenter = (e) => {
    Mouse.x = e.offsetX-c.width/2;
    Mouse.y = e.offsetY-c.height/2;

}

c.onmousemove = (e) => {
    Mouse.x = e.offsetX-c.width/2;
    Mouse.y = e.offsetY-c.height/2;
}

c.onclick = () => {
    Mouse.click = true;
    setTimeout(()=>{Mouse.click = false},5);
}
c.onmousedown = () => {
    Mouse.mousedown = true;
}

c.onmouseup = () => {
    Mouse.mousedown = false;
    Mouse.mouseup = true;
    setTimeout(()=>{Mouse.mouseup = false},5);
}

c.onmouseleave = () => {
    Mouse.mousedown = false;
}
