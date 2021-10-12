import React, { ReactNode } from 'react';

import { Container } from './header.styles';

export interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <Container>{children}</Container>;
};
