import { JOIN_GAME, JOIN_GAME_ERROR } from './types';

export const initialState = {
    error: null,
    username: null,
    game: null,
    url: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case JOIN_GAME:
        return {
            ...state,
            ...action.payload,
            error: null
        };
    case JOIN_GAME_ERROR:
        return {
            ...state,
            ...action.payload,
            game: null,
            url: null
        };
    default:
        return state;
    }
};
