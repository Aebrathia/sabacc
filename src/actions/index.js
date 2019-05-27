import {
    JOIN_GAME,
    JOIN_GAME_ERROR,
    ADD_PLAYER,
    RECOVER_GAME,
    IS_READY
} from './types';
import socket, { send } from '../socket';

export const joinGame = (username, gameName) => dispatch => {
    send(
        'join game',
        { username, game: gameName },
        ({ error, slug, players }) => {
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
        }
    );
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

export const setReady = ({ username }) => ({
    type: IS_READY,
    payload: {
        username
    }
});

export const setPlayerReady = (username, slug) => {
    socket.emit('player is ready', { username, slug });
    return setReady({ username });
};
