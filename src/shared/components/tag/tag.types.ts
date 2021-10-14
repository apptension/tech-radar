import { DefaultTheme } from 'styled-components';

export interface TagTheme extends DefaultTheme {
  size: TagSize;
}

export enum TagSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
