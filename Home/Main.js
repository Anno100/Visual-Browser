

function Main(){
    let c = createCanvas("Testing",500,500);
    let g = c.g;
    let Mouse = c.Mouse;
    let v = new Vector2D(100,100,'orange');
    let w = new Circle(20,20,50,'blue');
    
    c.Draw = () => {


        w.x = Mouse.x;
        w.y = Mouse.y;
        
        if(v.overlap(w)) console.log("Yes");
        console.log(w)

        g.setFillStyle("black");
        g.fillRect(0,0,c.width,c.height);
        v.draw(g);
        w.draw(g);

        g.setStrokeStyle('blue');
        v.drawTo(g,w);
    }
}