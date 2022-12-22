import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@storeworkflows/ui-kit';
import React, {FC} from 'react';

import {setNextSection} from '../../../../store/models/section/section.slice';
import {IStore} from '../../../../store/typing/interfaces';
import {getStartedRecordForm, startProject} from '../../../../store/models/form/form.thunk';

export const LestGetStarted: FC = () => {
	const isWelcomePage = useSelector<IStore, boolean>(state => state.section.isWelcomePage);

	const dispatch = useDispatch();

	if (!isWelcomePage) return null;

	const handleNextSection = async () =>  {
		await dispatch(startProject());
		await dispatch(getStartedRecordForm());
		dispatch(setNextSection());
	};

	return <Button label="Let's get started" variant="primary" size="md" onClick={handleNextSection}/>;
};
