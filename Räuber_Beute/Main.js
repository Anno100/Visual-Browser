


/******************************************************************* */
console.log("Start Main...");


function dB(B, R, rep_B, sterb_B) {
    return B * (rep_B - sterb_B * R);
}

function dR(R, B, sterb_R, rep_R) {
    return -R * (sterb_R - rep_R * B);
}

function Main() {
    Graph = createCanvas(1000, 300);
    Game = createCanvas(500, 500);
    let g = Game.g;

    const Beute = document.getElementById('Beute');
    const Raeuber = document.getElementById('Räuber');
    const Refresh = document.getElementById('Refresh');
    const Breite = document.getElementById('Breite');
    const Hoehe = document.getElementById('Höhe');
    Breite.value = Game.width;
    Hoehe.value = Game.height;

    const Rep_B = document.getElementById('rep_B');
    const Rep_R = document.getElementById('rep_R');
    const Sterb_B = document.getElementById('sterb_B');
    const Sterb_R = document.getElementById('sterb_R');


    R = 0;
    B = 0;
    rep_B = 0;
    sterb_B = 0;
    sterb_R = 0;
    rep_R = 0;


    Raeuber.onchange = () => {
        Refresh.click();
    }
    Beute.onchange = () => {
        Refresh.click();
    }

    Refresh.onclick = () => {
        g.clear();
        run = true;
        time = 0;
        Graph.g.clear();
        Game.resize(Number(Breite.value), Number(Hoehe.value));
        init();
    }


    Raeuber.value = 10;
    Beute.value = 50;

    Rep_B.value = 0.15;
    Sterb_B.value = 0.1;
    Sterb_R.value = 0.1;
    Rep_R.value = 0.001;

    zoom = 100;
    zoomY = 0.00001;

    init = () => {
        R = Number(Raeuber.value);
        B = Number(Beute.value);
        rep_B = Rep_B.value;
        sterb_B = Sterb_B.value;
        sterb_R = Sterb_R.value;
        rep_R = Rep_R.value;

    }

    let from = new Rect(B, R, 2, 2);


    let to = new Rect(B, R, 2, 2);

    time = 0;
    Graph.g.translate(0, 100);
    S = Math.sin(time);
    Refresh.click();
    run = true;
    Game.Draw = () => {

        console.log(`${time}: Räuber:${R} Beute:${B}`)
        if (Math.max(Math.abs(R),Math.abs(B)) == Infinity) {
            run = false;
        }

        if (run) {
            g.setStrokeStyle('black');
            g.fillLine(0, -Game.width, 0, Game.width);
            g.fillLine(-Game.height, 0, Game.height, 0);

            g.setStrokeStyle('red');
            from = to;

            let oldB = B;
            let oldR = R;
            let oldS = S;

            B += dB(oldB, oldR, rep_B, sterb_B);
            R += dR(oldR, oldB, sterb_R, rep_R);
            S = Math.sin(time + 1);
            to = new Rect(B, R, 2, 2);
            from.drawTo(g, to);


            Graph.g.setStrokeStyle('black');
            Graph.g.fillLine(time * zoom, oldR * zoom * zoomY, (time + 1) * zoom, R * zoom * zoomY);
            Graph.g.setStrokeStyle('red');
            Graph.g.fillLine(time * zoom, oldB * zoom * zoomY, (time + 1) * zoom, B * zoom * zoomY);
            time += 0.01;
        }





    }

    Graph.Draw = () => {
    }

}

