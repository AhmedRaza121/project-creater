import {
  deleteProject,
  distributeProject,
  getRecordForm,
  getStartedRecordForm,
  saveProject,
  updateRecordForm,
} from './form.thunk';
import { TRecordFormState } from './typings/types';
import { TExtraReducers } from '../../../typings/type/TExtraReducers';

export const extraReducers: TExtraReducers<TRecordFormState> = (builder) => {
  builder
    .addCase(getRecordForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(getRecordForm.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      ...action.payload,
    }))
    .addCase(getRecordForm.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as string,
    }))
    .addCase(updateRecordForm.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(updateRecordForm.rejected, (state, action) => {
      state.error = action.payload as string;
    })
    .addCase(getStartedRecordForm.pending, (state) => {
      state.formLoading = true;
    })
    .addCase(getStartedRecordForm.fulfilled, (state, action) => ({
      ...state,
      formLoading: false,
      ...action.payload,
    }))
    .addCase(saveProject.pending, (state) => {
      state.formLoading = true;
    })
    .addCase(saveProject.fulfilled, (state) => {
      state.formLoading = false;
    })
    .addCase(deleteProject.fulfilled, (state) => state)
    .addCase(distributeProject.fulfilled, (state) => state);
};
