import React from 'react';

import { Container, FullLogo, Iconlogo } from './logo.styles';

export interface LogoProps {
  full?: boolean;
  className?: string;
}

export const Logo = ({ full = true, className }: LogoProps) => {
  return <Container className={className}>{full ? <FullLogo /> : <Iconlogo />}</Container>;
};
