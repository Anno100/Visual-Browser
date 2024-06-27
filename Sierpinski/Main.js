

function Main(){
    createFormButton('Home','Back');

    let c = createCanvas(500,500);

    let p1 = new Vector2D(200,200,'yellow');
    let p2 = new Vector2D(-200,200,'yellow');
    let p3 = new Vector2D(0,-200,'yellow');
    
    

    cur = new Vector2D(0,0);

    let g = c.g;

    g.setFillStyle('black');
    g.fillRect(0,0,c.width,c.height);

    const x1 = 0.5;

    c.Draw = () => {

        let r = Math.random()*3;
        if(r < 1){
            cur = cur.add(p1).mul(x1);
        }
        else if(r < 2){
            cur = cur.add(p2).mul(x1);
        }
        else if(r < 3){
            cur = cur.add(p3).mul(x1);
        }

        Circle.draw(cur.x,cur.y,1,'white');
    }
}