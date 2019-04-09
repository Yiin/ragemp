import React from 'react';
import ReactDOM from 'react-dom';
import * as luxon from 'luxon';

window.luxon = luxon;

import CharacterSelection from './CharacterSelection';

ReactDOM.render(
    <CharacterSelection />
, document.getElementById('main'));
