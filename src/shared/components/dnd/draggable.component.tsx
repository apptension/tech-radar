import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DraggableProps extends UseDraggableArguments {
  children: ReactNode;
}

export const Draggable = ({ children, ...props }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable(props);

  return (
    <div ref={setNodeRef} style={isDragging ? { visibility: 'hidden' } : {}} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
