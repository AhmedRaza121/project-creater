import {AnyAction, AsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import {IRecordForm} from '../../store/models/form/typings/interface';
import {TRecordForm} from './TRecordForm';

export type TFormUpdater = (dispatch: ThunkDispatch<null, null, AnyAction>, action: AsyncThunk<TRecordForm, IRecordForm, any>) => (recordForm: IRecordForm) => void
export type TFormActionUpdater =  (model: any) => void
