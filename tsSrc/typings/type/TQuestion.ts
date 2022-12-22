import { QuestionTypes } from '../enums/QuestionTypes';

export type TChoice = {
  value: string;
};

export type TSettings = {
  max_attachments: {
    value: number;
  };
  file_extensions: {
    value: string[];
    label: string;
  };
};

export type TQuestion = {
  settings: TSettings | null;
  question: string;
  index: number;
  type: QuestionTypes;
  mandatory: boolean;
  sys_id: string;
  choices: TChoice[] | null;
  task: string;
  dirty: boolean;
};

export type TQuestionTemplate = {
  settings: string | null;
  question: string;
  index: number;
  type: QuestionTypes;
  mandatory: boolean;
  choices: string | null;
};

export type TQuestionStringifies = Omit<
  TQuestion,
  'index' | 'settings' | 'choices' | 'mandatory'
> & {
  task: {
    value: string;
    link: string;
  };
  settings: string;
  choices: string;
  mandatory: string;
  index: string;
};

export type TSurveyPayload<T> = {
  data: {
    result: T;
  };
};
