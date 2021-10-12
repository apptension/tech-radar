import styled from 'styled-components';
import { zIndex } from '../../../theme';

export const Container = styled.header`
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
