import { createGlobalStyle } from 'styled-components';

import { fontFamily } from './font';
import { maxWidthStyles } from './media';
import { color } from './index';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${fontFamily.primary};
    color: ${color.white};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  #app {
    height: 100vh;
    width: 100vw;
    background-color: ${color.codGray};
    overflow: hidden;
    
    & > div:first-of-type {
      ${maxWidthStyles};
    }
  }
`;
