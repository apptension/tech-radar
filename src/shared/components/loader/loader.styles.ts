import styled, { keyframes, css } from 'styled-components';
import { color, zIndex } from '../../../theme';
import { CaptionMedium } from '../../../theme/typography';

export const pulseBorderKeyframe = keyframes`
	0% {
		padding: 24px;
		opacity: 0.25;
	}
	75% {
		padding: 48px;
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
`;

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const Circle = styled.div`
  width: 48px;
  height: 48px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${color.gradient};
    opacity: 0.25;
    animation-name: ${pulseBorderKeyframe};
    animation-duration: 2s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${color.gradient};
    z-index: ${zIndex.overlay};
  }
`;

const withEllipsisStyles = css`
  &:after {
    position: static;
    content: '\\2026';
  }
`;

export const Text = styled.p<{ withEllipsis: boolean }>`
  ${CaptionMedium};
  padding: 0;
  margin: 64px 0 0;

  ${({ withEllipsis }) => (withEllipsis ? withEllipsisStyles : null)};
`;
