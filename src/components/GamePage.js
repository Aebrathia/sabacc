import React from 'react';
import { useStore } from '../StoreContext';
import Game from './Game/Game.js';
import { Redirect } from 'react-router-dom';

const GamePage = ({ match: { params } }) => {
    const { username, recoverGame } = useStore();

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
                <Game />
            )}
        </div>
    );
};

export default GamePage;
