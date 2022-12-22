import {Button} from '@storeworkflows/ui-kit';
import {useDispatch} from 'react-redux';
import React, {FC} from 'react';

import {setPreviousSection} from '../../../../store/models/section/section.slice';
import {TSectionState} from '../../../../store/models/section/typings/types';
import {useDeepSelector} from '../../../../utils/useDeepSelector';
import {IStore} from '../../../../store/typing/interfaces';

export const Back: FC = () => {
	const {isFirstSection, isWelcomePage} = useDeepSelector<IStore, TSectionState>(state => state.section);

	const dispatch = useDispatch();

	if (isWelcomePage) return null;

	const handlePrevSection = () =>  {
		let windowObject: any = window;
		let storageValue: any = windowObject["notesValue"];
		if (storageValue != null && storageValue != undefined) {
			window.g_form.setValue("notes", storageValue);
		}
		dispatch(setPreviousSection())
	};

	return <Button
		label="Back"
		variant="secondary-positive"
		size="md"
		disabled={isFirstSection}
		onClick={handlePrevSection}
	/>;
};

