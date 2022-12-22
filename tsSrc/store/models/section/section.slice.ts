import { createSlice } from '@reduxjs/toolkit';

import { reducers } from './section.reducer';

import { TSectionState } from './typings/types';

export const initialState: TSectionState = {
  currentSectionIndex: 0,
  sections: [],
  currentSectionIsMandatory: true,
  lastSectionIndex: 1,
  isWelcomePage: true,
  isFirstSection: false,
  isLastSection: false,
};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers,
});

export const sectionReducer = sectionSlice.reducer;

export const {
  setLastSection,
  setNextSection,
  setPreviousSection,
  setSections,
  resetSectionState,
} = sectionSlice.actions;
