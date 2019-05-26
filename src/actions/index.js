import { JOIN_GAME, JOIN_GAME_ERROR, ADD_PLAYER, RECOVER_GAME } from './types';
import socket from '../socket';

const send = (type, data, callback) => {
    const confirm = response => {
        callback(response);
        socket.off(type, confirm);
    };
    socket.on(type, confirm);
    socket.emit(type, data);
};

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
        localStorage.setItem('username', username);
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

export const recoverGame = slug => dispatch => {
    const username = localStorage.getItem('username');

    if (!username) {
        return false;
    }

    send('recover game', { slug, username }, ({ name, players }) => {
        dispatch({
            type: RECOVER_GAME,
            payload: {
                username,
                game: {
                    slug,
                    name
                },
                players
            }
        });
    });

    return true;
};
