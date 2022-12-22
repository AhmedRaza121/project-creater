import { createSlice } from '@reduxjs/toolkit';

import { QuestionTypes } from '../../../typings/enums/QuestionTypes';
import { TSurveyStore } from './typings/types';

import { reducers } from './survey.reducers';
import { extraReducers } from './survey.extra-reducer';

export const initialState: TSurveyStore = {
  questionTypes: [
    { icon: 'dash', label: 'Single Line Text', type: QuestionTypes.SINGLE_LINE },
    { icon: 'list', label: 'Multi Line Text', type: QuestionTypes.MULTI_LINE },
    { icon: 'check-circle-fill', label: 'Single Choice', type: QuestionTypes.SINGLE_CHOICE },
    { icon: 'check-square-fill', label: 'Multi Choice', type: QuestionTypes.MULTI_CHOICE },
    { icon: 'upload', label: 'Attachment', type: QuestionTypes.ATTACHMENT },
    { icon: 'question-circle', label: 'Yes/No', type: QuestionTypes.YES_NO },
    { icon: 'square-fill', label: 'Numeric', type: QuestionTypes.NUMERIC },
    { icon: 'calendar-date-fill', label: 'Date', type: QuestionTypes.DATE },
  ],
  typesIsOpened: false,
  questions: [],
  loading: false,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers,
  extraReducers,
});

export const surveyReducer = surveySlice.reducer;

export const { setQuestionTypesOpened, updateQuestion, resetSurveyState } = surveySlice.actions;
