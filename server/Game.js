import Player from './Player.js';

class Game {
    players = {};

    join(username) {
        this.players[username] = new Player(username);
    }
}

export default Game;
