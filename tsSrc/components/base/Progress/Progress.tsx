import React, { FC } from 'react';
import { Stepper } from '@storeworkflows/ui-kit';
import { IStore } from '../../../store/typing/interfaces';
import { useDeepSelector } from '../../../utils/useDeepSelector';
import { TFormattedSection } from '../../../typings/type/TFormattedSection';

export const Progress: FC = () => {
  const sections = useDeepSelector<IStore, TFormattedSection>((state) => state.section.sections);

  return (
    <Stepper
      steps={sections}
      selectedItem={0}
      disableScroll={true}
      palette={{
        icon: {
          finished: 'check',
          unfinished: '',
        },
        link: '',
        label: '',
        arrows: 'black',

        circle: 'var(--selected-color)',
      }}
    />
  );
};
