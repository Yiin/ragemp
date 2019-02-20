import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import Auth from './Auth';
import { ContextProvider } from './context';

ReactDOM.render(
    <ContextProvider>
        <Auth />
    </ContextProvider>
, document.getElementById('main'));
