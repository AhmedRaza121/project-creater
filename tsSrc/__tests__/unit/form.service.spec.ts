import { formModelGeneratorMock } from '../__mock__/form/formModelGenerator.mock';
import { expectedFormData, formModelMock } from '../__mock__/form/formModel.mock';
import { FieldBuilderMock } from '../__mock__/field/field.builder.mock';
import { ObjectUtilsMock } from '../__mock__/utils/objectUtils.mock';
import { TFormActionUpdater } from '../../typings/type/TFormUpdater';
import { TFormVariables } from '../../typings/type/TFormVariables';
import { TFormData } from '../../store/models/form/typings/types';
import { FormService } from '../../services/form.service';

describe('FormService', () => {
  const defaultFormData = {
    isNewRecord: true,
    isValidRecord: false,
    fields: [],
    uiActions: [],
    sections: [],
  };

  describe('#getForm', () => {
    test('When empty model provided, expect default record form', async () => {
      const formService = new FormService(
        formModelGeneratorMock(),
        ObjectUtilsMock,
        new FieldBuilderMock()
      );
      const variables: TFormVariables = {
        table: '',
        query: '',
        sysId: '',
        views: '',
        workspaceConfigId: '',
      };
      const id = { id: null };
      const updater: TFormActionUpdater = () => undefined;

      const formData = await formService.getForm(variables, id, updater);

      expect(formData).toStrictEqual(defaultFormData);
    });

    test('When model provided, expect record form', async () => {
      const formService = new FormService(
        formModelGeneratorMock(formModelMock),
        ObjectUtilsMock,
        new FieldBuilderMock()
      );
      const variables: TFormVariables = {
        table: '',
        query: '',
        sysId: '',
        views: '',
        workspaceConfigId: '',
      };
      const id = { id: null };
      const updater: TFormActionUpdater = () => undefined;

      const formData = await formService.getForm(variables, id, updater);

      expect(formData).toStrictEqual(expectedFormData);
    });
  });

  describe('#extractFormData', () => {
    test('When empty model provided, expect default record form', () => {
      const formService = new FormService(
        formModelGeneratorMock(),
        ObjectUtilsMock,
        new FieldBuilderMock()
      );

      const formData = formService.extractFormData({} as TFormData);

      expect(formData).toStrictEqual(defaultFormData);
    });

    test('When model provided, expect record form', () => {
      const formService = new FormService(
        formModelGeneratorMock(),
        ObjectUtilsMock,
        new FieldBuilderMock()
      );

      const formData = formService.extractFormData(formModelMock.formData);

      expect(formData).toStrictEqual(expectedFormData);
    });
  });
});
