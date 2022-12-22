import {IgForm, IgUser} from '@storeworkflows/form-logic-generator/lib/interface/IForm';
import {TFormModelGenerator} from '../../../services/typings/types';
import {IRecordForm} from '../../../store/models/form/typings/interface';

export const formModelGeneratorMock = (model?: IRecordForm): TFormModelGenerator => () => {
	return Promise.resolve(model ?? {
		gForm: {} as IgForm,
		gUser: {} as IgUser,
		formData: {}
	});
};
