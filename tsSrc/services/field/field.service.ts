import { TColumnLayout, TFieldComposition, TFullLayout } from '../../typings/type/TSectionLayout';
import { IFieldService } from '../../typings/interfaces/IFieldService';
import { TFindFieldPredicate, TRecordFormField } from './typings/types';

export class FieldService implements IFieldService {
  static getSectionFields(
    sectionLayout: TFieldComposition<TFullLayout | TColumnLayout>[]
  ): TRecordFormField[] {
    return sectionLayout.reduce<TRecordFormField[]>((acc, fieldComposition) => {
      const fieldsForFullLayout = 'fields' in fieldComposition ? [...fieldComposition?.fields] : [];
      const fieldsForColumnsLayout =
        'left' in fieldComposition ? [...fieldComposition?.left, ...fieldComposition?.right] : [];

      return [...acc, ...fieldsForFullLayout, ...fieldsForColumnsLayout];
    }, []);
  }

  static hasMandatoryFields(
    sectionLayout: TFieldComposition<TFullLayout | TColumnLayout>[]
  ): boolean {
    const sectionFields = FieldService.getSectionFields(sectionLayout);

    return sectionFields.reduce<boolean>((isMandatory, field: TRecordFormField) => {
      if (isMandatory) return isMandatory;

      return field.mandatory;
    }, false);
  }

  static findFieldInLayout(
    fieldName: string,
    sectionLayout: TFieldComposition<TFullLayout | TColumnLayout>[],
    predicate: TFindFieldPredicate = (field) => field.name === fieldName
  ): TRecordFormField | null {
    const sectionFields = FieldService.getSectionFields(sectionLayout);

    return sectionFields.find(predicate) ?? null;
  }

  getFieldByName(fields: TRecordFormField[], fieldName: string): TRecordFormField | undefined {
    return fields.find((field) => field.name === fieldName);
  }

  getFieldsByNames(fields: TRecordFormField[]) {
    return (acc: TRecordFormField[], fieldName: string) => {
      const field = this.getFieldByName(fields, fieldName);

      if (!field) return acc;

      acc.push(field);

      return acc;
    };
  }
}
