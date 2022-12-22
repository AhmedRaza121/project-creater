import {IForm} from '@storeworkflows/form-logic-generator/lib/interface/IForm';
import {TFormData} from './types';

export interface IRecordForm extends IForm {
	formData: TFormData
 }
