import styled from 'styled-components';
import { zIndex } from '../../../theme';
import { maxWidthStyles } from '../../../theme/media';

export const Container = styled.header`
  ${maxWidthStyles};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 40px 35px 2px 35px;
  z-index: ${zIndex.header};
`;
