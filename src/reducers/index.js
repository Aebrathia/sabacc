import {
    JOIN_GAME,
    JOIN_GAME_ERROR,
    ADD_PLAYER,
    RECOVER_GAME,
    IS_READY
} from '../actions/types';

const initialState = {
    error: null,
    username: null,
    players: {
        byId: {},
        allIds: []
    },
    game: {
        name: null,
        slug: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case JOIN_GAME: {
        const { game, username, players } = action.payload;
        return {
            ...state,
            username,
            game,
            players: {
                byId: players.reduce((newById, player) => {
                    newById[player] = { username: player };
                    return newById;
                }, {}),
                allIds: players
            },
            error: null
        };
    }
    case JOIN_GAME_ERROR:
        return {
            ...state,
            ...action.payload,
            game: {
                name: null,
                slug: null
            }
        };
    case ADD_PLAYER: {
        const { byId, allIds } = state.players;
        const { username } = action.payload;
        return {
            ...state,
            players: {
                byId: {
                    ...byId,
                    [username]: { username }
                },
                allIds: [...allIds, username]
            }
        };
    }
    case RECOVER_GAME: {
        const { username, game, players } = action.payload;
        return {
            ...state,
            username,
            game,
            players: {
                byId: players,
                allIds: Object.keys(players)
            }
        };
    }
    case IS_READY: {
        const { players } = state;
        const { username } = action.payload;
        return {
            ...state,
            players: {
                ...players,
                byId: {
                    ...players.byId,
                    [username]: {
                        ...players.byId[username],
                        isReady: true
                    }
                }
            }
        };
    }
    default:
        return state;
    }
};
