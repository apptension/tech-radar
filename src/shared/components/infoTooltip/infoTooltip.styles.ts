import styled from 'styled-components';
import { color, zIndex } from '../../../theme';
import { CaptionMedium } from '../../../theme/typography';
import { mediaQuery } from './../../../theme/media';

export const ChildrenContainer = styled.div`
  display: flex;
`;

export const TooltipContainer = styled.div<{ isSmall: boolean }>`
  ${CaptionMedium};
  position: absolute;
  background-color: ${color.mineShaft2};
  border: 1px solid ${color.mineShaft};
  padding: 20px;
  z-index: ${zIndex.overlay};
  margin-top: 28px;
  max-width: 100%;
  left: 0;
  white-space: pre-wrap;
  text-align: left;
  z-index: 300;
  line-height: 1.2;
  ${mediaQuery.tablet} {
    max-width: 515px;
    min-width: ${({ isSmall }) => (isSmall ? 'unset' : '300px')};
    left: unset;
  }
`;
