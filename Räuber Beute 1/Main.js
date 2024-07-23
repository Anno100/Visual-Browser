
function Main() {



    /**LEBEWESEN */
    let wesen = $create('div');
    wesen.className = 'BODY';
    document.body.appendChild(wesen)

    /**Lebewesen erstellen Button */
    const create_wesen = $create('button');
    create_wesen.classList.add('button-add');
    create_wesen.innerHTML = '+';
    create_wesen.onclick = () => {
        $table_new_row(t_wesen)
        let l = $table_rows(t_wesen);
        $table_set(t_wesen,l-1,0,l-1)
    }

    /**Lebewesen erstellen Tabelle */
    const t_wesen = $create_table('ID:number:readonly', 'Name:text', 'Anzahl:number', 'Geburtenrate:number', 'Sterberate:number','Farbe:color')
    wesen.append(create_wesen, t_wesen)



    /**BEZIEHUNGEN */
    let beziehung = $create('div');
    beziehung.className = 'BODY';
    document.body.appendChild(beziehung)

    /**Beziehung erstellen Button */
    const create_beziehung = $create('button');
    create_beziehung.classList.add('button-add');
    create_beziehung.innerHTML = '+';
    create_beziehung.onclick = () => {
        $table_new_row(t_beziehung)
        let l = $table_rows(t_beziehung);
        $table_set(t_beziehung,l-1,0,l-1)
    }

    /**Lebewesen erstellen Tabelle */
    const t_beziehung = $create_table('ID:number:readonly', 'Räuber-ID:number', 'Beute-ID:number')
    beziehung.append(create_beziehung, t_beziehung)

    /**GRAPHEN Config */
    let config = $create('div');
    config.className = 'BODY';
    document.body.appendChild(config)

    let step = $create('input','step');
    step.type = 'number'
    step.placeholder = '(def:0.1)Geschwindigkeit der Zeit'
    step.title = step.placeholder;
    config.append(step);
    
    let animationSpeed = $create('input','animationSpeed');
    animationSpeed.type = 'number'
    animationSpeed.placeholder = '(def:1)Geschwindigkeit der Animation'
    step.animationSpeed = step.placeholder;
    config.append(animationSpeed);
    
    
    let xZoom = $create('input','xZoom');
    xZoom.type = 'number'
    xZoom.placeholder = '(def:1)Streckung der x-Achse'
    xZoom.title = step.placeholder;
    config.append(xZoom);

    let yZoom = $create('input','yZoom');
    yZoom.type = 'number'
    yZoom.placeholder = '(def:1)Streckung der y-Achse'
    yZoom.title = step.placeholder;
    config.append(yZoom);

    /**GRAPHEN Visual*/
    
    let graphen = $create('div');
    graphen.className = 'BODY';
    document.body.appendChild(graphen)

    /**Graphen erstellen Button */
    const create_graph = $create('button');
    create_graph.style.backgroundColor = 'brown'
    create_graph.innerHTML = 'Graph generieren';
    create_graph.onclick = () => {

        Wesen.all = [];
        Beziehung_Raeuber_Beute.all = []
        graph.g.setFillStyle('white')
        graph.g.fillRect(0,0,graph.c.width,graph.c.height);

        let WESEN = $table_to_2Darray(t_wesen);
        WESEN.forEach(e=>{
            new Wesen(Number(e[2]),Number(e[3]),Number(e[4]),e[1],e[5]);
            console.log(e[5])
        });

        let BEZIEHUNG = $table_to_2Darray(t_beziehung);
        BEZIEHUNG.forEach(e => {
            new Beziehung_Raeuber_Beute(Wesen.all[e[1]],Wesen.all[e[2]]);
        });
        
        let xzoom = $is_null('xZoom') ? 1 : $v('xZoom')
        let yzoom = $is_null('yZoom') ? 1 : $v('yZoom')
        let animSpeed = $is_null('animationSpeed') ? 1 : $v('animationSpeed')
        Beziehung_Raeuber_Beute.all.forEach(e => {
            e.step = $is_null('step') ? 0.1 : $v('step')
        });


        graph.Draw = () => {
            for (let i = 0; i < animSpeed; i++) {
                Beziehung_Raeuber_Beute.all.forEach(e => {
                    e.tick();
                    console.log(e.toString())
                });
                Wesen.all.forEach(e => {
                    e.sum += e.Anzahl;
                })
                Beziehung_Raeuber_Beute.all.forEach(e => {
                    (new Circle(e.i * xzoom,-e.Raeuber.Anzahl * yzoom,1,e.Raeuber.color)).draw(graph.g);
                    (new Circle(e.i * xzoom,-e.Beute.Anzahl * yzoom,1,e.Beute.color)).draw(graph.g);
                });
                
            }
            
        }




    }

    /**Graph speichern Button */
    const save_graph = $create('button')
    save_graph.style.backgroundColor = 'green'
    save_graph.innerHTML = 'Speichern'
    save_graph.onclick = () => {
        let link = $create('a');
        link.download = `Räuber_Beute_Graph-{Beschreibung}`
        link.href = graph.c.toDataURL()
        document.body.appendChild(link)
        link.click();
        delete link;
    }

    /**Graph */
    const graph = createCanvas(5000,300);
    graph.center.x = 10;
    graph.center.y = graph.height-10;
    graph.showSystem = true;
    let UPDATE = null;




    graphen.append(create_graph,save_graph,graph.c);
    /*************************************** */
    $table_new_row(t_wesen,0,'Bär',1,0.3,0.1,'brown')
    $table_new_row(t_wesen,1,'Hase',1,1,0.2,'grey')

    $table_new_row(t_beziehung,0,0,1)

    wesen.before('Lebewesen erstellen')
    beziehung.before('Beziehung erstellen');














}