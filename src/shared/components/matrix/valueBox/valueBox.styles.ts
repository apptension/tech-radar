import styled, { css, keyframes } from 'styled-components';
import { color, scrollbar } from '../../../../theme';

interface ContentContainerProps {
  maxHeight: string;
  isOver?: boolean;
}
interface ScrollableContainerProps {
  withoutOverflow: boolean;
}

export const Container = styled.div<{ maxWidth?: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow: visible;

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  border: 1px solid ${color.white};
  border-color: ${({ isOver }) => (isOver ? color.secondary : color.white)};
  background-color: ${color.codGray};
  padding: 20px;
  transition: border-color 0.3s ease;
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      height: ${maxHeight};
    `}
`;

export const ScrollableContainer = styled.div<ScrollableContainerProps>`
  ${scrollbar.customScrollbar};
  position: relative;
  overflow: auto;
  padding-right: 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-content: flex-start;
  height: 100%;

  ${({ withoutOverflow }) =>
    withoutOverflow &&
    css`
      overflow: hidden;
    `}
`;

const rotateAnimation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 36px;
  height: 36px;
  border: 3px solid ${color.silver};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotateAnimation} 1s linear infinite;
`;
