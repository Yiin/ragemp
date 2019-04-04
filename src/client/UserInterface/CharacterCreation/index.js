import React from 'react';
import ReactDOM from 'react-dom';

import { ContextProvider } from './context';
import CharacterCreation from './CharacterCreation';

const Bridge = () => {
    return (
        <ContextProvider>
            <CharacterCreation />
        </ContextProvider>
    );
};

ReactDOM.render(
    <Bridge />
, document.getElementById('main'));
