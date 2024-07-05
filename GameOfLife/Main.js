

function Main(){

    const canvas = createCanvas(500,500);
    const g = canvas.g;

    gridsize = 20;

    r = new Rect(0,0,gridsize,gridsize,'red');

    canvas.Draw = () => {

        for (let i = 0; i*gridsize < canvas.width; i++) {

            g.fillLine(i*gridsize,0,i*gridsize,canvas.width);
            g.fillLine(0,i*gridsize,canvas.height,i*gridsize);
            
        }

        r.draw();

    }
    
    createFormButton("Home");
}