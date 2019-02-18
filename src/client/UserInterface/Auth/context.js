import React from 'react';

const Context = React.createContext();

const initialState = {
    scene: 'login',
    username: '',
    password: '',
    validation: [],
};

function parseValidation(state, validation) {
    const [, form, field, error] = /(.+)\.(.+):(.+)/.exec(validation);
    return [
        ...state,
        { form, field, error },
    ];
}

const reducer = (state, action) => {
    return (({
        'set-scene': scene => ({
            ...state,
            scene,
        }),
        'set-username': username => ({
            ...state,
            username: action.payload,
        }),
        'set-password': password => ({
            ...state,
            password: action.payload,
        }),
        'validation': validation => ({
            ...state,
            validation: typeof validation === 'string'
                ? parseValidation(validation)
                : validation,
        })
    })[action.type] || (() => state))(action.payload);
};

function ContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
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
