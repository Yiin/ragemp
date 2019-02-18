import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import Auth from './Auth';
import { Context, ContextProvider } from './context';

window.dispatch = (type, payload) => {
    const [dispatch] = useContext(Context);

    dispatch({ type, payload });
};

ReactDOM.render(
    <ContextProvider>
        <Auth />
    </ContextProvider>
, document.getElementById('main'));
