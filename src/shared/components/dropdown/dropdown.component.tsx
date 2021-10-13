import React from 'react';

import { Container, ChevronIcon } from './dropdown.styles';

interface DropdownProps {
  title: string;
  className?: string;
}

export const Dropdown = ({ title, className }: DropdownProps) => {
  return (
    <Container className={className}>
      {title}
      <ChevronIcon />
    </Container>
  );
};
