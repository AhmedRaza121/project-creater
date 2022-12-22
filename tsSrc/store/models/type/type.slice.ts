import { createSlice } from '@reduxjs/toolkit';

import { TTypeState } from './typings/types';
import { typeExtraReducer } from './type.extra-reducer';
import { reducers } from './type.reducer';

export const initialState: TTypeState = {
  loading: true,
  isEmpty: true,
  types: [],
  typeField: null,
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers,
  extraReducers: typeExtraReducer,
});

export const typeReducer = typeSlice.reducer;
export const { resetTypeState } = typeSlice.actions;
