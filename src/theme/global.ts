import { createGlobalStyle } from 'styled-components';

import { fontFamily } from './font';
import { maxWidthStyles } from './media';
import { color } from './index';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${fontFamily.primary};
    color: ${color.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${color.codGray};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  #app {


    & > div:first-of-type {
      ${maxWidthStyles};
    }
  }
`;
