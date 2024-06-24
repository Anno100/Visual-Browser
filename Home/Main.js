function Main(){
    let c = createCanvas();
    let g = c.g;
    let v = new Vector2D(5,5,'black');
    
    console.log(v)

    c.Draw = () => {
        v.draw(g);
    }
}