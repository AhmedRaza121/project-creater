import { TDistributionState } from '../models/distribution/typings/types';
import { TRecordFormState } from '../models/form/typings/types';
import { TCreatorState } from '../models/creator/typings/types';
import { TSectionState } from '../models/section/typings/types';
import { TTypeState } from '../models/type/typings/types';
import { TSurveyStore } from '../models/survey/typings/types';
import { TCloseState } from '../models/close/typings/types';

export interface IError {
  readonly id: string;
  readonly message: string;
}

export interface IStore {
  creator: TCreatorState;
  form: TRecordFormState;
  section: TSectionState;
  type: TTypeState;
  distribution: TDistributionState;
  survey: TSurveyStore;
  close: TCloseState;
}

export interface IError {
  readonly id: string;
  readonly message: string;
}
