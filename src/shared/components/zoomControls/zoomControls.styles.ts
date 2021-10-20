import styled from 'styled-components';
import { zIndex } from '../../../theme';

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  z-index: ${zIndex.contentOverlay};
`;
