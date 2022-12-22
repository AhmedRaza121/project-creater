import React, { FC, useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../typings/type/TSectionLayout';
import { FieldService } from '../../../services/field/field.service';
import { useDeepSelector } from '../../../utils/useDeepSelector';
import { FullLayout } from '../../layout/Layout/FullLayout';
import { IStore } from '../../../store/typing/interfaces';
import { NewQuestion } from './components/NewQuestion/NewQuestion';
import { DraggableContainer } from './components/Draggable/DraggableContainer';

const SurveyBuilder: FC = () => {
  const currentSectionIndex = useSelector<IStore, number>(
    (state) => state.section.currentSectionIndex
  );
  const sectionLayout = useDeepSelector<IStore, TFieldComposition<TFullLayout | TColumnLayout>[]>(
    (state) => state.form.layouts[currentSectionIndex]
  );

  const sectionFields = useMemo(() => FieldService.getSectionFields(sectionLayout), []);

  return (
    <Fragment>
      <div className="survey-fields" style={{ marginTop: '1rem' }}>
        <FullLayout fields={sectionFields} />
      </div>
      <div className="survey-type">
        <NewQuestion />
      </div>
      <div className="feedbacks">
        <DraggableContainer />
      </div>
    </Fragment>
  );
};

export default SurveyBuilder;
