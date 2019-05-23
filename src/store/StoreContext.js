import React, {
    createContext,
    useReducer,
    useContext,
    useCallback
} from 'react';

const StoreContext = createContext();

const mapDispatchToAction = (dispatch, action) => (...args) => {
    const calledAction = action(...args);
    // Similar to Redux Thunk
    return typeof calledAction === 'function'
        ? calledAction(dispatch)
        : dispatch(calledAction);
};

const mapDispatchToAllActions = (dispatch, actions) =>
    Object.keys(actions).reduce((acc, action) => {
        acc[action] = useCallback(
            // Prevent action reference from changing
            mapDispatchToAction(dispatch, actions[action]),
            [action]
        );
        return acc;
    }, {});

export const StoreProvider = ({
    reducers,
    actions,
    initialState = reducers(null, {}),
    children
}) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    const mappedActions = mapDispatchToAllActions(dispatch, actions);
    // TODO: Flatten state and actions in one object or have [state, actions]?
    return (
        <StoreContext.Provider value={{ ...state, ...mappedActions }}>
            {children}
        </StoreContext.Provider>
    );
};

// TODO: Should we split state context in slices? i.e. useCountState?
export function useStore() {
    return useContext(StoreContext);
}
