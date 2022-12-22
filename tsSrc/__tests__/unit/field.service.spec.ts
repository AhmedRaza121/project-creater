import { FieldService } from '../../services/field/field.service';
import { TRecordFormField } from '../../services/field/typings/types';

describe('FieldService', () => {
  const formFields: TRecordFormField[] = [
    {
      name: 'test',
      label: 'Test',
      type: 'text',
      value: '',
      displayValue: '',
      content: '',
      mandatory: true,
      readonly: false,
      required: true,
      visible: true,
      manageInvalid: true,
      onValueChange: () => undefined,
      message: [],
      invalid: false,
    } as unknown as TRecordFormField,
  ];

  const fieldName = 'test';

  describe('#getFieldByName', () => {
    describe('When provided section rows', () => {
      test('has full layout, expect field composition align full will fill', () => {
        const fieldService = new FieldService();

        const fieldComposition = fieldService.getFieldByName(formFields, fieldName);

        expect(fieldComposition).toStrictEqual(formFields[0]);
      });
    });
  });

  describe('#getFieldsByNames', () => {
    describe('When provided fields and field names, expect searchable fields', () => {
      test('has column layout, expect field composition align left and right will fill', () => {
        const fieldService = new FieldService();

        const fieldComposition = fieldService.getFieldsByNames(formFields)([], fieldName);

        expect(fieldComposition).toStrictEqual(formFields);
      });
    });
  });
});
