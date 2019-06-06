import React, { Dispatch, ReducerAction, useReducer } from 'react';

type Reducer<S> = (state: S, payload: any) => S;
type Reducers<S> = {
  [actionType: string]: Reducer<S>;
};

export type ContextValue<S> = {
  state: S;
  dispatch: Dispatch<ReducerAction<ReturnType<typeof reducer>>>;
};

export const createContextHOC = (
  initialState: any,
  reducers: Reducers<typeof initialState>,
  context: React.Context<ContextValue<typeof initialState>>,
): React.FC => ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer<typeof initialState>(reducers),
    initialState,
  );

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export const reducer = <S extends {}>(reducers: Reducers<S>) => (
  state: S,
  action: ReducerAction<Reducer<S>>,
) => reducers[action.type](state, action.payload);
