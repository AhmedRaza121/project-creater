import { TColumnLayout, TFieldComposition, TFullLayout } from '../typings/type/TSectionLayout';
import { ILayoutService } from '../typings/interfaces/ILayoutService';
import { IFieldService } from '../typings/interfaces/IFieldService';
import { TSectionRow } from '../store/models/form/typings/types';
import { TRecordFormField } from './field/typings/types';

export class LayoutService implements ILayoutService {
  constructor(private readonly fieldService: IFieldService) {}

  getSectionLayout(
    rows: TSectionRow[],
    fields: TRecordFormField[]
  ): TFieldComposition<TFullLayout | TColumnLayout>[] {
    const sectionLayout: TFieldComposition<TFullLayout | TColumnLayout>[] = [];

    rows.forEach(([left, right]) => {
      if (!right) return sectionLayout.push(this.fullFieldsComposition(left.fields, fields));

      sectionLayout.push(this.columnFieldsComposition(left.fields, right.fields, fields));
    });

    return sectionLayout;
  }

  fullFieldsComposition(
    fieldNames: string[],
    fields: TRecordFormField[]
  ): TFieldComposition<TFullLayout> {
    return {
      layout: 'full',
      fields: fieldNames.reduce<TRecordFormField[]>(this.fieldService.getFieldsByNames(fields), []),
    };
  }

  columnFieldsComposition(
    leftFields: string[],
    rigthFields: string[],
    fields: TRecordFormField[]
  ): TFieldComposition<TColumnLayout> {
    return {
      layout: 'column',
      left: leftFields.reduce<TRecordFormField[]>(this.fieldService.getFieldsByNames(fields), []),
      right: rigthFields.reduce<TRecordFormField[]>(this.fieldService.getFieldsByNames(fields), []),
    };
  }
}
