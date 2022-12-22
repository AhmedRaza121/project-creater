import {IgForm} from '@storeworkflows/form-logic-generator/lib/interface/IForm';

import {TExtendedGform, TRecordFormField} from '../../../services/field/typings/types';
import {TFormFieldValue} from '../../../store/models/form/typings/types';
import {IFieldBuilder} from '../../../services/field/typings/interfaces';

export class FieldBuilderMock implements IFieldBuilder {
	private gForm: IgForm & TExtendedGform | undefined;
	private field: TFormFieldValue | undefined;

	getFieldProps(): TRecordFormField {
		if (!(this.gForm && this.field)) throw Error('Not provided gForm or Field');

		const {name, mandatory, type, label, messages = []} = this.field;

		return {
			name,
			label,
			type,
			displayValue: this.gForm.getDisplayValue(name),
			value: this.gForm.getValue(name),
			content: this.gForm.getValue(name),
			mandatory: mandatory,
			readonly: this.gForm.isReadOnly(name),
			required: this.gForm.isMandatory(name),
			visible: this.gForm.isVisible(name),
			manageInvalid: true,
			message: messages.map(({message, type}) => ({
				content: message,
				status: type === 'error' ? 'red' : 'blue'
			})) ?? [],
			invalid: messages?.length > 0 ?? false,
			onValueChange: () => undefined
		} as unknown as TRecordFormField;
	}

	setField(field: TFormFieldValue): this {
		this.field = field;
		return this;
	}

	setGForm(gForm: IgForm): this {
		this.gForm = gForm as IgForm & TExtendedGform;
		return this;
	}

}
