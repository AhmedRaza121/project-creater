import { TDefaultProps, TMethodType, TRecordFormField } from './typings/types';
import { TFormField } from '../../store/models/form/typings/types';
import { IFieldBuilder } from './typings/interfaces';
import { fieldTypeProps } from '../../di';

export class FieldBuilder implements IFieldBuilder {
  private static isMandatoryField(name: string) {
    return window.g_form.isMandatory(name) ? window.g_form.getValue(name) === '' : false;
  }

  private field: TFormField | undefined;

  setField(field: TFormField): this {
    this.field = field;
    return this;
  }

  getFieldProps(): TRecordFormField {
    if (!this.field) throw Error('Not provided gForm or Field');

    return {
      ...this.getDefaultProps(),
      ...fieldTypeProps.getPropsForType(this.field.type as TMethodType, this.field),
    } as unknown as TRecordFormField;
  }

  private getDefaultProps(): TDefaultProps {
    if (!this.field) throw Error('Not provided gForm or Field');

    const { name, label, type, messages = [] } = this.field;

    return {
      name,
      label,
      type,
      displayValue: window.g_form.getDisplayValue(name),
      value: window.g_form.getValue(name),
      mandatory: FieldBuilder.isMandatoryField(name),
      readonly: window.g_form.isReadOnly(name),
      required: window.g_form.isMandatory(name),
      visible: window.g_form.isVisible(name),
      manageInvalid: true,
      message:
        messages.map(({ message, type }) => ({
          content: message,
          status: type === 'error' ? 'red' : 'blue',
        })) ?? [],
      invalid: messages?.length > 0 ?? false,
      onValueChange: this.onValueChange(name),
    };
  }

  private onValueChange(fieldName: string) {
    return (value: string, displayValue: string) => {
      window.g_form.setValue(fieldName, value, displayValue);
    };
  }
}

export default new FieldBuilder();
