import { ISectionService } from '../../typings/interfaces/ISectionService';
import { TFormattedSection } from '../../typings/type/TFormattedSection';
import { ILayoutService } from '../../typings/interfaces/ILayoutService';
import { TFormSection } from '../../store/models/form/typings/types';
import { TSectionRenders } from '../typings/types';

export class SectionService implements ISectionService {
  private static sectionProgressStyle(currentIndex: number, index: number) {
    if (index === currentIndex) return 'partial';
    if (index < currentIndex) return 'done';
    return 'none';
  }

  constructor(
    private readonly sectionRenders: TSectionRenders,
    private readonly layoutService: ILayoutService,
    private currentSection: number
  ) {}

  formatSections(sections: TFormSection[], currentSection: number): TFormattedSection[] {
    this.currentSection = currentSection;

    return sections.map(this.sectionFormatHandler().bind(this));
  }

  changeProgress(sections: TFormattedSection[], currentSection: number): TFormattedSection[] {
    return sections.map((section, index) => {
      return {
        ...section,
        current: currentSection === index,
        progress: SectionService.sectionProgressStyle(currentSection, index),
      };
    });
  }

  getNextNumber(sections: TFormattedSection[], currentSectionNumber: number): number {
    return sections.findIndex(
      (section, index) => index > currentSectionNumber && !section.disabled
    );
  }

  getPreviousNumber(sections: TFormattedSection[], currentSectionNumber: number): number {
    for (let index = currentSectionNumber - 1; index > 0; index--) {
      const prevSection = sections[index];
      if (!prevSection.disabled) return prevSection.index;
    }
    return 1;
  }

  private sectionFormatHandler() {
    return (section: TFormSection, index: number): TFormattedSection => {
      try {
        return {
          id: index,
          index: index,
          value: section.caption,
          label: section.captionDisplay,
          current: this.currentSection === index,
          continue: false,
          progress: SectionService.sectionProgressStyle(this.currentSection, index),
          renderer:
            this.sectionRenders.get(section.caption) ?? this.sectionRenders.get('default') ?? null,
          disabled: 'visible' in section ? !section.visible : false,
        };
      } catch (e) {
        throw Error('Wrong structure of section');
      }
    };
  }
}
