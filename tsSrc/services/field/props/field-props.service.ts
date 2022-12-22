import { TFormField } from '../../../store/models/form/typings/types';
import { FieldTypeProps, TMethodType } from '../typings/types';
import { defaultTypeHandler, typeProps } from './type.props';

export class FieldPropsService {
  constructor() {
    this.getPropsForType = this.getPropsForType.bind(this);
  }

  getPropsForType(type: TMethodType, field: TFormField): FieldTypeProps {
    const typePropsHandler = typeProps.get(type) ?? typeProps.get('default') ?? defaultTypeHandler;

    return typePropsHandler(field);
  }
}
