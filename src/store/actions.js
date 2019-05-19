import io from 'socket.io-client';
import { JOIN_GAME, JOIN_GAME_ERROR } from './types';

const socket = io('localhost:3000');

export const joinGame = (username, game) => dispatch => {
    const confirm = ({ error, url }) => {
        dispatch(
            error
                ? {
                    type: JOIN_GAME_ERROR,
                    payload: {
                        username,
                        error
                    }
                }
                : {
                    type: JOIN_GAME,
                    payload: {
                        username,
                        game,
                        url
                    }
                }
        );

        socket.off('join game', confirm);
    };
    socket.on('join game', confirm);
    socket.emit('join game', { username, game });
};
