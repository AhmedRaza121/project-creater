import { FC } from 'react';

export type TFormattedSection = {
  id: number;
  index: number;
  value: string;
  label: string;
  current: boolean;
  continue: false;
  progress: 'partial' | 'done' | 'none';
  renderer: FC | null;
  disabled: boolean;
};
