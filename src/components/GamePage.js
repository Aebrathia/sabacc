import React from 'react';
import { useStore } from '../StoreContext';
import Player from './Player/Player.js';
import { Redirect } from 'react-router-dom';

const GamePage = ({ match: { params } }) => {
    const { username, game, players, recoverGame } = useStore();
    const shouldTryRecovering = !username;
    const isRecoveringGame =
        shouldTryRecovering && recoverGame(params.game, username);
    const shouldRedirect = shouldTryRecovering && !isRecoveringGame;

    return (
        <div className="GamePage">
            {shouldRedirect && <Redirect to="/" />}
            {shouldTryRecovering && isRecoveringGame ? (
                <p>Recovering game…</p>
            ) : (
                <>
                    <p>{game.name}</p>
                    {players.allIds.map(player => (
                        <Player key={player} {...players.byId[player]} />
                    ))}
                    <p>{username}</p>
                </>
            )}
        </div>
    );
};

export default GamePage;
