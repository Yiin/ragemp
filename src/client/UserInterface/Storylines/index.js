import React from 'react';
import ReactDOM from 'react-dom';

import background from '../in-game-background.jpg';
import Storylines from './Storylines';

// document.body.style.background = `url(${background})`;
// document.body.style.backgroundSize = 'cover';

ReactDOM.render(<Storylines />, document.getElementById('main'));
