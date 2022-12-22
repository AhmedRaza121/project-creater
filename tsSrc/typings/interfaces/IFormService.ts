import {TID} from '../../store/models/creator/typings/types';
import {TFormActionUpdater} from '../type/TFormUpdater';
import {TFormVariables} from '../type/TFormVariables';
import {TRecordForm} from '../type/TRecordForm';
import {TFormData} from '../../store/models/form/typings/types';

export interface IFormService {
	getForm(variables: TFormVariables, id: TID, updater: TFormActionUpdater): Promise<TRecordForm>;

	extractFormData(formData: TFormData): TRecordForm;
}
