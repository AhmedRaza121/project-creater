import { Button } from '@storeworkflows/ui-kit';
import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../../typings/type/TSectionLayout';
import { setNextSection } from '../../../../store/models/section/section.slice';
import { TSectionState } from '../../../../store/models/section/typings/types';
import { FieldService } from '../../../../services/field/field.service';
import { useDeepSelector } from '../../../../utils/useDeepSelector';
import { IStore } from '../../../../store/typing/interfaces';
import { saveProject } from '../../../../store/models/form/form.thunk';

export const Continue: FC = () => {
  const { isWelcomePage, isLastSection, currentSectionIndex } = useDeepSelector<
    IStore,
    TSectionState
  >((state) => state.section);
  const sectionLayout = useDeepSelector<IStore, TFieldComposition<TFullLayout | TColumnLayout>[]>(
    (state) => state.form.layouts[currentSectionIndex]
  );

  const dispatch = useDispatch();

  const hasMandatory = useMemo(() => {
    return FieldService.hasMandatoryFields(sectionLayout);
  }, [sectionLayout]);

  if (isWelcomePage || isLastSection) return null;

  const handleNextSection = async () => {
    await dispatch(saveProject());
    dispatch(setNextSection());
  };

  return (
    <Button
      label="Continue"
      variant="primary"
      size="md"
      disabled={hasMandatory}
      onClick={handleNextSection}
    />
  );
};
