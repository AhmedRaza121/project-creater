import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {Icon} from '@storeworkflows/ui-kit';

import {createNewQuestion} from '../../../../../store/models/survey/survey.thunk';
import {TQuestionType} from '../../../../../store/models/survey/typings/types';
import {setQuestionTypesOpened} from '../../../../../store/models/survey/survey.slice';

export const QuestionType: FC<TQuestionType> = ({label, icon, type}) => {
	const dispatch = useDispatch();

	const handleCreateQuestion = () => {
		dispatch(createNewQuestion(type));
		dispatch(setQuestionTypesOpened(false));
	};

	return <li key={label} className="type" onClick={handleCreateQuestion}>
		<Icon size='sm' icon={icon}/>
		<span className="name">{label}</span>
	</li>;
};
