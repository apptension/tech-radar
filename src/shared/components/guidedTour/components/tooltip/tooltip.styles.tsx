import styled from 'styled-components';
import { color } from '../../../../../theme';
import { Button } from '../../../button';
import { ReactComponent as CloseIconSVG } from '../../../../../images/icons/close.svg';

export const TooltipTitle = styled.h3`
  font-size: 26px;
  font-weight: 600;
  line-height: 31px;
  margin-top: 0;
  margin-bottom: 32px;
  max-width: 100%;
`;
export const TooltipContainer = styled.div<{ isSmall: boolean }>`
  background-color: ${color.mineShaft2};
  padding: 32px;
  border-radius: 8px;
  position: relative;
  width: ${({ isSmall }) => (isSmall ? '470px' : '602px')};
`;
export const TooltipBody = styled.div``;
export const TooltipContent = styled.div`
  p {
    line-height: 20px;
    color: ${color.silver};
  }
`;
export const TooltipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const CloseButton = styled(Button)`
  border: none;
  background: none;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const SkipButton = styled(Button)`
  border: none;
`;

export const CloseIcon = styled(CloseIconSVG)``;
