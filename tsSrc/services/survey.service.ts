import {
  TChoice,
  TQuestion,
  TQuestionStringifies,
  TQuestionTemplate,
  TSurveyPayload,
} from '../typings/type/TQuestion';
import { QuestionTypes } from '../typings/enums/QuestionTypes';
import { SafeJsonUtil } from '../utils/safe-json.util';
import { IRequest } from '../config/request';
import { ObjectUtil } from '../utils/object.util';

export class SurveyService {
  private readonly attachmentSettings = {
    max_attachments: { value: 1 },
    file_extensions: { value: [''], label: 'any' },
  };

  static isQuestionWithChoices(type: QuestionTypes): boolean {
    return type === QuestionTypes.SINGLE_CHOICE || type === QuestionTypes.MULTI_CHOICE;
  }

  private static getChoices({
    type,
    choices,
  }: Pick<TQuestionStringifies, 'type' | 'choices'>): TChoice[] | null {
    if (!SurveyService.isQuestionWithChoices(type)) return null;

    return [...SafeJsonUtil.parse(choices, [{ value: '' }])];
  }

  private static parseQuestion({
    question,
    sys_id,
    index,
    choices,
    settings,
    task,
    type,
    mandatory,
  }: TQuestionStringifies): TQuestion {
    return {
      type,
      task: task.value,
      sys_id,
      question,
      index: Number(index),
      choices: SurveyService.getChoices({ type, choices }),
      mandatory: mandatory === 'true',
      settings: SafeJsonUtil.parse(settings, null),
      dirty: false,
    };
  }

  constructor(
    private readonly request: <T>(params: IRequest) => Promise<T>,
    private readonly table: string
  ) {}

  async getSurvey(sysId: string): Promise<TQuestion[]> {
    const {
      data: { result },
    } = await this.request<TSurveyPayload<TQuestionStringifies[]>>({
      url: `${this.table}`,
      method: 'get',
      params: {
        sysparm_query: `task=${sysId}^ORDERBYindex`,
      },
    });

    return result.map<TQuestion>((question) => SurveyService.parseQuestion(question));
  }

  async newQuestion(type: QuestionTypes, task: string): Promise<TQuestion> {
    const template = {
      type,
      task,
      index: 0,
      question: '',
      mandatory: false,
      choices: JSON.stringify(SurveyService.getChoices({ type, choices: '' })),
      settings: type === QuestionTypes.ATTACHMENT ? JSON.stringify(this.attachmentSettings) : null,
    };

    return this.createQuestionByTemplate(template);
  }

  async copyQuestion({
    question,
    choices,
    type,
    settings,
    mandatory,
    task,
  }: TQuestion): Promise<TQuestion> {
    const template = {
      task,
      type,
      question,
      mandatory,
      index: 0,
      choices: choices ? JSON.stringify(choices) : choices,
      settings: settings ? JSON.stringify(settings) : settings,
    };

    return this.createQuestionByTemplate(template);
  }

  async updateQuestion(question: TQuestion): Promise<TQuestion> {
    const {
      data: { result },
    } = await this.request<TSurveyPayload<TQuestionStringifies>>({
      url: `${this.table}/${question.sys_id}`,
      method: 'patch',
      data: ObjectUtil.stringifyValues(question),
    });

    return SurveyService.parseQuestion(result);
  }

  async updateQuestions(questions: TQuestion[]): Promise<void> {
    questions.map((question) => this.updateQuestion(question));
  }

  async removeQuestion(sysId: string): Promise<void> {
    await this.request<void>({
      url: `${this.table}/${sysId}`,
      method: 'delete',
    });
  }

  reorderQuestions(questions: TQuestion[]): TQuestion[] {
    return [...questions].map((q, i) => ({ ...q, index: ++i }));
  }

  private async createQuestionByTemplate(template: TQuestionTemplate): Promise<TQuestion> {
    const {
      data: { result },
    } = await this.request<TSurveyPayload<TQuestionStringifies>>({
      url: `${this.table}`,
      method: 'post',
      data: template,
    });

    return SurveyService.parseQuestion(result);
  }
}
