import { CloseActions } from './typings/enum';
import { TCloseState } from './typings/types';
import { PayloadAction } from '@reduxjs/toolkit';

export const reducers = {
  [CloseActions.SHOW_CLOSE_MODAL]: (state: TCloseState, action: PayloadAction<boolean>) => {
    state.show = action.payload;
  },
};
