

/**
 * Create a rectangle
 * @extends Obj
 */
class Rect extends Obj{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string|CanvasGradient|CanvasPattern} color  Write Color with name, rgb(r,g,b,t=1) or hexa 0x000000-0xFFFFFF
     */
    constructor(x,y,width,height,color){
        super(x,y,color);
        
        /**@type {number} */
        this.width = width;
        
        /**@type {number} */
        this.height = height;
        
    }

    
/**
 * Transform
 * @param {number} dx 
 * @param {number} dy 
 */
    transform = (dx,dy) => {
        return new Rect(this.x + dx, this.y + dy, this.width, this.height);
    }

    /**Transform to top border */
    transform_TopBorder = () => {
        return this.transform(0,-c.height/2 + this.height/2);
    }
    /**Transform to top border */
    transform_BottomBorder = () => {
        return this.transform(0,c.height/2 - this.height/2);
    }
    /**Transform to left border */
    transform_LeftBorder = () => {
        return this.transform(-c.width/2 + this.width/2,0);
    }
    /**Transform to left border */
    transform_RightBorder = () => {
        return this.transform(c.width/2 - this.width/2,0);
    }


/**
 * 
 * @param {Rect} other 
 */
    overlap_right = (other) => new Rect(this.x + 0.49 * this.width,this.y,0.01*this.width,this.height).overlap(other);
    overlap_left = (other) => new Rect(this.x - 0.5 * this.width,this.y,0.01*this.width,this.height).overlap(other);
    overlap_up = (other) => new Rect(this.x - 0 * this.width,this.y - 0.5 * this.height,this.width,0.01*this.height).overlap(other);
    overlap_down = (other) => new Rect(this.x - 0 * this.width,this.y + 0.49 * this.height,this.width,0.01*this.height).overlap(other);
    
/**
 * 
 * @param {Rect} other 
 */
    overlap = (other) => this.x+this.width/2 > other.x - other.width/2 && other.x+other.width/2 > this.x - this.width/2 &&
                        this.y+this.height/2 > other.y - other.height/2 && other.y+other.height/2 > this.y - this.height/2;

    draw = () => {
        gc.setFillColor(this.color);
        gc.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    }

    /**
     * 
     * @param {Rect} rect 
     * @returns {Rect}
     */
    copy = () => {
        return new Rect(this.x,this.y,this.width,this.height,this.color);
    }

    toString = () => {
        return `{x:${this.x},y:${this.y},width:${this.width},height:${this.height},color:${this.color}}`;
    }


}