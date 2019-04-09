import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import CharacterSelection from './CharacterSelection';
import PlayButton from './components/PlayButton';

ReactDOM.render(
    <Fragment>
        <CharacterSelection />
        <PlayButton />
    </Fragment>
, document.getElementById('main'));
