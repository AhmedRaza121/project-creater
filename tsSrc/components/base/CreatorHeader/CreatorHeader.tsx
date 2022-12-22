import React, { FC, Fragment, MutableRefObject } from 'react';
import { CloseDialog } from '../CloseDialog/CloseDialog';
import { Progress } from '../Progress/Progress';

interface ICreatorHeaderProps {
  closeButtonRef: MutableRefObject<HTMLButtonElement | undefined>;
}

export const CreatorHeader: FC<ICreatorHeaderProps> = ({ closeButtonRef }) => {
  return (
    <Fragment>
      <CloseDialog target={closeButtonRef} />
      <Progress />
    </Fragment>
  );
};
