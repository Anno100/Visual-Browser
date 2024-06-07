/**
 * Create an Object
 */
class Obj {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {string|CanvasGradient|CanvasPattern} color   Write Color with name, rgb(r,g,b,t=1) or hexa 0x000000-0xFFFFFF
     */
    constructor(x, y, color) {
        /**@type {number} */
        this.x = x;
        /**@type {number} */
        this.y = y;
        /**@type {string|CanvasGradient|CanvasPattern} */
        this.color = color;

        /** Defines the distance from camera
         * @type {number}*/
        this.z = 0;
    }

    /**
     * 
     * @param {Obj} other 
     */
    overlap = (other) => {
        console.warn("Create overlap for this Obj");
    }
}
