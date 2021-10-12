import React, { ButtonHTMLAttributes } from 'react';
import { ThemeProvider } from 'styled-components';
import { empty } from 'ramda';
import { Link } from 'react-router-dom';

import { Container } from './button.styles';
import { ButtonTheme, ButtonVariant } from './button.types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  link?: string;
}

export const Button = ({
  children,
  className,
  disabled = false,
  variant = ButtonVariant.PRIMARY,
  onClick = empty,
  link,
  ...other
}: ButtonProps) => {
  const theme: ButtonTheme = { variant, isDisabled: disabled };

  const renderLink = () => <Link to={link!}>{renderButton()};</Link>;

  const renderButton = () => (
    <Container onClick={onClick} className={className} disabled={disabled} {...other}>
      {children}
    </Container>
  );

  return <ThemeProvider theme={theme}>{link ? renderLink() : renderButton()}</ThemeProvider>;
};
