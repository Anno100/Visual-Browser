
function createRangeInput(label,min,max,DEFAULT){
    let e = createInput(label,"range",DEFAULT);
    e.min = min;
    e.max = max;
    e.step = 0.01;
    return e;
}


function Main(){

    function onchange(e,t){ e.parentNode.getElementsByTagName("label")[0].innerHTML = t;Update()}

    let x = createRangeInput("Zahl der Räuber [x]",0,500,100);
    x.onchange = () => onchange(x,`Zahl der Räuber [x = ${x.value}]`)
    let y = createRangeInput("Zahl der Beutetiere [y]",0,500,100);
    y.onchange = () => onchange(y,`Zahl der Beutetiere [y = ${y.value}]`)
    nextRow();
    let Zx = createRangeInput("Geburtenrate der Räuber [Zx]",0,10,0);
    Zx.onchange = () => onchange(Zx,`Geburtenrate der Räuber [Zx = ${Zx.value}]`)
    let Ax = createRangeInput("Sterberate der Räuber [Ax]",0,10,0);
    Ax.onchange = () => onchange(Ax,`Sterberate der Räuber [Ax = ${Ax.value}]`)
    nextRow();
    let Zy = createRangeInput("Geburtenrate der Beute [Zy]",0,10,0);
    Zy.onchange = () => onchange(Zy,`Geburtenrate der Beute [Zy = ${Zy.value}]`)
    let Ay = createRangeInput("Sterberate der Beute [Ay]",0,10,0);
    Ay.onchange = () => onchange(Ay,`Sterberate der Beute [Ay = ${Ay.value}]`)

    let text = document.createElement('p');
    const Update = () => {text.innerHTML = `
        Änderung der Beute ${Zy.value*y.value-Ay.value*x.value*y.value}
        <br>
        Änderung der Räuber ${Zx.value*x.value*y.value-Ax.value*x.value}
        <br><br>
        Neue Räuberzahl ${x.value + Zx.value*x.value*y.value-Ax.value*x.value}
        <br>
        Neue Beutezahl ${y.value + Zy.value*y.value-Ay.value*x.value*y.value}`}
    document.body.append(text);
    Update();
    
}