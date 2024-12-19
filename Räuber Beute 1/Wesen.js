class Wesen {
    static i = 0;
    static all = [];
    /**
     *
     * @param {number} Anzahl
     * @param {number} Geburtenrate
     * @param {number} Sterberate
     * @param {string|null} name
     */
    constructor(Anzahl, Geburtenrate, Sterberate, name = null, color = null) {
        this.Anzahl = Anzahl;
        this.Geburtenrate = Geburtenrate;
        this.Sterberate = Sterberate;
        this.id = Wesen.i;
        this.name = name ? name : `Wesen_${this.id}`;
        this.color = color ? color : `${this.id}`;
        Wesen.i++;

        Wesen.all.push(this)
    }

    copy = () => new Wesen(this.Anzahl, this.Geburtenrate, this.Sterberate, this.name);

    toString = () => `${this.name}:
    Anzahl = ${this.Anzahl},
    Geburtenrate = ${this.Geburtenrate},
    Sterberate = ${this.Sterberate}`;
}
