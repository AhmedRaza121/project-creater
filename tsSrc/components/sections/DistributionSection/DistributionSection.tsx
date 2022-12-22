import React, { FC, Fragment } from 'react';
import { Tab } from '@storeworkflows/ui-kit';

import {
  TColumnComposition,
  TColumnLayout,
  TFieldComposition,
  TFullComposition,
  TFullLayout,
} from '../../../typings/type/TSectionLayout';
import {
  TActiveTab,
  TDistributionState,
  TFieldFilter,
} from '../../../store/models/distribution/typings/types';
import { useDeepSelector } from '../../../utils/useDeepSelector';
import { IStore } from '../../../store/typing/interfaces';
import { useDispatch } from 'react-redux';
import { FieldService } from '../../../services/field/field.service';
import { FullLayout } from '../../layout/Layout/FullLayout';
import { setActiveTab } from '../../../store/models/distribution/distribution.slice';
import { TRecordFormField } from '../../../services/field/typings/types';

const sectionFields = (sectionLayout: (TFullComposition | TColumnComposition)[]) =>
  FieldService.getSectionFields(sectionLayout);

const fields = (
  tabFieldsFilter: Record<TActiveTab, TFieldFilter>,
  activeTab: TActiveTab,
  sectionFields: TRecordFormField[]
) => {
  const fieldsFilter = tabFieldsFilter[activeTab];
  return sectionFields.filter(fieldsFilter);
};

export const DistributionSection: FC = () => {
  const { activeTab, tabs, tabFieldsFilter } = useDeepSelector<IStore, TDistributionState>(
    (state) => state.distribution
  );

  const sectionLayout = useDeepSelector<IStore, TFieldComposition<TFullLayout | TColumnLayout>[]>(
    (state) => {
      return state.form.layouts[state.section.currentSectionIndex];
    }
  );

  const dispatch = useDispatch();

  const handleActiveTab = ({ id }: { id: TActiveTab }) => dispatch(setActiveTab(id));

  const tabFields = fields(tabFieldsFilter, activeTab, sectionFields(sectionLayout));

  return (
    <Fragment>
      <Tab
        fixedWidth={false}
        tabsAlignment="left"
        items={tabs}
        selectedItem={activeTab}
        onClick={handleActiveTab}
      />
      <div style={{ marginTop: '1rem' }}>
        <FullLayout fields={tabFields} />
      </div>
    </Fragment>
  );
};
