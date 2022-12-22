import React, { FC, CSSProperties, forwardRef, useRef, useImperativeHandle } from 'react';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  XYCoord,
} from 'react-dnd';

import { TQuestion } from '../../../../../typings/type/TQuestion';
import { Question } from '../Question/Question';

interface IQuestionsItemProps {
  onMove: (dragIndex: number, hoverIndex: number) => void;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
  question: TQuestion;
  index: number;
}

interface IQuestionInstance {
  getNode(): HTMLDivElement | null;
}

const DraggableItem = forwardRef<any, IQuestionsItemProps>(function DraggableItem(
  // eslint-disable-next-line react/prop-types
  { question, isDragging, connectDragSource, connectDropTarget },
  ref
) {
  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);

  useImperativeHandle<any, IQuestionInstance>(ref, () => ({
    getNode: () => elementRef.current,
  }));

  const getItemStyle = (isDragging: boolean): CSSProperties => {
    return {
      userSelect: 'none',
      width: '99%',
      border: isDragging && '1px dashed RGB(var(--now-color--primary-1, 30, 133, 109))',
    } as unknown as CSSProperties;
  };

  return (
    <div style={getItemStyle(isDragging)} ref={elementRef} className="button-wrapper">
      {/* eslint-disable-next-line react/prop-types */}
      <Question key={question.sys_id} {...question} />
    </div>
  );
});

interface QuestionDragObject {
  id: string;
  index: number;
}

export default DropTarget(
  'QUESTION',
  {
    hover(props: IQuestionsItemProps, monitor: DropTargetMonitor, component: IQuestionInstance) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem<QuestionDragObject>().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.onMove(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem<QuestionDragObject>().index = hoverIndex;
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    'QUESTION',
    {
      beginDrag: (props: IQuestionsItemProps) => ({
        id: props.question.sys_id,
        index: props.index,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(DraggableItem)
);
