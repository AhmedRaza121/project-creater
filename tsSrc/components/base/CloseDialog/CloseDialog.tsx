import React, { FC, MutableRefObject } from 'react';
import { Popover, Button } from '@storeworkflows/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../store/typing/interfaces';
import { closeModal } from '../../../store/models/close/close.thunk';
import { showCloseModal } from '../../../store/models/close/close.slice';

interface ICloseDialogProps {
  target: MutableRefObject<HTMLButtonElement | undefined>;
}

export const CloseDialog: FC<ICloseDialogProps> = ({ target }) => {
  const popoverOpened = useSelector<IStore, boolean>((state) => state.close.show);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    //localStorage.removeItem("notes_field_value");

    let windowObject: any = window;
		windowObject["notesValue"] = null;
    dispatch(closeModal());
  };

  const handleClosePopover = () => dispatch(showCloseModal(false));

  if (!target || !target.current) return null;

  return (
    <Popover
      hideTail={true}
      manageOpened={true}
      opened={popoverOpened}
      positionTarget={target}
      positions={[
        { target: 'bottom-end', content: 'top-end' },
        { target: 'top-center', content: 'bottom-center' },
      ]}
    >
      <Popover.Content>
        <div className="close-dialog">
          <span className="dialog--label">Cancel Project creation</span>
          <dl className="dialog--content">
            <dt>Are you sure you want to close this session?</dt>
          </dl>
          <div className="dialog--buttons">
            <Button label="No, keep working" onClick={handleClosePopover} />
            <Button
              variant="primary-negative"
              label="Delete and close"
              onClick={handleModalClose}
            />
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
};
