import slugify from 'slugify';
import Game from './Game.js';

class GamesManager {
    games = {};

    gameExist(name) {
        return this.games.hasOwnProperty(name);
    }

    getGame(name) {
        return this.games[name];
    }

    addGame(name) {
        this.games[name] = new Game();
    }

    join(username, game) {
        const name = slugify(game);

        if (!this.gameExist(name)) {
            this.addGame(name);
        }

        this.getGame(name).join(username);

        return name;
    }
}

export default GamesManager;
