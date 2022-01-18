import { DefaultTheme } from 'styled-components';

export interface TitleTagTheme extends DefaultTheme {
  size: TitleTagSize;
}

export enum TitleTagSize {
  SMALL = 'small',
  LARGE = 'large',
}
