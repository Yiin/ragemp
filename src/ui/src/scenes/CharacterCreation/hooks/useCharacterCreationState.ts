import { useReducer, useEffect } from 'react';
import rpc from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';
import { initialState } from '../asm';

const useCharacterCreationState = (reducer: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    rpc.callClient(
      SharedConstants.CharacterCreation.RPC.UPDATE_CHARACTER_FEATURES,
      state,
    );
  }, [state]);

  return { state, dispatch };
}

export default useCharacterCreationState;
