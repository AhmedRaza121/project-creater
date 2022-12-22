import { TFormSection } from '../../store/models/form/typings/types';
import { TFormattedSection } from '../type/TFormattedSection';

export interface ISectionService {
  formatSections(sections: TFormSection[], currentSection: number): TFormattedSection[];
  changeProgress(sections: TFormattedSection[], currentSection: number): TFormattedSection[];
  getPreviousNumber(sections: TFormattedSection[], currentSectionNumber: number): number;
  getNextNumber(sections: TFormattedSection[], currentSectionNumber: number): number;
}
