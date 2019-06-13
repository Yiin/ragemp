import React from 'react';

import { ContextProvider } from './context';
import CharacterCreation from './CharacterCreation';

const Bridge = () => (
  <ContextProvider>
    <CharacterCreation />
  </ContextProvider>
);

export default Bridge;
