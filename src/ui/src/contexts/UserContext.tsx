import { createContext } from 'react';
import { ContextValue, createContextHOC } from './shared/context-utils';

type State = {
  characters: CharacterData[];
};

const initialState: State = {
  characters: [],
};

const reducers = {
  SET_CHARACTERS(state: State, characters: CharacterData[]): State {
    return {
      ...state,
      characters,
    };
  },
};

export const UserContext = createContext({} as ContextValue<State>);

export default createContextHOC(initialState, reducers, UserContext);
