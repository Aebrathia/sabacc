import { JOIN_GAME, JOIN_GAME_ERROR, ADD_PLAYER } from './types';
import socket from '../socket';

export const joinGame = (username, gameName) => dispatch => {
    const confirm = ({ error, slug, players }) => {
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
                        players,
                        game: {
                            name: gameName,
                            slug
                        }
                    }
                }
        );

        socket.off('join game', confirm);
    };
    socket.on('join game', confirm);
    socket.emit('join game', { username, game: gameName });
};

export const addPlayer = ({ username }) => {
    return {
        type: ADD_PLAYER,
        payload: {
            username
        }
    };
};
