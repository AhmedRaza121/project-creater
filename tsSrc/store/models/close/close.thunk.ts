import { createAsyncThunk } from '@reduxjs/toolkit';
import { CloseActions } from './typings/enum';
import { IStore } from '../../typing/interfaces';
import { resetTypeState } from '../type/type.slice';
import { resetCreatorState } from '../creator/creator.slice';
import { resetDistributionState } from '../distribution/distribution.slice';
import { resetFormState } from '../form/form.slice';
import { resetSurveyState } from '../survey/survey.slice';
import { resetSectionState } from '../section/section.slice';
import { deleteProject } from '../form/form.thunk';

export const closeModal = createAsyncThunk<void, undefined, { state: IStore }>(
  CloseActions.CLOSE_MODAL,
  (_, { dispatch }) => {
    dispatch(resetTypeState());
    dispatch(resetFormState());
    dispatch(resetSurveyState());
    dispatch(resetSectionState());
    dispatch(resetCreatorState());
    dispatch(resetDistributionState());
    dispatch(deleteProject());
  }
);
