import styled from 'styled-components';
import { zIndex } from '../../../theme';
import { maxWidthStyles, mediaQuery } from '../../../theme/media';

export const Container = styled.header`
  ${maxWidthStyles};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 35px 2px 35px;
  z-index: ${zIndex.header};

  ${mediaQuery.desktop} {
    position: fixed;
    justify-content: space-between;
  }
`;
