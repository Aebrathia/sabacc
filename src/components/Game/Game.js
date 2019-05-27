import React from 'react';
import Player from '../Player/Player';
import Opponent from '../Opponent/Opponent';
import { useStore } from '../../StoreContext';

const Game = () => {
    const { username, game, players, setPlayerReady } = useStore();
    const { [username]: player, ...opponents } = players.byId;
    const opponentsIds = players.allIds.filter(id => id !== username);

    return (
        <div className="Game">
            <p>{game.name}</p>
            {opponentsIds.map(id => (
                <Opponent key={id} {...opponents[id]} />
            ))}
            <Player
                {...player}
                setReady={() => setPlayerReady(username, game.slug)}
            />
        </div>
    );
};

export default Game;
