import { PayloadAction } from '@reduxjs/toolkit';

import { TCreatorState, TField } from './typings/types';
import { CreatorActions } from './typings/enums';
import { creatorService } from '../../../di';
import { initialState } from './creator.slice';

export const reducers = {
  [CreatorActions.SET_FIELDS]: (state: TCreatorState, action: PayloadAction<TField[]>) => {
    state.fields = action.payload;
  },
  [CreatorActions.SET_OPENED]: (state: TCreatorState, action: PayloadAction<boolean>) => {
    const opened = action.payload;

    return {
      ...state,
      opened,
      id: creatorService.generateID({ isDefaultValue: !opened }),
    };
  },
  [CreatorActions.SET_SYS_ID]: (state: TCreatorState, action: PayloadAction<string>) => {
    state.sysId = action.payload;
  },
  [CreatorActions.RESET_STATE]: () => initialState,
};
