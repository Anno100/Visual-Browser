function Main() {
    createFormButton("Home")
    let canvas = createCanvas(500, 500);
    canvas.g.setFillStyle('black');
    canvas.g.fillRect(0,0,canvas.width,canvas.height);

    let x = 2, y = 1
    let c = new Complex(-x, -y)
    canvas.Draw = () => {

        for (let j = 0; j < 100; j++) {


            let z = new Complex(0, 0)
            for (let index = 0; index < 100; index++) {
                z = z.mul(z).add(c);
                z.Im = Math.round(z.Im * 100) / 100;
                z.Re = Math.round(z.Re * 100) / 100;
                if (z.abs() > 2) continue;
            }
            console.log(z.abs())
            if (z.abs() <= 2) (new Rect(c.Re * 100, c.Im * 100, 1, 1, `rgb(0,0,${z.abs()/2*255})`)).draw()
                if (z.abs() <= 2) (new Rect(c.Re * 100, c.Im * 100, 1, 1, `rgb(255,255,${255-z.abs()/2*255})`)).draw()


            c.Re += 0.01
            if (c.Re > x) {
                c.Re = -x;
                c.Im += 0.01;
            }
            if (c.Im >= y) canvas.Draw = () => { }
        }
    }
}