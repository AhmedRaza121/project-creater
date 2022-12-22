import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './form.extra-reducer';
import { TRecordFormState } from './typings/types';
import { reducers } from './form.reducer';

export const initialState: TRecordFormState = {
  isNewRecord: true,
  isValidRecord: false,
  uiActions: [],
  layouts: [],
  loading: true,
  formLoading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'creatorForm',
  initialState,
  reducers,
  extraReducers,
});

export const formReducer = formSlice.reducer;

export const { resetFormState } = formSlice.actions;
