
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var x = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    return `rgba(${x.r},${x.g},${x.b},255)`
}

const growingBrain = (msec, speed = 100, keyboard = false) => {
    g.setFillStyle('black');
    g.fillRect(0, 0, c.width, c.height);


    t = new Turmite(0, 0, 2);

    t.onColor = Color.BLACK


    t.rules
        .push(0, Color.BLACK, Color.GREEN, Turn.L, 0)
        .push(0, Color.GREEN, Color.RED, Turn.R, 0)
        .push(0, Color.RED, Color.BLUE, Turn.R, 0)
        .push(0, Color.BLUE, Color.BLACK, Turn.L, 0)

    if (keyboard) {
        document.body.onkeydown = () => t.checkRule();
        return
    }
    setInterval(() => {

        for (let i = 0; i < speed; i++) {

            t.checkRule();
        }
    }, msec);




}

function Main() {



    class Turmite extends Rect {
        constructor(x, y, l) {
            super(x, y, l, l, 'red')
            /**@type {Direction} */
            this.dir = Direction.top;
            this.onColor = Color.WHITE
            this.l = l;
            this.state = 0;
            this.rules = new RuleSet();
        }
        getTop = () => {
            switch (this.dir) {
                case Direction.top:
                    return new Rect(this.x, this.y - this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y - this.l));
                case Direction.left:
                    return new Rect(this.x - this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x - this.l, this.y));
                case Direction.right:
                    return new Rect(this.x + this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x + this.l, this.y));
                case Direction.down:
                    return new Rect(this.x, this.y + this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y + this.l));
            }
        }
    
        getLeft = () => {
            switch (this.dir) {
                case Direction.top:
                    return new Rect(this.x - this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x - this.l, this.y));
                case Direction.left:
                    return new Rect(this.x, this.y + this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y + this.l));
                case Direction.right:
                    return new Rect(this.x, this.y - this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y - this.l));
                case Direction.down:
                    return new Rect(this.x + this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x + this.l, this.y));
            }
        }
    
        getRight = () => {
            switch (this.dir) {
                case Direction.top:
                    return new Rect(this.x + this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x + this.l, this.y));
                case Direction.left:
                    return new Rect(this.x, this.y - this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y - this.l));
                case Direction.right:
                    return new Rect(this.x, this.y + this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y + this.l));
                case Direction.down:
                    return new Rect(this.x - this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x - this.l, this.y));
            }
        }
    
        getDown = () => {
            switch (this.dir) {
                case Direction.top:
                    return new Rect(this.x, this.y + this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y + this.l));
                case Direction.left:
                    return new Rect(this.x + this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x + this.l, this.y));
                case Direction.right:
                    return new Rect(this.x - this.l, this.y, this.w, this.h, g.getRealPixelColor(this.x - this.l, this.y));
                case Direction.down:
                    return new Rect(this.x, this.y - this.l, this.w, this.h, g.getRealPixelColor(this.x, this.y - this.l));
            }
        }
    
        checkColor = (dir, v_r, v_g = undefined, v_b = undefined, v_a = undefined) => {
    
            if (v_g == undefined) {
                switch (v_r) {
                    case 'black':
                        return this.checkColor(dir, 0, 0, 0, 255);
    
                    case 'white':
                        return this.checkColor(dir, 255, 255, 255, 255);
                    case 'red':
                        return this.checkColor(dir, 255, 0, 0, 255);
                    case 'blue':
                        return this.checkColor(dir, 0, 0, 255, 255);
    
                    case 'transparent':
                        return this.checkColor(dir, 0, 0, 0, 0);
    
                    default:
                        return false;
                }
            }
    
            let rect = null;
    
            switch (dir) {
                case Direction.top:
                    rect = this.getTop();
                    break;
                case Direction.left:
                    rect = this.getLeft();
                    break;
                case Direction.right:
                    rect = this.getRight();
                    break;
                case Direction.down:
                    rect = this.getDown();
                    break;
            }
    
            let data = g.getPixelData(rect.x + c.center.x, rect.y + c.center.y);
            let R = data[0];
            let G = data[1];
            let B = data[2];
            let A = data[3];
    
            return R == v_r && G == v_g && B == v_b && A == v_a;
    
    
        }
    
        Draw = () => {
            this.draw();
            switch (this.dir) {
                case Direction.top:
                    new Rect(this.x, this.y - this.h / 3, this.w, this.h / 3, 'green').draw();
                    break;
                case Direction.left:
                    new Rect(this.x - this.w / 3, this.y, this.w / 3, this.h, 'green').draw();
                    break;
                case Direction.right:
                    new Rect(this.x + this.w / 3, this.y, this.w / 3, this.h, 'green').draw();
                    break;
                case Direction.down:
                    new Rect(this.x, this.y + this.h / 3, this.w, this.h / 3, 'green').draw();
                    break;
            }
    
        }
    
        moveForward = () => {
    
            let newOnColor = this.getTop().color;
    
    
            switch (this.dir) {
                case Direction.top:
                    this.y -= this.l;
                    break;
                case Direction.left:
                    this.x -= this.l;
                    break;
                case Direction.right:
                    this.x += this.l;
                    break;
                case Direction.down:
                    this.y += this.l;
                    break;
    
                default:
                    break;
            }
    
            this.getDown().setColor(this.onColor).draw();
            this.onColor = newOnColor;
    
        }
    
        turnRight = () => {
            switch (this.dir) {
                case Direction.top:
                    this.dir = Direction.right;
                    break;
                case Direction.left:
                    this.dir = Direction.top;
                    break;
                case Direction.right:
                    this.dir = Direction.down;
                    break;
                case Direction.down:
                    this.dir = Direction.left;
                    break;
    
                default:
                    break;
            }
    
        }
    
    
        turnLeft = () => {
            switch (this.dir) {
                case Direction.top:
                    this.dir = Direction.left;
                    break;
                case Direction.left:
                    this.dir = Direction.down;
                    break;
                case Direction.right:
                    this.dir = Direction.top;
                    break;
                case Direction.down:
                    this.dir = Direction.right;
                    break;
    
                default:
                    break;
            }
    
        }
    
    
        checkRule = () => {
            let ruleset = this.rules.filter(e => e.state == this.state).filter(e => e.color == this.onColor);
    
            if (ruleset.length == 1) {
                let r = ruleset[0];
                this.onColor = r.newColor;
    
                switch (r.turn) {
                    case Turn.L:
                        this.turnLeft();
                        break;
                    case Turn.R:
                        this.turnRight();
                        break;
                    case Turn.U:
                        this.turnLeft();
                        this.turnLeft();
                        break;
                    case Turn.N:
                        break;
    
    
                }
    
                this.moveForward();
                this.state = r.nextState;
    
                this.Draw();
    
            }
    
        }
    
    
    
    
    
    
    }
    


    /**Rules */
    let Rules = $create('div');
    Rules.className = 'BODY';
    document.body.appendChild(Rules)

    /**Regeln erstellen Button */
    let create_rule = $create('button');
    create_rule.classList.add('button-add');
    create_rule.innerHTML = '+';
    create_rule.onclick = () => {
        $table_new_row(table)
    }

    let table = $create_table('State:number', 'current Color:color', 'next Color:color', 'Turn:number', 'next State:number');
    $table_new_row(table, 0, '#FFFFFF', '#000000', 0, 0)
    Rules.append(create_rule, table)
    document.body.append(Rules)

    let text_step = $create('h1')
    document.body.append(text_step)


    /**START BUTTONS */

    let start = $create('button')
    start.innerHTML = 'Start'
    start.onclick = () => {
        reset();
        t.rules = new RuleSet();
        for (let i = 0; i < $table_rows(table); i++) {
            let row = $table_get_row(table, i);
            t.rules.push(Number(row.get('State')), hexToRgb(row.get('current Color')), hexToRgb(row.get('next Color')), Number(row.get('Turn')), Number(row.get('next State')));

        }
    }
    document.body.append(start)

    let start_spiral = $create('button')
    start_spiral.innerHTML = 'Start Spiral'


    start_spiral.onclick = () => {
        reset();
        
    g.setFillStyle(Color.WHITE);
    g.fillRect(0, 0, c.width, c.height);

        t.rules = new RuleSet()
            .push(0,Color.WHITE,Color.BLACK,Turn.N,1)
            .push(0,Color.BLACK,Color.BLACK,Turn.R,0)
            .push(1,Color.WHITE,Color.BLACK,Turn.L,1)
            .push(1,Color.BLACK,Color.WHITE,Turn.N,0)
    }


    document.body.append(start_spiral)

    
    let start_brain = $create('button')
    start_brain.innerHTML = 'Start Brain'


    start_brain.onclick = () => {
        reset();
        t.onColor = Color.BLACK;
        g.setFillStyle(Color.BLACK);
        g.fillRect(0, 0, c.width, c.height);

        t.rules = new RuleSet()
        .push(0, Color.BLACK, Color.GREEN, Turn.L, 0)
        .push(0, Color.GREEN, Color.RED, Turn.R, 0)
        .push(0, Color.RED, Color.BLUE, Turn.R, 0)
        .push(0, Color.BLUE, Color.BLACK, Turn.L, 0)

    }


    document.body.append(start_brain)
    
    let start_fibbo = $create('button')
    start_fibbo.innerHTML = 'Start Fibonacci'


    start_fibbo.onclick = () => {
        reset();
        
    g.setFillStyle(Color.WHITE);
    g.fillRect(0, 0, c.width, c.height);


        t.rules = new RuleSet()
            .push(0,Color.WHITE,Color.BLACK,Turn.L,1)
            .push(0,Color.BLACK,Color.BLACK,Turn.L,1)
            .push(1,Color.WHITE,Color.BLACK,Turn.R,1)
            .push(1,Color.BLACK,Color.WHITE,Turn.N,0)
    }


    document.body.append(start_fibbo)


    let MSEC = $create('input','msec')
    MSEC.placeholder = 'One frame per x msec'
    let SPEED = $create('input','speed')
    SPEED.placeholder = 'Speed'
    let MAXSTEPS = $create('input','maxSteps')
    MAXSTEPS.placeholder = 'Max Steps'
    let BACKGROUND = $create('input','background')
    BACKGROUND.type = 'color'
    
    document.body.append(MSEC,SPEED,MAXSTEPS,BACKGROUND)

    let c = createCanvas(window.innerWidth - 50, window.innerHeight - 200);
    g = c.g;

    let msec = 1;
    let speed = 100;
    let maxSteps = undefined



    step = 1;

    t = new Turmite(0, 0, 2);



    const runCanvas = () => {

        for (let i = 0; i < speed; i++) {


            if (step < maxSteps || !maxSteps) {

                t.checkRule();
                text_step.innerHTML = step + ' steps!';
                step++;
            }
        }
    }

    let x = setInterval(null, msec);





    const reset = () => {


        msec = Number($v('msec'));
        speed = Number($v('speed'));
        maxSteps = Number($v('maxSteps'));
        background = hexToRgb($v('background'));

        clearInterval(x);
        g.setFillStyle(hexToRgb($v('background')));
        g.fillRect(0, 0, c.width, c.height);
        t.x = 0;
        t.y = 0;
        t.dir = Direction.top;
        t.onColor = Color.WHITE;
        t.state = 0;
        step = 1;
        x = setInterval(runCanvas, msec);
    }



    const NewTest = (msec, speed = 100, maxSteps = undefined, keyboard = false) => {

        t = new Turmite(0, 0, 50);

        t.onColor = Color.WHITE;
        x = setInterval(() => { });

        start.onclick = () => {
            clearInterval(x);
            g.setFillStyle(Color.WHITE);
            //g.fillRect(0, 0, c.width, c.height);
            step = 0;

            t.rules = new RuleSet();
            for (let i = 0; i < $table_rows(table); i++) {
                let row = $table_get_row(table, i);
                t.rules.push(Number(row.get('State')), hexToRgb(row.get('current Color')), hexToRgb(row.get('next Color')), Number(row.get('Turn')), Number(row.get('next State')));

            }
            console.log(t.rules)
            if (keyboard) {
                document.body.onkeydown = () => t.checkRule();
                return
            }
            x = setInterval(() => {

                for (let i = 0; i < speed; i++) {


                    if (step < maxSteps || !maxSteps) {

                        t.checkRule();
                        text_step.innerHTML = step;
                        step++;
                    }
                }
            }, msec);

        }







    }








}