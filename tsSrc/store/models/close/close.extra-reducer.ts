import { TExtraReducers } from '../../../typings/type/TExtraReducers';
import { TCloseState } from './typings/types';
import { closeModal } from './close.thunk';

export const extraReducers: TExtraReducers<TCloseState> = (builder) => {
  builder.addCase(closeModal.fulfilled, (state) => {
    state.show = false;
  });
};
