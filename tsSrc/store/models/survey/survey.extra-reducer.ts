import { TExtraReducers } from '../../../typings/type/TExtraReducers';
import {
  copyQuestion,
  createNewQuestion,
  removeQuestion,
  reorderQuestions,
  saveQuestion,
} from './survey.thunk';
import { TSurveyStore } from './typings/types';

export const extraReducers: TExtraReducers<TSurveyStore> = (builder) => {
  builder
    .addCase(createNewQuestion.pending, (state) => {
      state.loading = true;
    })
    .addCase(createNewQuestion.fulfilled, (state, action) => {
      const question = action.payload;

      state.loading = false;
      state.questions = [...state.questions, question];
    })
    .addCase(createNewQuestion.rejected, (state) => {
      state.loading = false;
    })
    .addCase(removeQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;
    })
    .addCase(copyQuestion.pending, (state) => {
      state.loading = true;
    })
    .addCase(copyQuestion.fulfilled, (state, action) => {
      if (!action.payload) return state;

      const question = action.payload;

      state.loading = false;
      state.questions = [...state.questions, question];
    })
    .addCase(saveQuestion.fulfilled, (state, action) => {
      if (!action.payload) return state;

      const question = action.payload;

      state.questions = state.questions.map((_) => {
        if (_.sys_id === question.sys_id) return question;
        return _;
      });
    })
    .addCase(reorderQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
};
