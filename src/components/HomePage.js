import React from 'react';
import { useStore } from '../store/StoreContext';

const HomePage = () => {
    const { joinGame } = useStore();
    const handleSubmit = e => {
        e.preventDefault();
        // Convert formData to object
        const { username, game } = Object.fromEntries(new FormData(e.target));
        joinGame(username, game);
    };

    return (
        <div className="HomePage">
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
