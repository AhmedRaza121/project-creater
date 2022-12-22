import {TColumnLayout, TFieldComposition, TFullLayout} from '../type/TSectionLayout';
import {TRecordFormField} from '../../services/field/typings/types';
import {TSectionRow} from '../../store/models/form/typings/types';

export interface ILayoutService {
	getSectionLayout(rows: TSectionRow[], fields: TRecordFormField[]): TFieldComposition<TFullLayout | TColumnLayout>[];

	fullFieldsComposition(fieldNames: string[], fields: TRecordFormField[]): TFieldComposition<TFullLayout>;

	columnFieldsComposition(leftFields: string[], rigthFields: string[], fields: TRecordFormField[]): TFieldComposition<TColumnLayout>;
}
