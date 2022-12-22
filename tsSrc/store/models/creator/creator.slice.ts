import { createSlice } from '@reduxjs/toolkit';

import { TCreatorState } from './typings/types';
import { reducers } from './creator.reducer';

export const initialState: TCreatorState = {
  table: 'x_aaro2_teamwork_container',
  sysId: '-1',
  views: 'Modal',
  opened: false,
  query: '',
  fields: [],
  id: { id: null },
  workspaceConfigId: '',
};

const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers,
});

export const creatorReducer = creatorSlice.reducer;

export const { setFields, setOpened, setSysId, resetCreatorState } = creatorSlice.actions;
