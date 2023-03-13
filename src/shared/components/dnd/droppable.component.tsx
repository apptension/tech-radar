import { useDroppable, UseDroppableArguments } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableProps extends UseDroppableArguments {
  children: ReactNode;
}

export const Droppable = ({ children, ...props }: DroppableProps) => {
  const { setNodeRef } = useDroppable(props);

  return (
    <div ref={setNodeRef} style={{ width: '100%' }}>
      {children}
    </div>
  );
};
