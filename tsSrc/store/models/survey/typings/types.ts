import { QuestionTypes } from '../../../../typings/enums/QuestionTypes';
import { TQuestion } from '../../../../typings/type/TQuestion';

export type TQuestionType = {
  icon: string;
  label: string;
  type: QuestionTypes;
};

export type TQuestionList = TQuestion[];

export type TSurveyStore = {
  questionTypes: TQuestionType[];
  typesIsOpened: boolean;
  questions: TQuestionList;
  loading: boolean;
};
