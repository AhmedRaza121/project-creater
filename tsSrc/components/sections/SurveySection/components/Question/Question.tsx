import { Icon, Button, Toggle } from '@storeworkflows/ui-kit';
import React, { ChangeEvent, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  copyQuestion,
  removeQuestion,
  saveQuestion,
} from '../../../../../store/models/survey/survey.thunk';
import { TChoice, TQuestion, TSettings } from '../../../../../typings/type/TQuestion';
import { IStore } from '../../../../../store/typing/interfaces';
import { QuestionSettings } from './QuestionSettings';
import { ChoiceBuilder } from './ChoiceBuilder/ChoiceBuilder';
import { updateQuestion } from '../../../../../store/models/survey/survey.slice';

export const Question: FC<TQuestion> = ({
  index,
  question,
  choices,
  mandatory,
  settings,
  type,
  sys_id,
  dirty,
}) => {
  const icon = useSelector<IStore, string>(
    (state) => state.survey.questionTypes.find(({ type: qType }) => qType === type)?.icon ?? ''
  );
  const dispatch = useDispatch();

  const handleQuestionDelete = useCallback(() => dispatch(removeQuestion(sys_id)), [sys_id]);
  const handleCopyQuestion = useCallback(() => dispatch(copyQuestion(sys_id)), [sys_id]);
  const handleMandatory = useCallback(
    (mandatory : boolean) => dispatch(updateQuestion({ mandatory, sys_id })),
    [sys_id]
  );
  const handleQuestionName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch(updateQuestion({ question: event.target.value, sys_id })),
    [sys_id]
  );
  const handleQuestionChoice = useCallback(
    (choices: TChoice[]) => dispatch(updateQuestion({ choices, sys_id })),
    [sys_id]
  );
  const handleQuestionSettings = useCallback(
    (settings: TSettings) => dispatch(updateQuestion({ settings, sys_id })),
    [sys_id]
  );

  const handleSave = useCallback(() => {
    dirty && dispatch(saveQuestion({ sys_id }));
  }, [dirty]);

  return (
    <div className="question" onMouseLeave={handleSave}>
      <div className="question__number">
        <div className="number">{index}</div>
        <div className="question__number-icon">
          <Icon size="sm" className="icon" icon={icon} />
        </div>
      </div>
      <div className="question__label">
        <input
          className="label"
          placeholder="Type question here..."
          onChange={handleQuestionName}
          value={question}
        />
      </div>
      <div className="question__additional">
        <div className="settings-wrapper__item">
          <span>- Mandatory: </span>
          <Toggle size="sm" checked={mandatory} onClick={() => handleMandatory(!mandatory)} />
        </div>
        <ChoiceBuilder
          choices={choices}
          questionID={sys_id}
          onChoiceChanged={handleQuestionChoice}
        />
        <QuestionSettings settings={settings} onSettingChange={handleQuestionSettings} />
      </div>
      <div className="question__setting">
        <Button
          customStyle={{ 'font-size': '0' }}
          onClick={handleCopyQuestion}
          tooltipContent="Copy"
          variant="tertiary"
          icon="back"
          size="md"
          bare
        />
        <Button
          customStyle={{ 'font-size': '0' }}
          onClick={handleQuestionDelete}
          tooltipContent="Delete"
          variant="tertiary"
          size="md"
          icon="x"
          bare
        />
      </div>
    </div>
  );
};
