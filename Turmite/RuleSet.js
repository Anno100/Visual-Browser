class RuleSet {
    /**@type {Rule[]} */
    all = [];

    push = (state, color, newColor, turn, nextState) => {
        this.all.push(new Rule(state, color, newColor, turn, nextState));
        return this;
    };
    filter = (p) => this.all.filter(p);
    /**
     * 
     * @param {(p:Rule) => void} p 
     * @returns {Rule[]}
     */
    forEach = (p) => this.all.forEach(p);

    toString = () => {
        let txt = ''
        this.forEach(e => txt += '-{' + `${e.state},${e.color},${e.newColor},${e.turn},${e.nextState}` + '}');
        return txt;
    }
}
