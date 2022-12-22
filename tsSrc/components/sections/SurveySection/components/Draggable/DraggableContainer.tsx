import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { reorderQuestions } from '../../../../../store/models/survey/survey.thunk';
import { TSurveyStore } from '../../../../../store/models/survey/typings/types';
import { useDeepSelector } from '../../../../../utils/useDeepSelector';
import { QuestionPreloader } from '../Question/QuestionPreloader';
import { IStore } from '../../../../../store/typing/interfaces';
import DraggableItem from './DraggableItem';

export const DraggableContainer: FC = () => {
  const { questions, loading } = useDeepSelector<IStore, TSurveyStore>((state) => state.survey);
  const dispatch = useDispatch();
  const handleDragEnd = (dragIndex: number, hoverIndex: number) => {
    dispatch(reorderQuestions({ from: dragIndex, to: hoverIndex }));
  };

  return (
    <div className="draggable-list__container">
      <DndProvider backend={HTML5Backend}>
        {questions.map((question, index) => (
          <DraggableItem
            key={question.sys_id}
            question={question}
            index={index}
            onMove={handleDragEnd}
          />
        ))}
        {loading && <QuestionPreloader />}
      </DndProvider>
    </div>
  );
};
