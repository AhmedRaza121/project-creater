import React, { FC } from 'react';

import { TRecordFormField } from '../../../services/field/typings/types';
import { Field } from '../Field/Field';

interface IFullLayoutProps {
  fields: TRecordFormField[];
  //refCustom?: any
}
export const FullLayout: FC<IFullLayoutProps> = ({ fields }) => { 

  return (
    <div className="form-layout">
      {fields.map((field) => (
        <Field key={field.name} field={field} />
      ))}
    </div>
  );
};
