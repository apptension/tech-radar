import styled, { css } from 'styled-components';
import { color } from '../../../../theme';

interface ScrollableContainerProps {
  maxHeight: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContentContainer = styled.div`
  border: 1px solid ${color.white};
  background-color: ${color.codGray};
  padding: 20px;
`;

export const ScrollableContainer = styled.div<ScrollableContainerProps>`
  overflow: auto;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${color.mineShaft};
  }
  &::-webkit-scrollbar-thumb {
    background: ${color.silver};
    border-radius: 100px;
  }

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight};
    `}
`;
