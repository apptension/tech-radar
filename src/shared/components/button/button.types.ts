import { DefaultTheme } from 'styled-components';

export interface ButtonTheme extends DefaultTheme {
  variant: ButtonVariant;
  size: ButtonSize;
  isDisabled: boolean;
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSize {
  REGULAR = 'regular',
  LARGE = 'large',
}

export enum ButtonIcon {
  ARROW = 'arrow',
  OUT = 'out',
}
