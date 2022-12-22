import { TFormAction, TFormSection } from '../../store/models/form/typings/types';
import { TRecordFormField } from '../../services/field/typings/types';
import { TColumnLayout, TFieldComposition, TFullLayout } from './TSectionLayout';

export type TRecordForm = {
  isNewRecord: boolean;
  uiActions: TFormAction[];
  isValidRecord: boolean;
  fields: TRecordFormField[];
  sections: TFormSection[];
};

export type TForm = {
  isNewRecord: boolean;
  uiActions: TFormAction[];
  isValidRecord: boolean;
  layouts: TFieldComposition<TFullLayout | TColumnLayout>[][];
};
