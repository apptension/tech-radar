import styled, { css, keyframes } from 'styled-components';
import { color } from '../../../../theme';

interface ScrollableContainerProps {
  maxHeight: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow: visible;
`;

export const ContentContainer = styled.div`
  border: 1px solid ${color.white};
  background-color: ${color.codGray};
  padding: 20px;
`;

export const ScrollableContainer = styled.div<ScrollableContainerProps>`
  position: relative;
  overflow: auto;
  padding-right: 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-content: flex-start;

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
      height: ${maxHeight};
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
