import React, { FC, KeyboardEvent } from 'react';

import { TChoice } from '../../../../../../typings/type/TQuestion';
import { Choice } from './Choice';

type TQuestionChoiceProps = {
  choices: TChoice[] | null;
  questionID: string;
  onChoiceChanged: (choices: TChoice[]) => void;
};

export const ChoiceBuilder: FC<TQuestionChoiceProps> = ({
  choices,
  questionID,
  onChoiceChanged,
}) => {
  if (!choices) return null;

  const handleAddChoice = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;

    const { target } = event;
    const { parentElement } = target as HTMLInputElement;

    if (target !== parentElement?.lastElementChild) return;

    onChoiceChanged([...choices, { value: '' }]);
  };

  const handleRemoveValue = (index: number) => {
    if (choices.length === 1) {
      return onChoiceChanged([{ value: '' }]);
    }

    onChoiceChanged(choices.filter((_, i) => i !== index));
  };

  const handleInput = (index: number, value: string) => {
    onChoiceChanged(
      choices.map((choice, i) => {
        if (i !== index) return choice;
        return { value };
      })
    );
  };

  return (
    <div className="choice-container" onKeyDown={handleAddChoice}>
      {choices.map((choice, index) => (
        <Choice
          key={`${questionID}-choice-${index}`}
          choice={choice}
          index={index}
          onRemove={handleRemoveValue}
          onInput={handleInput}
        />
      ))}
    </div>
  );
};
