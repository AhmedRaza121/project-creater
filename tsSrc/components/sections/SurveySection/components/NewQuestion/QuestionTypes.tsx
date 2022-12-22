import React, {FC} from 'react';
import {QuestionType} from './QuestionType';
import {useDeepSelector} from '../../../../../utils/useDeepSelector';
import {IStore} from '../../../../../store/typing/interfaces';
import {TQuestionType} from '../../../../../store/models/survey/typings/types';

export const QuestionTypes: FC = () => {
	const questionTypes = useDeepSelector<IStore, TQuestionType[]>(state => state.survey.questionTypes);

	return <div className="questions-types">
		<ul className="types">
			{
				questionTypes.map(({icon, label, type}) => <QuestionType key={label} label={label} icon={icon} type={type}/>)
			}
		</ul>
	</div>;
};
