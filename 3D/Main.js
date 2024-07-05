

function Main() {
    createFormButton('Home');
    let i = createInput('Text', 'text', "Hallo");


    //let canvas = createCanvas(window.innerWidth, window.innerHeight);
    let canvas = createCanvas3D();
    canvas.showSystem = true;
    let g = canvas.g;
    let c = canvas.c;
    let center = canvas.center;
    c.id = "SBS";

    let Mouse = canvas.Mouse;

    let image = new Image('../Bild.png', c.width / 4, 0, 200, 200, "white");


    c.ondblclick = (e) => {
        c.requestFullscreen();
    }

    canvas.showSystem = true;

    c.addEventListener("mousemove", (e) => {

        if (e.offsetX > c.width / 2) center.x--;
        if (e.offsetX < c.width / 2) center.x++;
        if (e.offsetY > c.height / 2) center.y--;
        if (e.offsetY > c.height / 2) center.y++;
    }
    )

    let r = new Rect(0, 0, 10, 10, 'blue');
    canvas.addObject(r);

    canvas.Draw = () => {

        //r = new Rect(500,500,10,10,"blue");




    }

}