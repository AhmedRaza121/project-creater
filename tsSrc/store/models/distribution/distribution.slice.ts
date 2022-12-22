import { createSlice } from '@reduxjs/toolkit';

import { TDistributionState } from './typings/types';
import { reducers } from './distribution.reducers';
import { TRecordFormField } from '../../../services/field/typings/types';

export const initialState: TDistributionState = {
  activeTab: 'group',
  tabs: [
    {
      id: 'group',
      label: 'Role',
    },
    {
      id: 'distribution',
      label: 'Location',
    },
    {
      id: 'user',
      label: 'User',
    },
  ],
  tabFieldsFilter: {
    group: (field: TRecordFormField) => field.name.includes('group'),
    distribution: (field: TRecordFormField) => field.name.includes('distribution'),
    user: (field: TRecordFormField) =>
      field.name.includes('user') || field.name === 'additional_assignee_list',
  },
};

const distributionSlice = createSlice({
  name: 'distribution',
  initialState,
  reducers,
});

export const distributionReducer = distributionSlice.reducer;

export const { setActiveTab, resetDistributionState } = distributionSlice.actions;
