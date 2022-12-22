import { SectionService } from '../../services/section/section.service';
import { FieldServiceMock } from '../__mock__/field/field.service.mock';
import { TFormSection } from '../../store/models/form/typings/types';
import { LayoutService } from '../../services/layout.service';

describe('SectionService', () => {
  const rightSections: TFormSection[] = [
    {
      id: 0,
      caption: 'Test',
      captionDisplay: 'Test Disp',
      label: 'Test',
      defaultSection: false,
      expanded: false,
      rows: [],
      sysId: 'dasd2',
    },
  ];

  describe('#formatSections', () => {
    test('When provided valid sections, expect right formatted structure', () => {
      const layoutService = new LayoutService(new FieldServiceMock());
      const sectionService = new SectionService(new Map(), layoutService, 0);

      const sections = sectionService.formatSections(rightSections, 0);

      expect(sections).toStrictEqual([
        {
          id: 0,
          index: 0,
          value: rightSections[0].caption,
          label: rightSections[0].captionDisplay,
          current: true,
          continue: false,
          progress: 'partial',
          renderer: null,
          disabled: false,
        },
      ]);
    });
  });
});
