import slugify from 'slugify';
import Game from './Game.js';

class GamesManager {
    games = {};

    exist(slug) {
        return this.games.hasOwnProperty(slug);
    }

    get(slug) {
        return this.games[slug];
    }

    add({ name, slug }) {
        this.games[slug] = new Game({ name });
    }

    join(name, username) {
        const slug = slugify(name.toLowerCase());

        if (!this.exist(slug)) {
            this.add({ name, slug });
        }

        this.get(slug).join(username);

        return slug;
    }
}

export default GamesManager;
