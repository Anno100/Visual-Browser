class Wesen {
    static i = 0;
    /**
     * 
     * @param {number} Anzahl 
     * @param {number} Geburtenrate 
     * @param {number} Sterberate 
     * @param {string|null} name 
     */
    constructor(Anzahl, Geburtenrate, Sterberate,name=null) {
        this.Anzahl = Anzahl;
        this.Geburtenrate = Geburtenrate;
        this.Sterberate = Sterberate;
        this.name = name ? name : `Wesen_${Wesen.i++}`;
    }
    
    copy = () => new Wesen(this.Anzahl, this.Geburtenrate, this.Sterberate,this.name);

    toString = () => 
`${this.name}:
    Anzahl = ${this.Anzahl},
    Geburtenrate = ${this.Geburtenrate},
    Sterberate = ${this.Sterberate}`

}
class Raeuber extends Wesen {
    /**
     * 
     * @param {number} Anzahl 
     * @param {number} Geburtenrate 
     * @param {number} Sterberate 
     */
    constructor(Anzahl=0, Geburtenrate=0, Sterberate=0) {
        super(Anzahl, Geburtenrate, Sterberate);
    }
}
class Beute extends Wesen {
    /**
     * 
     * @param {number} Anzahl 
     * @param {number} Geburtenrate 
     * @param {number} Sterberate 
     */
    constructor(Anzahl=0, Geburtenrate=0, Sterberate=0) {
        super(Anzahl, Geburtenrate, Sterberate);
    }
}

class Beziehung_Raeuber_Beute {
    /**
     * 
     * @param {Raeuber} Raeuber 
     * @param {Beute} Beute 
     */
    constructor(Raeuber, Beute) {
        this.Raeuber = Raeuber;
        this.Beute = Beute;
    }

    i = 0;
    step = 0.01;

    /**
     * 
     * @returns {number}
     */
    getKontakthaeufigkeit = () => this.Raeuber.Anzahl * this.Beute.Anzahl;

    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getZuwachs = () => {
        return {
            vonRaeuber: this.Raeuber.Geburtenrate * this.getKontakthaeufigkeit(),
            vonBeute: this.Beute.Geburtenrate * this.Beute.Anzahl
        }
    }
    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getAbnahme = () => {
        return {
            vonRaeuber: this.Raeuber.Sterberate * this.Raeuber.Anzahl,
            vonBeute: this.Beute.Sterberate * this.getKontakthaeufigkeit()
        }
    }

    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getAenderung = () => {
        return {
            vonRaeuber: (this.getZuwachs().vonRaeuber-this.getAbnahme().vonRaeuber)*this.step,
            vonBeute: (this.getZuwachs().vonBeute-this.getAbnahme().vonBeute)*this.step
        }
    }
    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getNext = () => {
        return {
            vonRaeuber: this.Raeuber.Anzahl + this.getAenderung().vonRaeuber,
            vonBeute: this.Beute.Anzahl + this.getAenderung().vonBeute
        }
    }

    tick = () => {
        this.Raeuber.Anzahl = this.getNext().vonRaeuber;
        this.Beute.Anzahl = this.getNext().vonBeute;
        this.i+=this.step;
    }

    toString = () => 
`[${this.i}]
<span style = color:red>(Räuber)</span>
${this.Raeuber.toString()},
    Änderung für nächsten tick = ${this.getAenderung().vonRaeuber}

<span style = color:blue>(Beute)</span>
${this.Beute.toString()},
    Änderung für nächsten tick = ${this.getAenderung().vonRaeuber}
    
==>  next ${this.Raeuber.name} = ${this.getNext().vonRaeuber} -- next ${this.Beute.name} = ${this.getNext().vonBeute}`

}

function Main() {

    /**inputs und outputs arrangieren */
    const input = {
        x:createInput("Anzahl Räuber:",'number',9),
        Zx:createInput("Geburtenrate Räuber:",'number',0.04),
        Ax:createInput("Sterberate Räuber:",'number',0.3),
        
        y:createInput("Anzahl Beute:",'number',40),
        Zy:createInput("Geburtenrate Beute:",'number',0.1),
        Ay:createInput("Sterberate Beute:",'number',0.02),

        step:createInput("Genauigkeit [timestep]:",'number',0.1),

        graph_breite:createInput("Breite des Graphen:",'number',5000),
        graph_hoehe:createInput("Höhe des Graphen:","number",300),
        graph_zoomX:createInput("X-Zoom des Graphen:",'number',2),
        graph_zoomY:createInput("Y-Zoom des Graphen:","number",2),
        traj_breite:createInput("Breite des Trajektors:",'number',500),
        traj_hoehe:createInput("Höhe des Trajektors:","number",300),
        traj_zoomX:createInput("X-Zoom des Trajektors:",'number',2),
        traj_zoomY:createInput("Y-Zoom des Trajektors:","number",2)

    }

    const input_field = document.createElement('div');

    input_field.append(input.x.parentNode,input.Zx.parentNode,input.Ax.parentNode,input.y.parentNode,input.Zy.parentNode,input.Ay.parentNode,input.step.parentNode,input.graph_breite.parentNode,input.graph_hoehe.parentNode,input.graph_zoomX.parentNode,input.graph_zoomY.parentNode,input.traj_breite.parentNode,input.traj_hoehe.parentNode,input.traj_zoomX.parentNode,input.traj_zoomY.parentNode);

    input.x.onchange = () => {
        stop.click()
        gen.click()
    }
    input.Zx.onchange = () => {
        stop.click()
        gen.click()
    }
    input.Ax.onchange = () => {
        stop.click()
        gen.click()
    }
    input.y.onchange = () => {
        stop.click()
        gen.click()
    }
    input.Zy.onchange = () => {
        stop.click()
        gen.click()
    }
    input.Ay.onchange = () => {
        stop.click()
        gen.click()
    }
    input.step.onchange = () => {
        stop.click()
        gen.click()
    }
    input.graph_breite.onchange = () => {
        stop.click()
        gen.click()
    }
    input.graph_hoehe.onchange = () => {
        stop.click()
        gen.click()
    }
    input.graph_zoomX.onchange = () => {
        stop.click()
        gen.click()
    }
    input.graph_zoomY.onchange = () => {
        stop.click()
        gen.click()
    }
    input.traj_zoomX.onchange = () => {
        stop.click()
        gen.click()
    }
    input.traj_zoomY.onchange = () => {
        stop.click()
        gen.click()
    }

    /************************************/

    const row0 = document.createElement('div');
    row0.className = "row";
    const row1 = document.createElement('div');
    row1.className = "row";

    document.body.append(row0,row1);

    const graph = createCanvas(500,300)
    graph.c.style.backgroundColor = 'rgb(255,255,255,0.6)'
    graph.center.x = 0;
    graph.center.y = graph.height;

    const graph_Zoom = {x:2,y:2}
    
    const traj = createCanvas(300,300);
    traj.c.style.backgroundColor = 'rgb(255,255,255,0.6)'

    const traj_Zoom = {x:4,y:4}

    row0.append(input_field,traj.c);

    /******************************** */

    /**Buttons */
    const gen = document.createElement('button');
    gen.innerHTML = "Generiere Graphen"
    const stop = document.createElement('button');
    stop.innerHTML = 'Stop'
    stop.style.backgroundColor = 'red'
    input_field.append(gen)
    input_field.appendChild(document.createElement('br'));
    input_field.append(stop)

    const text = document.createElement('p');

    row0.append(text);

    let INTERVAL = null;

    gen.onclick = () => {
        const Raeuber_0 = new Raeuber(Number(input.x.value),Number(input.Zx.value),Number(input.Ax.value));
        const Beute_0 = new Beute(Number(input.y.value),Number(input.Zy.value),Number(input.Ay.value));

        graph.showSystem = true;
        traj.showSystem = true;
    
        let beziehung = new Beziehung_Raeuber_Beute(Raeuber_0,Beute_0);
        beziehung.step = Number(input.step.value);
    
        
        let sum_Raeuber = 0;
        let sum_Beute = 0;
        traj.c.width = Number(input.traj_breite.value);
        traj.c.height = Number(input.traj_hoehe.value);
        graph.c.width = Number(input.graph_breite.value);
        graph.c.height = Number(input.graph_hoehe.value);
        
        traj.center.x = 10;
        traj.center.y = traj.c.height-10;
        graph.center.x = 10;
        graph.center.y = graph.c.height-10;

        graph_Zoom.x = Number(input.graph_zoomX.value);
        graph_Zoom.y = Number(input.graph_zoomY.value);
        traj_Zoom.x = Number(input.traj_zoomX.value);
        traj_Zoom.y = Number(input.traj_zoomY.value);
    
        INTERVAL = setInterval(()=>{
            beziehung.tick();
            sum_Raeuber += beziehung.Raeuber.Anzahl;
            sum_Beute += beziehung.Beute.Anzahl;
            text.style.width = 900 + "px"
            text.innerHTML = beziehung.toString().replace(/\n/gim,'<br>') + `<p style = "color:rgb(255,255,0)">Mittelwert Räuber:</p> ${sum_Raeuber/beziehung.i}<p style = "color:rgb(0,255,255)">Mittelwert Beute:</p> ${sum_Beute/beziehung.i}`;
        },1);

        graph.g.clear();
        traj.g.clear();

    
        graph.Draw = () => {
            (new Circle(beziehung.i*graph_Zoom.x,-beziehung.Raeuber.Anzahl*graph_Zoom.y,1,'rgb(255,0,0,0.5)')).draw(graph.g);
            (new Circle(beziehung.i*graph_Zoom.x,-sum_Raeuber/beziehung.i,0.5,'rgb(255,255,0,0.5)')).draw(graph.g);
            (new Circle(beziehung.i*graph_Zoom.x,-beziehung.Beute.Anzahl*graph_Zoom.y,1,'rgb(0,0,255,0.5)')).draw(graph.g);
            (new Circle(beziehung.i*graph_Zoom.x,-sum_Beute/beziehung.i,0.5,'rgb(0,255,255,0.5)')).draw(graph.g);
        }
        (new Circle(1/beziehung.Raeuber.Geburtenrate*traj_Zoom.x,-1/beziehung.Beute.Geburtenrate*traj_Zoom.y,5,'red')).draw(traj.g)
        traj.Draw = () => {
            (new Circle(beziehung.Raeuber.Anzahl*traj_Zoom.x,-beziehung.Beute.Anzahl*traj_Zoom.y,1)).draw(traj.g)
        }

    }

    stop.onclick = () => {
        graph.Draw = () => {}
        traj.Draw = () => {}
        clearInterval(INTERVAL);
    }


    


}