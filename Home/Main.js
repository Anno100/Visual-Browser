

function Main(){
    let c = createCanvas("Testing",500,500);
    let g = c.g;
    let Mouse = c.Mouse;
    let v = new Circle(0,0,100,'black');
    let w = new Circle(20,20,100,'black');
    
    console.log(v)
    c.Draw = () => {
        g.clear();
        v.draw(g);
        w.draw(g);

        w.x = Mouse.x/2;
        w.y = Mouse.y/2;
        
        v.drawTo(g,w);
        if(v.overlap(w)) console.log("Yes");
    }
}