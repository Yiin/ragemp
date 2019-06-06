import React, { Fragment } from 'react';

import CharacterSelection from './CharacterSelection';
import PlayButton from './components/PlayButton';

const Bridge = () => (
  <Fragment>
    <CharacterSelection />
    <PlayButton />
  </Fragment>
);

export default Bridge;
