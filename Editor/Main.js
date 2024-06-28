

function Main() {
    let gameObjects = [];
    createFormButton('Home', 'Back');

    
    //CHOOSE OBJECT
    let c_rect = createInput('Rectangle', 'checkbox');
    c_rect.className = "choose";
    let c_circle = createInput('Circle', 'checkbox');
    c_circle.className = "choose";

    let left = document.createElement('div');
    left.className = 'Left'
    left.append(c_rect.parentNode,c_circle.parentNode);
    
    //CANVAS
    let canvas = createCanvas(500, 500);
    canvas.showSystem = true;
    canvas.c.className = 'Center';

    //SET OBJECT
    let width = createInput('Width', 'number');
    width.value = 10;
    width.parentNode.hidden = true;
    let height = createInput('Height', 'number');
    height.value = 10;
    height.parentNode.hidden = true;
    let radius = createInput('Radius', 'number');
    radius.value = 10;
    radius.parentNode.hidden = true;
    let color = createInput('Color', 'color');
    color.parentNode.hidden = true;
    
    let right = document.createElement('div');
    right.className = 'Right';


    right.append(width.parentNode,height.parentNode,radius.parentNode,color.parentNode);

    let editor = document.createElement('div');
    editor.className = 'Editor';

    editor.append(left,canvas.c,right);
    document.body.append(editor);



    //Show System
    let checkBox = createInput('Show System', 'checkbox');
    checkBox.checked = true;
    checkBox.onchange = () => {
        canvas.g.clear();
        if (checkBox.checked) canvas.showSystem = true;
        else canvas.showSystem = false;
    }
    
    let add = createInput('Add', 'checkbox');
    add.checked = true;
    add.onchange = () => {
    }







    c_rect.onclick = () => {
        Array.from(document.getElementsByClassName('choose')).forEach(e => e.checked = false);
        c_rect.checked = true;
        width.parentNode.hidden = false;
        height.parentNode.hidden = false;
        color.parentNode.hidden = false;
        radius.parentNode.hidden = true;
    }
    c_circle.onclick = () => {
        Array.from(document.getElementsByClassName('choose')).forEach(e => e.checked = false);
        c_circle.checked = true;
        width.parentNode.hidden = true;
        height.parentNode.hidden = true;
        color.parentNode.hidden = false;
        radius.parentNode.hidden = false;
    }

    canvas.c.onclick = () => {
        if(add.checked){
            if (c_rect.checked) {
                gameObjects.push(new Rect(canvas.Mouse.x, canvas.Mouse.y, width.value, height.value, color.value));
            }
            else if (c_circle.checked) { 
                gameObjects.push(new Circle(canvas.Mouse.x, canvas.Mouse.y, radius.value, color.value)); 
            }

        }
    }
    canvas.Draw = () => {
        canvas.g.clear();
        gameObjects.forEach((e) => {
            if(!add.checked){
                if(canvas.Mouse.overlap(e)){
                    if(canvas.Mouse.down || true) gameObjects = gameObjects.filter((ee) => e != ee );
                }
            }
            e.draw()
        });


    }

}