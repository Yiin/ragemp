import React, { createContext } from 'react';
import reducers, { middleware } from './asm';
import useCharacterCreationState from './hooks/useCharacterCreationState';

export const Context = createContext();

const reducer = (state, action) => middleware(
  state,
  action,
  () => reducers[action.type](state, action.payload)
);

export function ContextProvider({ children }) {
  const value = useCharacterCreationState(reducer);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}
