import { createAsyncThunk } from '@reduxjs/toolkit';

import { FieldService } from '../../../services/field/field.service';
import { TCheckedType, TGetProjectTypePayload } from './typings/types';
import { IStore } from '../../typing/interfaces';
import { TypeActions } from './typings/enums';
import { typeService } from '../../../di';

export const getProjectTypes = createAsyncThunk<
  TGetProjectTypePayload,
  undefined,
  { state: IStore }
>(TypeActions.GET_TYPES, async (_, { getState }) => {
  const {
    creator: { fields },
    form: { layouts },
  } = getState();

  const typeField = FieldService.findFieldInLayout('type', layouts[1]);

  const defaultType = fields.find(({ field }) => field === 'type');

  const types = await typeService.getTypes();

  const selectedType = typeField?.value ?? defaultType?.value ?? window.g_form.getValue('type');

  return {
    selectedType,
    types,
    typeField,
  };
});

export const setActiveType = createAsyncThunk<TCheckedType, TCheckedType, { state: IStore }>(
  TypeActions.SET_ACTIVE_TYPE,
  async ({ sysId, label }, { getState }) => {
    const {
      type: { typeField },
    } = getState();

    typeField?.onValueChange('type', sysId, label);

    return {
      sysId,
      label,
    };
  }
);
