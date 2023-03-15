import { useDroppable, UseDroppableArguments } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { DroppableContainer } from './dnd.styles';

interface DroppableProps extends UseDroppableArguments {
  children: ReactNode;
}

export const Droppable = ({ children, ...props }: DroppableProps) => {
  const { setNodeRef } = useDroppable(props);

  return <DroppableContainer ref={setNodeRef}>{children}</DroppableContainer>;
};
