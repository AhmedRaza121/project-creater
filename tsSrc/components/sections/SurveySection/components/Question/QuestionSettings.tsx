import React, { ChangeEvent, FC } from 'react';
import { Dropdown } from '@storeworkflows/ui-kit';

import { TSettings } from '../../../../../typings/type/TQuestion';
import { CONTENT_TYPE } from '../../../../../constants/ContentType';

type TQuestionSettingsProps = {
  settings: TSettings | null;
  onSettingChange: (settings: TSettings) => void;
};

type TDropdownEvent = {
  clickedItem: {
    type: string[];
    id: string;
  };
};

export const QuestionSettings: FC<TQuestionSettingsProps> = ({ settings, onSettingChange }) => {
  if (!settings) return null;

  const handleMaxCount = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingChange({
      ...settings,
      max_attachments: { value: Number(event.target.value) },
    });
  };

  const handleType = (event: TDropdownEvent) => {
    const { clickedItem } = event;

    onSettingChange({
      ...settings,
      file_extensions: {
        value: clickedItem.type,
        label: clickedItem.id,
      },
    });
  };

  return (
    <div className="question-builder__settings-wrapper">
      <div className="settings-wrapper__item">
        <span>- Max Attachments: </span>
        <input
          className="label"
          type="number"
          min="1"
          placeholder="Max Attachments"
          value={settings.max_attachments.value}
          onChange={handleMaxCount}
        />
      </div>
      <div className="settings-wrapper__item settings-wrapper__item-dropdown">
        <span>- Type Of Attachment: </span>
        <Dropdown
          items={CONTENT_TYPE}
          selectedItems={[
            settings.file_extensions ? settings.file_extensions.label : CONTENT_TYPE[0].id,
          ]}
          select="single"
          manageSelected={true}
          onItemSelected={handleType}
        />
      </div>
    </div>
  );
};
