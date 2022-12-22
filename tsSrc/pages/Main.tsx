import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setFields, setOpened } from '../store/models/creator/creator.slice';
import { TField } from '../store/models/creator/typings/types';
import { Creator } from '../components/base/Creator/Creator';

declare global {
  interface Window {
    swfProjectCreator: {
      show: (fields: TField[]) => void;
    };
    notesValue: null;
  }
}

export const Main: FC<Record<string, unknown>> = () => {
  const dispatch = useDispatch();

  const handleCreatorShow = useCallback(
    (event: CustomEvent<{ fields: TField[]; show: boolean }>) => {
      const {
        detail: { fields, show },
      } = event;

      dispatch(setOpened(show));
      dispatch(setFields(fields));
    },
    []
  );

  useEffect(() => {
    window['swfProjectCreator'] = {
      show: (fields = []) => {
        const event = new CustomEvent('tw:creator:show', {
          detail: {
            fields,
            show: true,
          },
        });
        document.dispatchEvent(event);
      },
    };

    document.addEventListener('tw:creator:show', handleCreatorShow as EventListener);

    return () =>
      document.removeEventListener('tw:creator:show', handleCreatorShow as EventListener);
  }, []);

  return (
    <div className="tw-project-creator">
      <Creator />
    </div>
  );
};
