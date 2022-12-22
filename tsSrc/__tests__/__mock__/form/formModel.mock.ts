import {TRecordForm} from '../../../typings/type/TRecordForm';
import {IRecordForm} from '../../../store/models/form/typings/interface';
import {IgForm, IgUser} from '@storeworkflows/form-logic-generator/lib/interface/IForm';
import {TFormData} from '../../../store/models/form/typings/types';

export const formModelMock: IRecordForm = {
	formData: {
		layout: {
			isValidRecord: true,
			isNewRecord: true,
			sections: [{
				id: 1,
				sysId: '',
				caption: 'Test',
				captionDisplay: 'Test Dipslay',
				label: 'Test label',
				defaultSection: true,
				expanded: false,
				rows: []
			}]
		},
	} as unknown as TFormData,
	gForm: {} as IgForm,
	gUser: {} as IgUser
};

export const expectedFormData: TRecordForm = {
	isValidRecord: true,
	isNewRecord: true,
	fields: [],
	uiActions: [],
	sections: [{
		id: 1,
		sysId: '',
		caption: 'Test',
		captionDisplay: 'Test Dipslay',
		label: 'Test label',
		defaultSection: true,
		expanded: false,
		rows: []
	}]
};
