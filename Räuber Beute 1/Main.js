
function Main() {


    const graph = createCanvas(500, 300)
    graph.c.style.backgroundColor = 'rgb(255,255,255,0.6)'
    graph.center.x = 0;
    graph.center.y = graph.height-10;
    const graph_Zoom = { x: 2, y: 2 }

    let INTERVAL = null;

    generate = () => {

        graph.g.clear();
        clearInterval(INTERVAL);
        Beziehung_Raeuber_Beute.all.forEach(e => {
            e.i = 0;
        })

        
    
        INTERVAL = setInterval(()=>{
            Beziehung_Raeuber_Beute.all.forEach(e => {
                console.log(e.toString())
                e.tick();
            })
        },1);

        graph.Draw = () => {

            Beziehung_Raeuber_Beute.all.forEach(e => {
                (new Circle(e.i * graph_Zoom.x, -e.Raeuber.Anzahl * graph_Zoom.y, 1, e.Raeuber.color)).draw(graph.g);
                //(new Circle(beziehung.i*graph_Zoom.x,-sum_Raeuber/beziehung.i,0.5,'rgb(255,255,0,0.5)')).draw(graph.g);
                (new Circle(e.i * graph_Zoom.x, -e.Beute.Anzahl * graph_Zoom.y, 1, e.Beute.color)).draw(graph.g);
                //(new Circle(beziehung.i*graph_Zoom.x,-sum_Beute/beziehung.i,0.5,'rgb(0,255,255,0.5)')).draw(graph.g);})
             
            })
        }
    }

}