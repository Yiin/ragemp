import React from 'react';

const Context = React.createContext();

const initialState = {
    scene: 'login',
    username: '',
    password: '',
    error: false,
};

function parseError(error) {
    const [, form, field, message] = /(.+)\.(.+):(.+)/.exec(error);
    return { form, field, message };
}

const reducer = (state, action) => {
    return (({
        'set-scene': scene => ({
            ...state,
            scene,
            error: false,
        }),
        'set-error': error => ({
            ...state,
            error: typeof error === 'string'
                ? parseError(error)
                : error,
        }),
    })[action.type] || (() => state))(action.payload);
};

function ContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    window.dispatch = (type, payload) => dispatch({ type, payload });

    const value = { state, dispatch };

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    );
}
  
const ContextConsumer = Context.Consumer;
  
export {
    Context,
    ContextProvider,
    ContextConsumer,
};
