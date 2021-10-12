import React from 'react';

import { FullLogo, Iconlogo } from './logo.styles';

export interface LogoProps {
  full?: boolean;
}

export const Logo = ({ full = true }: LogoProps) => {
  return full ? <FullLogo /> : <Iconlogo />;
};
