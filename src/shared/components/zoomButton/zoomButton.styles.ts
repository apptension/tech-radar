import styled, { keyframes, css } from 'styled-components';

import { ReactComponent as PlusIconSVG } from '../../../images/icons/plus.svg';
import { ReactComponent as MinusIconSVG } from '../../../images/icons/minus.svg';
import { color } from '../../../theme';

export const pulseBorderKeyframe = keyframes`
	0% {
		padding: 12px;
		opacity: 0.75;
	}
	75% {
		padding: 22px;
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
`;

const buttonAnimatedStyles = css`
  &:before {
    opacity: 0.75;
    animation-name: ${pulseBorderKeyframe};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: backwards;
  }
`;

export const Container = styled.button.attrs({ type: 'button' })<{ animated?: boolean }>`
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    margin-bottom: 8px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:enabled:hover {
    .background {
      fill: ${color.mineShaft};
    }

    &:before {
      border-color: ${color.mineShaft};
    }
  }

  &:focus {
    outline: none;
  }

  &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    border: 6px solid ${color.tundora};
    opacity: 0;
  }

  ${({ animated }) => (animated ? buttonAnimatedStyles : null)};
`;

export const PlusIcon = styled(PlusIconSVG)``;
export const MinusIcon = styled(MinusIconSVG)``;
