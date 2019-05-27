import React from 'react';

const Player = ({ username, isReady, setReady }) => (
    <div className="Player">
        <p>Player {username}</p>
        {isReady ? (
            <p>Ready</p>
        ) : (
            <button type="button" onClick={setReady}>
                Ready
            </button>
        )}
    </div>
);

export default Player;
