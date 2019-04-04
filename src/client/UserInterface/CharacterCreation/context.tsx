import React, { createContext, useReducer, useEffect, Dispatch } from 'react';
import * as rpc from 'rage-rpc';
import { CharacterCreationConstants } from '~/constants/character-creation';
import reducers, { initialState, middleware } from './asm';

export const Context = createContext<{
    state: any,
    dispatch: Dispatch<any>,
}>({
    state: {},
    dispatch() {},
});

const reducer = (state, action) => middleware(
    state,
    action,
    () => reducers[action.type](state, action.payload)
);

export function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        rpc.callClient(CharacterCreationConstants.RPC.UPDATE_CHARACTER_FEATURES, state);
    }, [state]);

    const value = { state, dispatch };

    return (
        <Context.Provider value={ value }>
            { children }
        </Context.Provider>
    );
}
