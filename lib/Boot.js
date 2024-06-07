
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