
class Canvas {
    constructor(width, height, id = null) {
        this.width = width;
        this.height = height;


        this.element = document.createElement('canvas');
        this.element.width = width;
        this.element.height = height;
        this.element.id = id;

        this.graphics = this.element.getContext('2d');


    }

    fillRect = (x, y, width, height, color = null) => {
        if (color) this.graphics.fillStyle = color;
        this.graphics.fillRect(x, y, width, height);
    }

    clearRect = (x, y, width, height) => {
        this.graphics.clearRect(x, y, width, height);
    }
    clear = () => {
        this.clearRect(0, 0, this.width, this.height);
    }

    setWidth = (width) => {
        this.width = width;
        this.element.width = width;
    }
    setHeight = (height) => {
        this.height = height;
        this.element.height = height;
    }




    static createElement = (width, height) => {
        return new Canvas(width, height).element;
    }


}

class Canvas_3D {
    constructor(view, left, right) {
        this.view = view;
        this.left = left;
        this.right = right;

    }

    fillRect = (x, y, width, height, distance = 1, color = null) => {
        this.left.fillRect(x, y, width, height, color);
        this.right.fillRect(x, y, width, height, color);
    }
    clear = () => {
        this.left.clear();
        this.right.clear();
    }
}


const createSBSCanvas = () => {
    let view = document.createElement('div');
    view.style = "background-color: black;grid-template-columns: auto auto;display: grid;"

    let left = new Canvas(0, 0, 'left');
    left.element.style.backgroundColor = 'black';

    let right = new Canvas(0, 0, 'right');
    right.element.style.backgroundColor = 'black';


    view.id = 'view';


    document.body.onkeydown = (e) => {
        if (e.key == 'F2') {
            view.requestFullscreen();
            setTimeout(() => {
                left.setWidth(window.innerWidth / 2);
                right.setWidth(window.innerWidth / 2);
                left.setHeight(window.innerHeight);
                right.setHeight(window.innerHeight);


            }, 100);
        }
        if (e.key == 'Escape') {

            left.setWidth(0);
            right.setWidth(0);
            left.setHeight(0);
            right.setHeight(0);

        }
        if (e.key == 'F11') {
            return false;
        }

    }
    document.body.append(view);
    view.append(left.element, right.element);

    return new Canvas_3D(view, left, right);
}


function Main(){
    createFormButton('Räuber Beute 1');
let canvas_3d = createSBSCanvas();

Mouse = { x: -100, y: -100 }

document.body.onmousemove = (e) => {
    Mouse.x = e.offsetX;
    Mouse.y = e.offsetY;
}
setInterval(() => {
    canvas_3d.clear();
    canvas_3d.fillRect(Mouse.x, Mouse.y, 100, 100, 0, 'red');
});

} 
