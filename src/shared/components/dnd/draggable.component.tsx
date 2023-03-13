import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface DraggableProps extends UseDraggableArguments {
  children: ReactNode;
}

export const Draggable = ({ children, ...props }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable(props);

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
