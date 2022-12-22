import { createAsyncThunk } from '@reduxjs/toolkit';
import { SurveyActions } from './typings/enums';
import { QuestionTypes } from '../../../typings/enums/QuestionTypes';
import { TQuestion } from '../../../typings/type/TQuestion';
import { surveyService } from '../../../di';
import { IStore } from '../../typing/interfaces';

export const createNewQuestion = createAsyncThunk<TQuestion, QuestionTypes, { state: IStore }>(
  SurveyActions.CREATE_NEW_QUESTION,
  async (type) => {
    return await surveyService.newQuestion(type, window.g_form.getUniqueValue());
  }
);

export const copyQuestion = createAsyncThunk<TQuestion | null, string, { state: IStore }>(
  SurveyActions.COPY_QUESTION,
  async (copiedSysId, { getState }) => {
    const {
      survey: { questions },
    } = getState();

    const question = questions.find((q) => {
      return q.sys_id === copiedSysId;
    });

    if (!question) return null;

    return await surveyService.copyQuestion(question);
  }
);

export const saveQuestion = createAsyncThunk<
  TQuestion | null,
  { sys_id: string },
  { state: IStore }
>(SurveyActions.SAVE_QUESTION, async ({ sys_id }, { getState }) => {
  const {
    survey: { questions },
  } = getState();

  const question = questions.find((q) => {
    return q.sys_id === sys_id;
  });

  if (!question) return null;

  return await surveyService.updateQuestion(question);
});

export const removeQuestion = createAsyncThunk<TQuestion[], string, { state: IStore }>(
  SurveyActions.REMOVE_QUESTION,
  async (sysId, { getState }) => {
    const {
      survey: { questions },
    } = getState();

    await surveyService.removeQuestion(sysId);

    const reorderedQuestions = surveyService.reorderQuestions(
      [...questions].filter((q) => q.sys_id !== sysId)
    );

    surveyService.updateQuestions(reorderedQuestions);

    return reorderedQuestions;
  }
);

export const reorderQuestions = createAsyncThunk<
  TQuestion[],
  { from: number; to: number },
  { state: IStore }
>(SurveyActions.REORDER_QUESTION, ({ from, to }, { getState }) => {
  const {
    survey: { questions },
  } = getState();

  const copiedQuestions = [...questions];

  const [removed] = copiedQuestions.splice(from, 1);
  copiedQuestions.splice(to, 0, removed);

  const reorderedQuestions = copiedQuestions.map<TQuestion>((question, index) => ({
    ...question,
    index: ++index,
  }));

  surveyService.updateQuestions(reorderedQuestions);

  return reorderedQuestions;
});
