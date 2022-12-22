import { TypeActions } from './typings/enums';
import { initialState } from './type.slice';

export const reducers = {
  [TypeActions.RESET_STATE]: () => initialState,
};
