import { Modal } from '@storeworkflows/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useEffect, useRef } from 'react';

import { TCreatorState } from '../../../store/models/creator/typings/types';
import { getRecordForm } from '../../../store/models/form/form.thunk';
import { useDeepSelector } from '../../../utils/useDeepSelector';
import { IStore } from '../../../store/typing/interfaces';
import { CreatorPreloader } from '../Preloader/Preloader';
import { CreatorHeader } from '../CreatorHeader/CreatorHeader';
import { CreatorBody } from '../CreatorBody/CreatorBody';
import { CreatorFooter } from '../CreatorFooter/CreatorFooter';
import { showCloseModal } from '../../../store/models/close/close.slice';

export const Creator: FC = () => {
  const { opened } = useDeepSelector<IStore, TCreatorState>((state) => state.creator);
  const loading = useSelector<IStore, boolean>((state) => state.form.loading);

  const closeButtonRef = useRef<HTMLButtonElement>();

  const dispatch = useDispatch();

  const handleShowPopover = () => dispatch(showCloseModal(true));

  useEffect(() => {
    opened && dispatch(getRecordForm());
  }, [opened]);

  if (!opened) return null;

  if (loading) return <CreatorPreloader />;

  return (
    <Modal
      openModal={opened}
      manageOpened={true}
      onClose={handleShowPopover}
      closeRef={closeButtonRef}
    >
      <Modal.Header>
        <CreatorHeader closeButtonRef={closeButtonRef} />
      </Modal.Header>
      <Modal.Body>
        <CreatorBody />
      </Modal.Body>
      <Modal.Footer>
        <CreatorFooter />
      </Modal.Footer>
    </Modal>
  );
};
