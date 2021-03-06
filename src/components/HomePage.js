import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../StoreContext';

const HomePage = () => {
    const { game, joinGame } = useStore();
    const handleSubmit = e => {
        e.preventDefault();
        // Convert formData to object
        const { username, game } = Object.fromEntries(new FormData(e.target));
        joinGame(username, game);
    };

    return (
        <div className="HomePage">
            {game && game.slug && <Redirect to={`/game/${game.slug}`} />}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="game">Game</label>
                <input id="game" name="game" type="text" />
                <button type="submit">Join or create a game</button>
            </form>
        </div>
    );
};

export default HomePage;
