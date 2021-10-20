import React from 'react';

import { Container, Circle, Text } from './loader.styles';

export interface HeaderProps {
  text?: string;
  withEllipsis?: boolean;
  className?: string;
}

export const Loader = ({ className, text = 'loading', withEllipsis = false }: HeaderProps) => {
  return (
    <Container className={className}>
      <Circle />
      <Text withEllipsis={withEllipsis}>{text}</Text>
    </Container>
  );
};
