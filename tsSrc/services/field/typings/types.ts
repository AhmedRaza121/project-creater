import { ChangeEvent } from 'react';
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

export type TExtendedGform = {
  getDisplayValue(field: string): string;
  isReadOnly(field: string): boolean;
  isVisible(field: string): boolean;
  getLabel(field: string): string;
  fetchRecord: () => Promise<void>;
  saveRecord: () => Promise<void>;
};

type TFormMessage = {
  content: string;
  status: string;
};

export type TDefaultProps = {
  name: string;
  label: string;
  type: string;
  displayValue: string;
  value: string;
  mandatory: boolean;
  readonly: boolean;
  required: boolean;
  visible: boolean;
  manageInvalid: boolean;
  message: TFormMessage[];
  invalid: boolean;
  onValueChange: (value: string, displayValue: string) => void;
};

export type TFileAttachmentProps = {
  extensions: string[];
  contentType: string[];
  tableSysId: string;
  tableName: string;
  attachmentSysId: string;
  onValueChange: (name: string, value: string, displayValue: string) => void;
};

export type TConditionProps = {
  table: string;
  query: string;
  onSendQuery: (query: string) => void;
  filtersListQuery: string;
};

export type TDateProps = {
  manageValue: boolean;
  onValueChange: ({ newValue }: { newValue: string }) => void;
};

export type TReferenceProps = {
  declarativeUiActions: [];
  table: string;
  tableRecordSysId: string;
  reference: string;
  onValueChange: (field: string, value: string, displayValue: string) => void;
};

export type THtmlProps = {
  content: string;
  height: string;
};

export type TStringProps = {
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type TTextAreaProps = {
  onChange: (value: string, displayValue: string) => void;
};

export type TRecordFormField = TDefaultProps &
  (
    | TFileAttachmentProps
    | TConditionProps
    | TDateProps
    | TReferenceProps
    | THtmlProps
    | TStringProps
    | TTextAreaProps
  );

export type TMethodType =
  | typeof FILE_ATTACHMENT
  | typeof CONDITIONS
  | typeof DATE
  | typeof DATE_TIME
  | typeof REFERENCE
  | typeof FIELD_LOOKUP
  | typeof LIST
  | typeof HTML
  | typeof STRING
  | typeof TEXTAREA
  | 'default';

export type FieldTypeProps =
  | TFileAttachmentProps
  | TConditionProps
  | TDateProps
  | TReferenceProps
  | THtmlProps
  | TStringProps
  | TTextAreaProps
  | Record<string, unknown>;

export type TPropsCreator = (field: TFormField) => FieldTypeProps;

export type TFindFieldPredicate = (field: TRecordFormField) => boolean;
