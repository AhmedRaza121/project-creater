import {Icon} from '@storeworkflows/ui-kit';
import React, {FC} from 'react';

import {QuestionTypes} from './QuestionTypes';
import {useDispatch, useSelector} from 'react-redux';
import {IStore} from '../../../../../store/typing/interfaces';
import {setQuestionTypesOpened} from '../../../../../store/models/survey/survey.slice';

export const NewQuestion: FC = () => {
	const isOpened = useSelector<IStore, boolean>(state => state.survey.typesIsOpened);
	const dispatch = useDispatch();

	const handleNewQuestion = () => dispatch(setQuestionTypesOpened(!isOpened));

	return <div className="form">
		<div className="new-question" onClick={handleNewQuestion}>
			<Icon icon="plus" size="md"/>
			<span className="label">Add new question</span>
		</div>
		{isOpened && <QuestionTypes />}
	</div>;
};
