
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

    $table_new_row(t_wesen)
    $table_set(t_wesen,0,0,0)


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


    /**GRAPHEN */
    
    let graphen = $create('div');
    graphen.className = 'BODY';
    document.body.appendChild(graphen)

    /**Graphen erstellen Button */
    const create_graph = $create('button');
    create_graph.style.backgroundColor = 'brown'
    create_graph.innerHTML = 'Graph generieren';
    create_graph.onclick = () => {
        
        graph.Draw = () => {
            (new Rect(0,0,10,10,'pink')).draw();
        }
    }

    /**Graph speichern Button */
    const save_graph = $create('button')
    save_graph.style.backgroundColor = 'green'
    save_graph.innerHTML = 'Speichern'
    save_graph.onclick = () => {
        let link = $create('a');
        link.download = 'Graph'
        link.href = graph.c.toDataURL()
        document.body.appendChild(link)
        link.click();
        delete link;
    }

    /**Graph */
    const graph = createCanvas();




    graphen.append(create_graph,save_graph,graph.c);
    /*************************************** */

    $table_new_row(t_beziehung)
    $table_set(t_beziehung,0,0,0)

    wesen.before('Lebewesen erstellen')
    beziehung.before('Beziehung erstellen');














}