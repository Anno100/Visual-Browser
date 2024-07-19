
class Beziehung_Raeuber_Beute {

    static i = 0;
    static all = []
    /**
     * 
     * @param {Wesen} Raeuber 
     * @param {Wesen} Beute 
     */
    constructor(Raeuber, Beute) {
        this.Raeuber = Raeuber;
        this.Beute = Beute;
        this.id = Beziehung_Raeuber_Beute.i;
        
        Beziehung_Raeuber_Beute.i++;
        Beziehung_Raeuber_Beute.all.push(this);
    }

    i = 0;
    step = 0.01;

    /**
     * 
     * @returns {number}
     */
    getKontakthaeufigkeit = () => this.Raeuber.Anzahl * this.Beute.Anzahl;

    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getZuwachs = () => {
        return {
            vonRaeuber: this.Raeuber.Geburtenrate * this.getKontakthaeufigkeit(),
            vonBeute: this.Beute.Geburtenrate * this.Beute.Anzahl
        }
    }
    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getAbnahme = () => {
        return {
            vonRaeuber: this.Raeuber.Sterberate * this.Raeuber.Anzahl,
            vonBeute: this.Beute.Sterberate * this.getKontakthaeufigkeit()
        }
    }

    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getAenderung = () => {
        return {
            vonRaeuber: (this.getZuwachs().vonRaeuber-this.getAbnahme().vonRaeuber)*this.step,
            vonBeute: (this.getZuwachs().vonBeute-this.getAbnahme().vonBeute)*this.step
        }
    }
    
    /**
     * 
     * @returns {{vonRaeuber:number,vonBeute:number}}
     */
    getNext = () => {
        return {
            vonRaeuber: this.Raeuber.Anzahl + this.getAenderung().vonRaeuber,
            vonBeute: this.Beute.Anzahl + this.getAenderung().vonBeute
        }
    }

    tick = () => {
        this.Raeuber.Anzahl = this.getNext().vonRaeuber;
        this.Beute.Anzahl = this.getNext().vonBeute;
        this.i+=this.step;
    }

    toString = () => 
`[${this.i}]
<span style = color:red>(Räuber)</span>
${this.Raeuber.toString()},
    Änderung für nächsten tick = ${this.getAenderung().vonRaeuber}

<span style = color:blue>(Beute)</span>
${this.Beute.toString()},
    Änderung für nächsten tick = ${this.getAenderung().vonRaeuber}
    
==>  next ${this.Raeuber.name} = ${this.getNext().vonRaeuber} -- next ${this.Beute.name} = ${this.getNext().vonBeute}`


    static exist = (r_id,b_id) => Beziehung_Raeuber_Beute.all.filter(e => e.Raeuber.id == r_id && e.Beute.id == b_id).length > 0;

}
