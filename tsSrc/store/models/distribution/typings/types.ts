import { TRecordFormField } from '../../../../services/field/typings/types';

export type TActiveTab = 'group' | 'distribution' | 'user';

export type TFieldFilter = (field: TRecordFormField) => boolean;

export type TTab = {
  id: TActiveTab;
  label: string;
};

export type TDistributionState = {
  activeTab: TActiveTab;
  tabs: TTab[];
  tabFieldsFilter: Record<TActiveTab, TFieldFilter>;
};
