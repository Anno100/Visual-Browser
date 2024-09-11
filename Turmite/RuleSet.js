class RuleSet {
    all = [];

    push = (state, color, newColor, turn, nextState) => {
        this.all.push(new Rule(state, color, newColor, turn, nextState));
        return this;
    };
    filter = (p) => this.all.filter(p);
    forEach = (p) => this.all.forEach(p);
}
