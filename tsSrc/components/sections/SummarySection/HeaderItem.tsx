import React, {FC} from 'react';

interface IHeaderItemProps {
	field: string
}

export const HeaderItem:FC<IHeaderItemProps> = ({field}) => {
	const {g_form} = window;

	return <div className='summary-header__item'>
		<label className='summary-header__title summary-header__item-styled'>
			{g_form.getLabel(field)}
		</label>
		<span
			className='summary-header__content summary-header__item-styled'>
			{g_form.getDisplayValue(field)}
		</span>
	</div>;
};
