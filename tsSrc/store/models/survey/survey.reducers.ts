import { PayloadAction } from '@reduxjs/toolkit';

import { TSurveyStore } from './typings/types';
import { TQuestion } from '../../../typings/type/TQuestion';
import { SurveyActions } from './typings/enums';
import { initialState } from './survey.slice';

export const reducers = {
  [SurveyActions.QUESTION_TYPES_OPENED]: (state: TSurveyStore, action: PayloadAction<boolean>) => {
    state.typesIsOpened = action.payload;
  },
  [SurveyActions.UPDATE_QUESTION]: (
    state: TSurveyStore,
    action: PayloadAction<Partial<TQuestion> & { sys_id: string }>
  ) => {
    const { questions } = state;
    const question = action.payload;

    state.questions = questions.map((_) => {
      if (_.sys_id === question.sys_id) return { ..._, ...question, dirty: true };
      return _;
    });
  },
  [SurveyActions.RESET_STATE]: () => initialState,
};
