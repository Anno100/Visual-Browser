let check_Complex = setInterval(() => {
    if (Object) {
        Complex = class Complex extends Object {
            
            constructor(Re,Im){
                super();
                this.Re = Re;
                this.Im = Im;
            }
            toString = () => {
                let IM = this.Im != 0 ? `${Math.abs(this.Im)}i`: ''
                let RE = this.Re != 0 ? `${this.Re}`: ''
                return `${this.Re} ${this.Im < 0 ? '-' : (this.Im > 0 ? '+' : '')} ${IM}`.trim()
            }
            add = (other) => new Complex(this.Re + other.Re,this.Im+other.Im);
            abs = () => Math.sqrt(this.Re**2 + this.Im**2);
            mul = (other) => new Complex(this.Re*other.Re-this.Im*other.Im,this.Re*other.Im+this.Im*other.Re);
            toVector = () => new Vector2D(this.Re,this.Im);
        }
        load_Complex = true;
        clearInterval(check_Complex);
    }
    else {
        console.log('wait');
    }
}, 1);