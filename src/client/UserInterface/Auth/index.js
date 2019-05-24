import React, { useState, createContext, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Auth from './Auth';
import reducers, { initialState } from './asm';

export const Context = createContext();

const reducer = (state, action) => reducers[action.type](state, action.payload);

function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    window.dispatch = (type, payload) => dispatch({ type, payload });

    const value = { state, dispatch };

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    );
}

const Bridge = () => {
    const [state, setState] = useState({});

    window.dispatch = (actionType, payload) => dispatch(actionType, payload);
    window.setState = updatedState => setState({ ...state, updatedState });

    return (
        <ContextProvider value={ state }>
            <Auth { ...state } />
        </ContextProvider>
    );
};

ReactDOM.render(
    <Bridge />
, document.getElementById('main'));

if (module.hot) {
    module.hot.accept();
}
