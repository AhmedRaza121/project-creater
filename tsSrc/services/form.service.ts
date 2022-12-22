import { IgForm } from '@storeworkflows/form-logic-generator/lib/interface/IForm';
import { AnyAction, AsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import isEqual from 'react-fast-compare';

import {
  TFormAction,
  TFormData,
  TFormField,
  TFormSection,
} from '../store/models/form/typings/types';
import { IRecordForm } from '../store/models/form/typings/interface';
import { TFormModelGenerator, TObjectUtil } from './typings/types';
import { TFormActionUpdater } from '../typings/type/TFormUpdater';
import { IFormService } from '../typings/interfaces/IFormService';
import { TFormVariables } from '../typings/type/TFormVariables';
import { TID } from '../store/models/creator/typings/types';
import { TRecordForm } from '../typings/type/TRecordForm';
import { TExtendedGform, TRecordFormField } from './field/typings/types';
import { IFieldBuilder } from './field/typings/interfaces';

declare global {
  interface Window {
    g_form: IgForm & TExtendedGform;
    swfProjectForm: {
      show: (args: { table: string; sysId: string }) => void;
    };
  }
}

export class FormService implements IFormService {
  constructor(
    private readonly formModelGenerator: TFormModelGenerator,
    private readonly objectUtil: TObjectUtil,
    private readonly fieldBuilder: IFieldBuilder
  ) {}

  async getForm(
    variables: TFormVariables,
    id: TID,
    updater: TFormActionUpdater
  ): Promise<TRecordForm> {
    const formModel: IRecordForm = await this.formModelGenerator(variables, id, updater);

    this.setGForm(formModel.gForm);

    return this.extractFormData(formModel.formData);
  }

  private setGForm(gForm: IgForm): void {
    window.g_form = gForm as IgForm & TExtendedGform;
  }

  extractFormData(formData: TFormData): TRecordForm {
    return {
      isNewRecord: this.objectUtil.getValue<TFormData, boolean>(
        formData,
        'layout.isNewRecord',
        true
      ),
      isValidRecord: this.objectUtil.getValue<TFormData, boolean>(
        formData,
        'layout.isValidRecord',
        false
      ),
      fields: this.getFields(formData),
      uiActions: this.objectUtil.getValue<TFormData, TFormAction[]>(
        formData,
        'uiActions.formActions',
        []
      ),
      sections: this.objectUtil.getValue<TFormData, TFormSection[]>(
        formData,
        'layout.sections',
        []
      ),
    };
  }

  private getFields(formData: TFormData): TRecordFormField[] {
    const fields = this.objectUtil.getValue<TFormData, Record<string, TFormField>>(
      formData,
      'layout.formFields',
      {}
    );

    return Object.keys(fields).map((field) =>
      this.fieldBuilder.setField(fields[field]).getFieldProps()
    );
  }

  static updateHandler<P, R>(
    dispatch: ThunkDispatch<null, null, AnyAction>,
    action: AsyncThunk<P, R, Record<string, unknown>>
  ): TFormActionUpdater {
    let previousModel = {};

    return (model: any) => {
      if (isEqual(previousModel, model)) return;

      previousModel = model;

      console.log({ dispatch, action, model });

      dispatch(action(model));
    };
  }
}
