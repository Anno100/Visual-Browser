class Turmite extends Rect {
    constructor(x, y, l) {
        super(x, y, l, l, 'red');
        /**@type {Direction} */
        this.dir = Direction.top;
        this.onColor = Color.rgb(255, 255, 255);
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
    };

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
    };

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
    };

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
    };

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


    };

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

    };

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

    };

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

    };


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

    };


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

    };
}
