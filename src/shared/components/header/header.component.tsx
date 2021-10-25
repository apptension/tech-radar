import React, { ReactNode } from 'react';

import { Container } from './header.styles';

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ className, children }: HeaderProps) => {
  return <Container className={className}>{children}</Container>;
};
