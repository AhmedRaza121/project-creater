import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TRecordFormField } from '../../../services/field/typings/types';
import { getStartedRecordForm, saveProject } from './form.thunk';
import { IStore } from '../../typing/interfaces';
import { TFormSection } from './typings/types';
import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../typings/type/TSectionLayout';
import { layoutService } from '../../../di';

type GetState<ThunkApiConfig> = ThunkApiConfig extends {
  state: infer State;
}
  ? State
  : unknown;
type GetExtra<ThunkApiConfig> = ThunkApiConfig extends { extra: infer Extra } ? Extra : unknown;

export const extendGForm = (
  dispatch: ThunkDispatch<GetState<{ state: IStore }>, GetExtra<{ state: IStore }>, AnyAction>
) => {
  window.g_form = {
    ...window.g_form,
    fetchRecord: async () => {
      await dispatch(getStartedRecordForm());
    },
    saveRecord: async () => {
      await dispatch(saveProject());
    },
  };
};

export const createLayoutFromSections = (sections: TFormSection[], fields: TRecordFormField[]) =>
  sections.map<TFieldComposition<TFullLayout | TColumnLayout>[]>(({ rows }) => {
    return layoutService.getSectionLayout(rows, fields) as TFieldComposition<
      TFullLayout | TColumnLayout
    >[];
  });
