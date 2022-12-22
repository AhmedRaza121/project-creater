import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';

import { TChoice } from '../../../../../../typings/type/TQuestion';

interface IChoiceProps {
  choice: TChoice;
  index: number;
  onRemove: (index: number) => void;
  onInput: (index: number, value: string) => void;
}

export const Choice: FC<IChoiceProps> = ({ choice, onRemove, onInput, index }) => {
  const { value } = choice;

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current?.parentElement?.lastChild === inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const handleBackspace = (event: KeyboardEvent) => {
    if (event.key !== 'Backspace') return;
    if (value) return;

    onRemove(index);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    onInput(index, event.target.value);
  };

  return (
    <div className="choice__builder">
      {' '}
      -{' '}
      <input
        ref={(elm) => (inputRef.current = elm as HTMLInputElement)}
        type="text"
        placeholder="Choice"
        className="label"
        value={value}
        onKeyDown={handleBackspace}
        onInput={handleInput}
      />
    </div>
  );
};
