import React, {FC, Fragment} from 'react';
import {Tab} from '@storeworkflows/ui-kit';
import {HeaderItem} from './HeaderItem';

export const SummarySection: FC = () => {
	const headerFields = ['type', 'assigned_to', 'start', 'end', 'state', 'assignment_group', 'ssc_department'];
	const {g_form} = window;

	return <Fragment>
		<div className='summary__wrapper'>
			<h2 className='summary__project-title'>{g_form.getValue('short_description')}</h2>
			<header className='summary-header'>
				{headerFields.map(field => <HeaderItem key={field} field={field} />)}
			</header>
			<section className='summary-content'>
				<div className='content__item'>
					<Tab tabsAlignment='left' items={[{label: 'Details', id: 'details'}]} selectedItem={'details'} />
					<div
						className='content__item--wrapper'
						dangerouslySetInnerHTML={{ __html: `<span class='content__item-content'>${g_form.getValue('notes')}</span>` }}
					/>
				</div>
			</section>
		</div>
	</Fragment>;
};
