import styled from 'styled-components';
import { color } from '../../../theme';
import { tooltipDelay, transition } from '../../utils/constants';

export const SVG = styled.svg`
  width: 100%;
  overflow: visible;

  .radar,
  .ring-labels,
  .area-labels {
    opacity: 1;
    will-change: opacity;
    transition: opacity ${transition};
  }
  .radar.not-hovered,
  .ring-labels.not-hovered,
  .area-labels.not-hovered {
    opacity: 0.25;
    transition: opacity ${transition} ${tooltipDelay};
  }

  .ring-label {
    cursor: pointer;
  }

  .area-label {
    transition: opacity ${transition};
    cursor: pointer;

    & > rect {
      transition: fill ${transition};
      fill: ${color.mineShaft};
    }

    & > text {
      transition: fill ${transition};
      fill: ${color.scorpion};
    }

    &:hover,
    &.active,
    &.selected {
      & > rect {
        fill: ${color.silver};
      }

      & > text {
        fill: ${color.mineShaft};
      }
    }

    &.not-hovered {
      transition: opacity ${transition} ${tooltipDelay};
      opacity: 0.25;
    }
  }

  .quadrant {
    circle {
      transition: opacity ${transition};
      opacity: 0;
    }

    &.active,
    &.selected {
      circle {
        opacity: 1;
      }
    }
  }

  .blip {
    .square,
    .circle,
    .triangle,
    .diamond {
      fill: ${color.mineShaft};
    }
  }

  .blip.active {
    .diamond,
    .square,
    .circle,
    .triangle {
      fill: ${color.silver};
    }
  }

  .outer {
    opacity: 0;
  }

  .blip-inner {
    transition: transform ${transition};
    transform: scale(1);
  }

  .blip:hover,
  .blip.selected {
    .square,
    .circle,
    .triangle {
      fill: url(#mainGradient);
    }

    .diamond {
      fill: url(#diamondMainGradient);
    }

    .outer {
      opacity: 0.3;
    }

    .blip-inner {
      transform: scale(1.5);
    }
  }

  .blip:not(.active):not(.hover-active) {
    pointer-events: none;
  }

  .ring-label {
    fill: ${color.boulder};
    opacity: 1;
    transition: opacity ${transition} ${tooltipDelay}, fill ${transition} ${tooltipDelay};

    &.active:not(.not-hovered) {
      fill: ${color.white};
      transition: opacity ${transition}, fill ${transition};
    }

    &:hover {
      fill: ${color.white};
    }
  }
`;
