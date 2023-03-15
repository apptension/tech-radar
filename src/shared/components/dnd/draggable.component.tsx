import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { DraggableContainer } from './dnd.styles';

interface DraggableProps extends UseDraggableArguments {
  children: ReactNode;
}

export const Draggable = ({ children, ...props }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable(props);

  return (
    <DraggableContainer isHidden={isDragging} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </DraggableContainer>
  );
};
