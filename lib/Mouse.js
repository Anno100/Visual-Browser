



let check_Mouse = setInterval(() => {

    if (gameObject) {
        Mouse = class Mouse extends gameObject {

            static type = (new Mouse()).type;
            down = false;

            constructor() {
                super(0, 0, 'black');
            }


            draw = (g = gameObject.g) => {
                g.setFillStyle(this.color);
                g.translate(this.x + g.parent.center.x, this.y + g.parent.center.y);
                g.rotate(this.angle);
                g.fillRect(0, 0, 1, 1);
                g.rotate(-this.angle);
                g.translate(-this.x - g.parent.center.x, -this.y - g.parent.center.y);
            };


            /**
             * 
             * @param {gameObject} other 
             */
            overlap = (other) => {
                if(other.type == Rect.type){ //Rect
                    if(this.x >= other.x - other.w/2 && other.x + other.w/2 >= this.x && this.y >= other.y - other.w/2 && other.y + other.h/2 >= this.y){
                        return true;
                    }
                }

                return false;
            }

        }
        load_mouse = true;
        clearInterval(check_Rect);
    }
    else{
        console.log("wait");
    }
},1);