import styled from 'styled-components';
import { zIndex } from '../../../../theme';
import { Button } from '../../button';

export const ActionsContainer = styled.div`
  position: relative;
  margin-top: 60px;
  display: flex;
  gap: 40px;
  z-index: ${zIndex.contentOverlay};
`;

export const NextButton = styled(Button)`
  align-self: flex-start;
  position: relative;
`;
