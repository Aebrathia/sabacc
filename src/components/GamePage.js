import React from 'react';
import { useStore } from '../store/StoreContext';
import Player from './Player/Player.js';

const GamePage = () => {
    const { username, game, players } = useStore();
    return (
        <div className="GamePage">
            <p>{game.name}</p>
            {players.allIds.map(player => (
                <Player key={player} {...players.byId[player]} />
            ))}
            <p>{username}</p>
        </div>
    );
};

export default GamePage;
