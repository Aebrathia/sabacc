import Player from './Player.js';

class Game {
    constructor({ name }) {
        this.name = name;
    }

    players = {};

    join(username) {
        this.players[username] = new Player(username);
    }

    getAllPlayers() {
        return Object.keys(this.players);
    }

    getPlayer(username) {
        return this.players[username];
    }

    recover(username) {
        const { name, players } = this;
        return { name, players };
    }
}

export default Game;
