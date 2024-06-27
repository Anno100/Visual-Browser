

function Main(){
    let gameObjects = [];
    createFormButton('Home','Back');

    canvas = createCanvas(500,500);

    
    c_rect = createInput('Rectangle','checkbox');
    c_circle = createInput('Circle','checkbox');
    c_vector = createInput('Vector','checkbox');

    nextRow();
    
    
    checkBox = createInput('Show System','checkbox');
    checkBox.onchange = () => {
        canvas.g.clear();
        if(checkBox.checked) canvas.showSystem = true;
        else canvas.showSystem = false;
    }

    


    c_rect.classList.add("choose");
    c_circle.className = "choose";
    c_vector.className = "choose";
    

    c_rect.onclick = () => {
        Array.from(document.getElementsByClassName('choose')).forEach(e => e.checked = false);
        c_rect.checked = true;
    }
    c_circle.onclick = () => {
        Array.from(document.getElementsByClassName('choose')).forEach(e => e.checked = false);
        c_circle.checked = true;
    }
    c_vector.onclick = () => {
        Array.from(document.getElementsByClassName('choose')).forEach(e => e.checked = false);
        c_vector.checked = true;
    }

    canvas.c.onclick = () => {
        if(c_rect.checked) gameObjects.push(new Rect(canvas.Mouse.x,canvas.Mouse.y,10,10));
        else if(c_circle.checked) gameObjects.push(new Circle(canvas.Mouse.x,canvas.Mouse.y,5));
        else if(c_vector.checked) gameObjects.push(new Vector2D(canvas.Mouse.x,canvas.Mouse.y));
    }
    canvas.Draw = () => {

        gameObjects.forEach(e => e.draw());

    }
}