

function Main(){

    const canvas = createCanvas(500,500);
    const g = canvas.g;

    let Zellen = [];
    Zellen.push(new Circle(0,0,10,'blue'));
    canvas.Draw = () => {

        Zellen.forEach(e=>e.draw(g));

        Zellen.forEach(e=>e.draw(g));
    }
}