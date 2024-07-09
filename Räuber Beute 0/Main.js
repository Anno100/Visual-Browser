
/**Erstellt ein Input-Element des Typen Range
 * 
 * @param {string} label Beschreibung
 * @param {number} min Minimalwert
 * @param {number} max Maximalwert
 * @param {number} DEFAULT Defaultwert - Startwert
 * @returns 
 */
function createRangeInput(label, min, max, DEFAULT) {
    let e = createInput(label, "number", DEFAULT);
    e.min = min;
    e.max = max;
    e.step = 0.01;
    return e;
}


function onchange(e, t) {
    e.parentNode.getElementsByTagName("label")[0].innerHTML = t;
    Main_Update();
}

function Main() {

    //Inputfelder arangieren***************************************************************

    //Samples
    let wolf_antilop = document.createElement("button")
    wolf_antilop.innerHTML = "Sample1"
    document.body.appendChild(wolf_antilop)

    /** Anzahl der Räuber bei t = 0
     * @param {number} min 0
     * @param {number} max 500
     */
    let x = createInput("Zahl der Räuber [x]", 0, 10000000, 1);
    x.onchange = () => onchange(x, `Zahl der Räuber [x = ${x.value}]`)

    /**Anzahl der Beute bei t = 0
     * @param {number} min 0
     * @param {number} max 500
     */
    let y = createRangeInput("Zahl der Beutetiere [y]", 0, 10000000, 10000);
    y.onchange = () => onchange(y, `Zahl der Beutetiere [y = ${y.value}]`)
    nextRow();


    /**Geburtenrate der Räuber
     * @param {number} min 0
     * @param {number} max 10
     */
    let Zx = createRangeInput("Geburtenrate der Räuber [Zx]", 0, 10, 0.1);
    Zx.onchange = () => onchange(Zx, `Geburtenrate der Räuber [Zx = ${Zx.value}]`)


    /**Sterberate der Räuber
     * @param {number} min 0
     * @param {number} max 10
     */
    let Ax = createRangeInput("Sterberate der Räuber [Ax]", 0, 10, 0.3);
    Ax.onchange = () => onchange(Ax, `Sterberate der Räuber [Ax = ${Ax.value}]`)
    nextRow();

    /**Geburtenrate der Beute
     * @param {number} min 0
     * @param {number} max 10
     */
    let Zy = createRangeInput("Geburtenrate der Beute [Zy]", 0, 10, 0.3);
    Zy.onchange = () => onchange(Zy, `Geburtenrate der Beute [Zy = ${Zy.value}]`)


    /**Sterberate der Beute
     * @param {number} min 0
     * @param {number} max 10
     */
    let Ay = createRangeInput("Sterberate der Beute [Ay]", 0, 10, 0.1);
    Ay.onchange = () => onchange(Ay, `Sterberate der Beute [Ay = ${Ay.value}]`)

    let tx=0,tZx=0,tAx=0,ty=0,tZy=0,tAy=0;

    const set = (px,py,pZx,pZy,pAx,pAy) => {
        x.value = px;
        Zx.value = pZx;
        Ax.value = pAx;
        y.value = py;
        Zy.value = pZy;
        Ay.value = pAy;
        onchange(x, `Zahl der Räuber [x = ${x.value}]`)
        onchange(y, `Zahl der Beutetiere [y = ${y.value}]`)
        onchange(Zx, `Geburtenrate der Räuber [Zx = ${Zx.value}]`)
        onchange(Ax, `Sterberate der Räuber [Ax = ${Ax.value}]`)
        onchange(Zy, `Geburtenrate der Beute [Zy = ${Zy.value}]`)
        onchange(Ay, `Sterberate der Beute [Ay = ${Ay.value}]`)
        Main_Update();
        
    }

    wolf_antilop.onclick =()=>{
        set(10**1,10**10,0.001,9,10,0.1)
    }


    let b = document.createElement('button');
    b.innerHTML = 'Step'
    b.onclick = () => {
        x.value = x_next > 0 ? Math.round(x_next) : 0;
        y.value = y_next > 0 ? Math.round(y_next) : 0;
        onchange(x, `Zahl der Räuber [x = ${x.value}]`)
        onchange(y, `Zahl der Beutetiere [y = ${y.value}]`)
        onchange(Zx, `Geburtenrate der Räuber [Zx = ${Zx.value}]`)
        onchange(Ax, `Sterberate der Räuber [Ax = ${Ax.value}]`)
        onchange(Zy, `Geburtenrate der Beute [Zy = ${Zy.value}]`)
        onchange(Ay, `Sterberate der Beute [Ay = ${Ay.value}]`)
    }
    document.body.append(b);

    let text = document.createElement('p');

    /**
     * Updatefunktion
     * __
     * Berechnet die Änderung der Räuber-/Beute-anzahl
     */
    Main_Update = () => {

        text.innerHTML = "";

        Kontakthaeufigkeit = x.value * y.value;
        text.innerHTML += `<div class = "d">Kontakthäufigkeit [x * y]: ${Kontakthaeufigkeit}</div><br>`

        Zuwachs_Raeuber = Zx.value*Kontakthaeufigkeit;
        text.innerHTML += `<div class = "d">Zuwachs der Räuber [Zx * Kontakthäufigkeit]: ${Zuwachs_Raeuber}</div>`

        Abnahme_Raeuber = Ax.value*x.value;
        text.innerHTML += `<div class = "d">Abnahme der Räuber [Ax * x]: ${Abnahme_Raeuber}</div>`

        Aenderung_Raeuber = Zuwachs_Raeuber - Abnahme_Raeuber;
        text.innerHTML += `<div class = "d">Änderung der Räuber [Zuwachs_Raeuber-Abnahme_Raeuber]: ${Aenderung_Raeuber}</div><br>`

        Zuwachs_Beute = Number(Zy.value)*Number(y.value)
        text.innerHTML += `<div class = "d">Zuwachs der Beute: ${Zuwachs_Beute}</div>`
        
        Abnahme_Beute = Ay.value*Kontakthaeufigkeit
        text.innerHTML += `<div class = "d">Abnahme der Beute: ${Abnahme_Beute}</div>`

        Aenderung_Beute = Zuwachs_Beute - Abnahme_Beute;
        text.innerHTML += `<div class = "d">Änderung der Beute: ${Aenderung_Beute}</div><br>`

        x_next = Number(x.value) + Aenderung_Raeuber;
        text.innerHTML += `<div class = "d">Neue Anzahl der Räuber: ${x_next}</div>`
        y_next = Number(y.value) + Aenderung_Beute;
        text.innerHTML += `<div class = "d">Neue Anzahl der Beute: ${y_next}</div>`

        
    }
    document.body.append(text);

    this.Main_Update();



    //Trajektor Produzieren***************************************************/

    traj = createCanvas(500,300);
    traj.c.style.backgroundColor = 'black'
    traj.center.x = 25;
    traj.center.y = traj.height-25


    /***********************************************************************/
    
    //Graph Produzieren**************************************/
    
    let graph = createCanvas(500,300);
    graph.c.style.backgroundColor = 'black'
    graph_generate = document.createElement('button');
    graph_generate.innerHTML = 'Generate Graph'
    graph_generate.style.height = '25px';
    graph_generate.onclick = () => {
        let g = graph.g;
        graph.g.clear();
        let t = 0;
        graph.Draw = () => {
            b.click();
            (new Circle(t,-x.value,1,'rgb(255,0,0,0.5)')).draw(g);
            (new Circle(t,-y.value,1,'rgb(0,0,255,0.5)')).draw(g);
            t++;
        }
        traj.g.clear();
        traj.Draw = () => {
            let g = traj.g;
            (new Circle(x.value/100,-y.value/100,1,'white')).draw(g);
        }
    };
    graph_stop = document.createElement('button');
    graph_stop.innerHTML = 'Stop'
    graph_stop.style.height = '25px';
    graph_stop.onclick = () => {
        graph.Draw = () => {}
        traj.Draw = () => {}
    }
    graph_stop.style.backgroundColor = 'red'
    document.body.append(graph_generate,graph_stop);

    onchange(x, `Zahl der Räuber [x = ${x.value}]`)
    onchange(y, `Zahl der Beutetiere [y = ${y.value}]`)
    onchange(Zx, `Geburtenrate der Räuber [Zx = ${Zx.value}]`)
    onchange(Ax, `Sterberate der Räuber [Ax = ${Ax.value}]`)
    onchange(Zy, `Geburtenrate der Beute [Zy = ${Zy.value}]`)
    onchange(Ay, `Sterberate der Beute [Ay = ${Ay.value}]`)
    


}



//SAP -> streichen von applikationen, welche nicht bearbeitet werden müssen
//Notbeleuchtung für Udo fertig machen (Problem: Admin funktioniert nicht, Bearbeiter ja) fertig machen, für Mittwoch gespräch angedacht


//Nina geholfen bei einer Peris Sache (Tooltip/Interactive Report beim zeigen auf verkürzte Beschreibung)

//heute für Präsentation morgen was vorbereiten
//dafür morgen spät nachmittag im Homeoffice Notbeleuchtung fertig machen