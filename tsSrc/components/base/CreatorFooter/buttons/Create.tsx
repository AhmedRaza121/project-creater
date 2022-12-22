import { Button } from '@storeworkflows/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';

import { IStore } from '../../../../store/typing/interfaces';
import { distributeProject } from '../../../../store/models/form/form.thunk';

export const Create: FC = () => {
  const isLastSection = useSelector<IStore, boolean>((state) => state.section.isLastSection);
  const dispatch = useDispatch();

  if (!isLastSection) return null;

  const createHandler = () => dispatch(distributeProject());

  return <Button label="Create" variant="primary" size="md" onClick={createHandler} />;
};
