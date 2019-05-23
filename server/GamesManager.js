import slugify from 'slugify';
import Game from './Game.js';

class GamesManager {
    games = {};

    exist(name) {
        return this.games.hasOwnProperty(name);
    }

    get(name) {
        return this.games[name];
    }

    add(name) {
        this.games[name] = new Game();
    }

    join(username, game) {
        const name = slugify(game.toLowerCase());

        if (!this.exist(name)) {
            this.add(name);
        }

        this.get(name).join(username);

        return name;
    }
}

export default GamesManager;
