import React, {FC} from 'react';

import {TRecordFormField} from '../../../services/field/typings/types';
import {Field} from '../Field/Field';

interface IColumnLayoutProps {
	left: TRecordFormField[],
	right: TRecordFormField[]
}

export const ColumnLayout: FC<IColumnLayoutProps> = ({left, right}) => {

	return <div className='form-layout column'>
		<div className="align-left">
			{
				left.map(field => <Field key={field.name} field={field}/>)
			}
		</div>
		<div className="align-right">
			{
				right.map(field => <Field key={field.name} field={field}/>)
			}
		</div>
	</div>;
};
