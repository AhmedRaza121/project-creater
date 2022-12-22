import { FormActions } from './typings/enums';
import { initialState } from './form.slice';

export const reducers = {
  [FormActions.RESET_STATE]: () => initialState,
};
