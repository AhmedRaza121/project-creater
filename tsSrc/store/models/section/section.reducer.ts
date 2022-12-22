import { Draft, PayloadAction } from '@reduxjs/toolkit';

import { SectionActions } from './typings/enums';
import { TSectionState } from './typings/types';
import { TFormSection } from '../form/typings/types';
import { sectionService } from '../../../di';
import { initialState } from './section.slice';

export const reducers = {
  [SectionActions.SET_CURRENT_SECTION]: (
    state: Draft<TSectionState>,
    action: PayloadAction<number>
  ) => {
    state.currentSectionIndex = action.payload;
  },
  [SectionActions.SET_LAST_SECTION]: (
    state: Draft<TSectionState>,
    action: PayloadAction<number>
  ) => {
    state.lastSectionIndex = action.payload;
  },
  [SectionActions.SET_NEXT_SECTION]: (state: Draft<TSectionState>) => {
    if (state.isLastSection) return state;

    const nextSection = sectionService.getNextNumber(state.sections, state.currentSectionIndex);

    return {
      ...state,
      isWelcomePage: false,
      isFirstSection: nextSection === 1,
      isLastSection: nextSection === state.lastSectionIndex,
      currentSectionIndex: nextSection,
    };
  },
  [SectionActions.SET_PREVIOUS_SECTION]: (state: Draft<TSectionState>) => {
    if (state.isFirstSection) return state;

    if (state.isLastSection) state.isLastSection = false;

    const prevSection = sectionService.getPreviousNumber(state.sections, state.currentSectionIndex);

    state.isFirstSection = prevSection === 1;

    state.currentSectionIndex = prevSection;

    state.sections = sectionService.changeProgress(state.sections, state.currentSectionIndex);
  },
  [SectionActions.SET_SECTIONS]: (
    state: Draft<TSectionState>,
    action: PayloadAction<TFormSection[]>
  ) => {
    const { currentSectionIndex } = state;

    state.sections = sectionService.formatSections(action.payload, currentSectionIndex);
  },
  [SectionActions.RESET_STATE]: () => initialState,
};
