import { DistributionActions } from './typings/enums';
import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { TActiveTab, TDistributionState } from './typings/types';
import { initialState } from './distribution.slice';

export const reducers = {
  [DistributionActions.SET_ACTIVE_TAB]: (
    state: Draft<TDistributionState>,
    action: PayloadAction<TActiveTab>
  ) => {
    state.activeTab = action.payload;
  },
  [DistributionActions.RESET_STATE]: () => initialState,
};
