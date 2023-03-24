import styled from 'styled-components';
import { zIndex } from '../../../theme';

export const Container = styled.aside`
  position: absolute;
  bottom: 24px;
  right: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: ${zIndex.overlay};
`;
