import React, { ReactNode } from 'react';
import { Button } from '../button';

import { ButtonProps } from '../button/button.component';
import { OuterLink, InnerLink } from './link.styles';

export interface LinkProps extends Pick<ButtonProps, 'size' | 'icon'> {
  to: string;
  children?: ReactNode;
}

export const Link = ({ to, children, ...other }: LinkProps) => {
  const isLinkInternal = to.startsWith('/');

  const renderButton = () => <Button {...other}>{children}</Button>;
  const renderInnerLink = () => <InnerLink to={to}>{renderButton()}</InnerLink>;
  const renderOuterLink = () => <OuterLink href={to}>{renderButton()}</OuterLink>;
  const renderLink = () => (isLinkInternal ? renderInnerLink() : renderOuterLink());

  return renderLink();
};
