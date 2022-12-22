import {TFormFieldValue} from '../../../store/models/form/typings/types';
import {TRecordFormField} from './types';

export interface IFieldBuilder {
	setField(field: TFormFieldValue): this;

	getFieldProps(): TRecordFormField;
}
