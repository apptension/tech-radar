import { DefaultTheme } from 'styled-components';

export interface TagTheme extends DefaultTheme {
  size: TagSize;
  variant: TagVariant;
  clickable: boolean;
}

export enum TagSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum TagVariant {
  DEFAULT = 'default',
  DARK = 'dark',
}
