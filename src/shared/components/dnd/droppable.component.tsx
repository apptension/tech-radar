import { useDroppable, UseDroppableArguments } from '@dnd-kit/core';
import React, { Children, ReactNode } from 'react';
import { DroppableContainer } from './dnd.styles';

interface DroppableProps extends UseDroppableArguments {
  children: ReactNode;
}

export const Droppable = ({ children, ...props }: DroppableProps) => {
  const { setNodeRef, isOver } = useDroppable(props);
  const child = Children.only(children) as React.ReactElement;

  return <DroppableContainer ref={setNodeRef}>{React.cloneElement(child, { isOver })}</DroppableContainer>;
};
