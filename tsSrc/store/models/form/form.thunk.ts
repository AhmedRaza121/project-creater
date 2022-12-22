import { AnyAction, AsyncThunk, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { cloneDeep, debounce } from 'lodash';
import isEqual from 'react-fast-compare';

import { TFormActionUpdater } from '../../../typings/type/TFormUpdater';
import { TForm } from '../../../typings/type/TRecordForm';
import { setLastSection, setSections } from '../section/section.slice';
import { setSysId } from '../creator/creator.slice';
import { IStore } from '../../typing/interfaces';
import { FormActions } from './typings/enums';
import { TFormData } from './typings/types';
import { actionService, formService, layoutService } from '../../../di';
import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../typings/type/TSectionLayout';
import { closeModal } from '../close/close.thunk';
import { createLayoutFromSections, extendGForm } from './form.utils';

export const updateRecordForm = createAsyncThunk<TForm, TFormData, { state: IStore }>(
  FormActions.UPDATE_RECORD_FORM,
  (model, { dispatch }) => {
    const { sections, isNewRecord, isValidRecord, fields, uiActions } =
      formService.extractFormData(model);

    dispatch(setSections(sections));

    const layouts = sections.map<TFieldComposition<TFullLayout | TColumnLayout>[]>(({ rows }) => {
      return layoutService.getSectionLayout(rows, fields) as TFieldComposition<
        TFullLayout | TColumnLayout
      >[];
    });

    window.g_form = {
      ...window.g_form,
      fetchRecord: async () => {
        await dispatch(getStartedRecordForm());
      },
      saveRecord: async () => {
        await dispatch(saveProject());
      },
    };

    return {
      isNewRecord,
      isValidRecord,
      uiActions,
      layouts,
    };
  }
);

function updateHandler<P, R>(
  dispatch: ThunkDispatch<IStore, unknown, AnyAction>,
  action: AsyncThunk<P, R, Record<string, unknown>>
): TFormActionUpdater {
  let previousModel = {};

  return debounce((model: any) => {
    if (isEqual(previousModel, model) || !window.g_form) return;

    previousModel = cloneDeep(model);

    dispatch(action(model));
  }, 100);
}

export const distributeProject = createAsyncThunk<void, undefined, { state: IStore }>(
  FormActions.DISTRIBUTE_PROJECT,
  async (_, { dispatch }) => {
    window.g_form.setValue('state', '2');
    await dispatch(saveProject());

    window.swfProjectForm.show({
      table: window.g_form.getTableName(),
      sysId: window.g_form.getUniqueValue(),
    });

    dispatch(closeModal());
  }
);

export const startProject = createAsyncThunk<void, undefined, { state: IStore }>(
  FormActions.START_PROJECT,
  async (_, { getState, dispatch }) => {
    const {
      form: { uiActions },
    } = getState();

    const saveAction = uiActions.find((action) => action.name === 'sysverb_ws_save');

    await actionService.runInUiAction(saveAction, '-1');

    dispatch(setSysId(window.g_form.getUniqueValue()));
  }
);

export const saveProject = createAsyncThunk<void, undefined, { state: IStore }>(
  FormActions.SAVE_PROJECT,
  async (_, { getState }) => {
    const {
      form: { uiActions },
    } = getState();

    const saveAction = uiActions.find((action) => action.name === 'sysverb_ws_save');

    await actionService.runInUiAction(saveAction);
  }
);

export const deleteProject = createAsyncThunk<void, undefined, { state: IStore }>(
  FormActions.DELETE_PROJECT,
  async (_, { getState }) => {
    const {
      form: { uiActions },
    } = getState();

    const deleteAction = uiActions.find((actions) => actions.name === 'sysverb_ws_delete');

    if (!deleteAction) return;

    await actionService.runInUiAction(deleteAction);
  }
);

export const getStartedRecordForm = createAsyncThunk<TForm, undefined, { state: IStore }>(
  FormActions.GET_STARTED_FORM,
  async (_, { getState, dispatch }) => {
    const {
      creator: { id, table, sysId, views, query, workspaceConfigId },
    } = getState();

    const variables = {
      table,
      sysId,
      views,
      query,
      workspaceConfigId,
    };

    const { sections, isNewRecord, isValidRecord, uiActions, fields } = await formService.getForm(
      variables,
      id,
      updateHandler<TForm, TFormData>(dispatch, updateRecordForm)
    );

    dispatch(setSections(sections));

    extendGForm(dispatch);

    const layouts = createLayoutFromSections(sections, fields);

    return {
      isNewRecord,
      isValidRecord,
      uiActions,
      layouts,
    };
  }
);

export const getRecordForm = createAsyncThunk<TForm, undefined, { state: IStore }>(
  FormActions.GET_RECORD_FORM,
  async (_, { getState, dispatch }) => {
    const {
      creator: { id, table, sysId, views, query, workspaceConfigId, fields: defaultValues },
    } = getState();
    const variables = {
      table,
      sysId,
      views,
      query,
      workspaceConfigId,
    };

    const { sections, isNewRecord, isValidRecord, uiActions, fields } = await formService.getForm(
      variables,
      id,
      updateHandler<TForm, TFormData>(dispatch, updateRecordForm)
    );

    dispatch(setLastSection(sections.length - 1));
    dispatch(setSections(sections));

    extendGForm(dispatch);

    const layouts = createLayoutFromSections(sections, fields);
      console.log("Get record form called");
    defaultValues.forEach(({ field, value }) => {
      if(window.g_form.getValue(field) == "") {
        window.g_form.setValue(field, value);
      }
    });

    return {
      isNewRecord,
      isValidRecord,
      uiActions,
      layouts,
    };
  }
);
