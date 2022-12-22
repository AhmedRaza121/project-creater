import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './close.extra-reducer';
import { TCloseState } from './typings/types';
import { reducers } from './close.reducer';

const initialState: TCloseState = {
  show: false,
};

const closeSlice = createSlice({
  name: 'close',
  initialState,
  reducers,
  extraReducers,
});

export const closeReducer = closeSlice.reducer;
export const { showCloseModal } = closeSlice.actions;
