import styled from 'styled-components';
import { color } from '../../../../theme';
import { TagSmall } from '../../../../theme/typography';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 7px 12px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ color }) => color};
`;

export const Text = styled.span`
  ${TagSmall};
  text-transform: uppercase;
  color: ${color.mineShaft};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
`;
