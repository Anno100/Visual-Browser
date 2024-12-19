class Rule {
    /**
     *
     * @param {number} state
     * @param {string} color
     * @param {string} newColor
     * @param {Turn} turn
     * @param {number} nextState
     */
    constructor(state, color, newColor, turn, nextState) {
        this.state = state;
        this.color = color;
        this.newColor = newColor;
        this.turn = turn;
        this.nextState = nextState;
    }



}
