import React, { FC } from 'react';
import { Preloader } from '@storeworkflows/ui-kit';

export const QuestionPreloader: FC = () => {
  return (
    <Preloader
      mainStyles={{ padding: '0 0', width: '100%', margin: 0 }}
      count={1}
      background={false}
      blur="1.6rem"
      items={[
        {
          width: '100%',
          height: '3rem',
          repeat: 1,
          styles: [{ margin: '0 0 4px 0', width: '100%', height: '3rem', borderRadius: '0.5rem' }],
        },
        {
          width: '3rem',
          height: '2.5rem',
          repeat: 1,
          styles: [
            {
              position: 'absolute',
              top: '0',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.5rem',
            },
          ],
        },
        {
          width: '7rem',
          height: '2.5rem',
          repeat: 1,
          right: 0,
          styles: [
            {
              position: 'absolute',
              top: '0',
              right: '0',
              width: '7rem',
              height: '2.5rem',
              borderRadius: '0.5rem',
            },
          ],
        },
        {
          width: '38%',
          height: '1.5rem',
          repeat: 1,
          right: 0,
          styles: [
            {
              position: 'absolute',
              top: '14%',
              left: '15%',
              width: '38%',
              height: '1.5rem',
              borderRadius: '0.5rem',
            },
          ],
        },
      ]}
    />
  );
};
