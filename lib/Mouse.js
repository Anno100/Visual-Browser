const Mouse = {x:-1,y:-1,click:false,mousedown:false,mouseup:false}

c.onmouseenter = (e) => {
    Mouse.x = e.offsetX-c.width/2;
    Mouse.y = e.offsetY-c.height/2;

}

c.onmousemove = (e) => {
    Mouse.x = e.offsetX-c.width/2;
    Mouse.y = e.offsetY-c.height/2;
}

c.onclick = () => {
    Mouse.click = true;
    setTimeout(()=>{Mouse.click = false},5);
}
c.onmousedown = () => {
    Mouse.mousedown = true;
}

c.onmouseup = () => {
    Mouse.mousedown = false;
    Mouse.mouseup = true;
    setTimeout(()=>{Mouse.mouseup = false},5);
}

c.onmouseleave = () => {
    Mouse.mousedown = false;
}