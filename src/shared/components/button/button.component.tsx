import React, { ButtonHTMLAttributes } from 'react';
import { ThemeProvider } from 'styled-components';
import { empty } from 'ramda';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, Icon, OutIcon, ArrowIcon, IconContainer, IconContainerInner } from './button.styles';
import { ButtonIcon, ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  withBorder?: boolean;
}

export const Button = ({
  children,
  className,
  disabled = false,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.REGULAR,
  onClick = empty,
  withBorder = true,
  icon,
  ...other
}: ButtonProps) => {
  const theme: ButtonTheme = { size, variant, isDisabled: disabled, withBorder };

  const iconTypes = {
    [ButtonIcon.ARROW]: () => <ArrowIcon />,
    [ButtonIcon.OUT]: () => <OutIcon />,
  };

  const getIcon = () => (icon && iconTypes[icon] ? iconTypes[icon]() : null);

  const renderIcon = renderWhenTrue(() => (
    <IconContainer>
      <IconContainerInner>
        <Icon>{getIcon()}</Icon>
        <Icon>{getIcon()}</Icon>
      </IconContainerInner>
    </IconContainer>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={onClick} className={className} disabled={disabled} {...other}>
        {children}
        {renderIcon(!!icon)}
      </Container>
    </ThemeProvider>
  );
};
