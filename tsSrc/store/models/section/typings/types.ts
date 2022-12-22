import { TFormattedSection } from '../../../../typings/type/TFormattedSection';

export type TSectionState = {
  currentSectionIsMandatory: boolean;
  sections: TFormattedSection[];
  currentSectionIndex: number;
  lastSectionIndex: number;
  isWelcomePage: boolean;
  isFirstSection: boolean;
  isLastSection: boolean;
};
