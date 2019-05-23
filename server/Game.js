import Player from './Player.js';

class Game {
    players = {};

    join(username) {
        this.players[username] = new Player(username);
    }

    getAllPlayers() {
        return Object.keys(this.players);
    }
}

export default Game;
