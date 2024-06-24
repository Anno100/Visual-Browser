

function Main(){
    const a = createInput("hey",'number');
    a.value = 10;
    nextRow();

    const canvas = createCanvas("asd",500,500);
    const g = canvas.g;

    let Zellen = [];
    Zellen.push(new Rect(0,0,10,10));
    canvas.Draw = () => {

        Zellen.forEach(e=>e.draw(g));

        Zellen.forEach(e=>e.draw(g));
    }
}