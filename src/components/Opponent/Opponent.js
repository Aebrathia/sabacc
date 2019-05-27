import React from 'react';

const Opponent = ({ username, isReady }) => (
    <div className="Opponent">
        Opponent {username} {isReady && 'ready'}
    </div>
);

export default Opponent;
