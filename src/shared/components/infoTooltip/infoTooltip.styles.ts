import styled from 'styled-components';
import { color, zIndex } from '../../../theme';
import { CaptionMedium } from '../../../theme/typography';

export const ChildrenContainer = styled.div`
  display: flex;
`;

export const TooltipContainer = styled.div`
  ${CaptionMedium};
  position: absolute;
  background-color: ${color.mineShaft2};
  border: 1px solid ${color.mineShaft};
  padding: 20px;
  z-index: ${zIndex.overlay};
  margin-top: 28px;
  max-width: 515px;
`;
