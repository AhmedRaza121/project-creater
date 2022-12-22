import { TypePropsBuilder } from './type-props.builder';
import {
  CONDITIONS,
  DATE,
  DATE_TIME,
  FIELD_LOOKUP,
  FILE_ATTACHMENT,
  HTML,
  LIST,
  REFERENCE,
  STRING,
  TEXTAREA,
} from '../../../constants/FieldType';
import { TFormField } from '../../../store/models/form/typings/types';
import {
  TConditionProps,
  TDateProps,
  TFileAttachmentProps,
  THtmlProps,
  TReferenceProps,
  TStringProps,
  TTextAreaProps,
} from '../typings/types';
import { ChangeEvent } from 'react';

export const defaultTypeHandler = (): Record<string, unknown> => Object.create(null);

export const typeProps = new TypePropsBuilder()
  .addProps(FILE_ATTACHMENT, (field: TFormField): TFileAttachmentProps => {
    return {
      extensions: ['xlsx', 'xls'],
      contentType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      tableSysId: field.referringRecordId,
      tableName: field.referringTable,
      attachmentSysId: window.g_form.getValue(field.name),
      onValueChange: (name, value, displayValue) => {
        window.g_form.setValue(name, value, displayValue);
      },
    };
  })
  .addProps(CONDITIONS, (field: TFormField): TConditionProps => {
    return {
      table: window.g_form.getValue(field.dependentField),
      query: window.g_form.getValue(field.name),
      onSendQuery: async (query: string) => {
        window.g_form.setValue(field.name, query, query);
        await window.g_form.saveRecord();
        await window.g_form.fetchRecord();
      },
      filtersListQuery: 'group=73eaa14c1bef4c1c47ebff3ecc4bcb67',
    };
  })
  .addProps(DATE, (field: TFormField): TDateProps => {
    return {
      manageValue: true,
      onValueChange: ({ newValue }: { newValue: string }) => {
        window.g_form.setValue(field?.name, newValue, newValue);
      },
    };
  })
  .addProps(
    DATE_TIME,
    (field: TFormField): TDateProps => ({
      manageValue: true,
      onValueChange: ({ newValue }: { newValue: string }) => {
        window.g_form.setValue(field?.name, newValue, newValue);
      },
    })
  )
  .addProps(REFERENCE, (field: TFormField): TReferenceProps => {
    return {
      declarativeUiActions: [],
      table: field.referringTable,
      tableRecordSysId: field.referringRecordId,
      reference: field.reference,
      onValueChange: (field, value, displayValue) => {
        window.g_form.setValue(field, value, displayValue);
      },
    };
  })
  .addProps(
    FIELD_LOOKUP,
    (field: TFormField): TReferenceProps => ({
      declarativeUiActions: [],
      table: field.referringTable,
      tableRecordSysId: field.referringRecordId,
      reference: field.reference,
      onValueChange: (field, value, displayValue) => {
        window.g_form.setValue(field, value, displayValue);
      },
    })
  )
  .addProps(LIST, (field: TFormField): TReferenceProps => {
    return {
      declarativeUiActions: [],
      table: field.referringTable,
      tableRecordSysId: field.referringRecordId,
      reference: field.reference,
      onValueChange: (field, value, displayValue) => {
        window.g_form.setValue(field, value, displayValue);
      },
    };
  })
  .addProps(HTML, (field: TFormField): THtmlProps => {
    const editorHeight =
      document
        .querySelector<HTMLElement>('x-aaro2-portal')
        ?.shadowRoot?.querySelector<HTMLElement>('div.modal-body')?.offsetHeight ?? 400;
    return {
      content: window.g_form.getValue(field.name),
      height: 0.5 * editorHeight + 'px',
    };
  })
  .addProps(STRING, (field: TFormField): TStringProps => {
    return {
      onInput: (e: ChangeEvent<HTMLInputElement>) => {
        const {
          target: { value },
        } = e;

        window.g_form.setValue(field.name, value, value);
      },
    };
  })
  .addProps(TEXTAREA, (field: TFormField): TTextAreaProps => {
    return {
      onChange: (value: string, displayValue: string) => {
        window.g_form.setValue(field.name, value, displayValue);
      },
    };
  })
  .addDefaultProps(defaultTypeHandler)
  .getTypesProp();
