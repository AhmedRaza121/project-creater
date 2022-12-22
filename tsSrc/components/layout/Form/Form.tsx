import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../../store/typing/interfaces';
import { TFormattedSection } from '../../../typings/type/TFormattedSection';

export const Form: FC = () => {
  const section = useSelector<IStore, TFormattedSection>(
    (state) => state.section.sections[state.section.currentSectionIndex]
  );

  if (!section) return null;

  const { renderer: Renderer } = section;

  if (!Renderer) return null;

  return <Renderer />;
};
