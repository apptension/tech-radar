import styled from 'styled-components';
import { color } from '../../../theme';

const transition = '200ms ease-in-out';
const tooltipDelay = '250ms';

export const SVG = styled.svg`
  overflow: visible;

  .radar {
    opacity: 1;
    will-change: opacity;
    transition: opacity ${transition} ${tooltipDelay};
  }

  .quadrant-legend {
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
    &.active {
      & > rect {
        fill: ${color.silver};
      }

      & > text {
        fill: ${color.mineShaft};
      }
    }

    &.not-active {
      transition: opacity ${transition} ${tooltipDelay};
      opacity: 0.25;
    }

    .legend-tooltip {
      transition: opacity ${transition};

      & > rect {
        fill: ${color.mineShaft};
      }

      & > text {
        fill: ${color.white};
      }
    }
  }

  .quadrant {
    circle {
      transition: opacity ${transition};
      opacity: 0;
    }

    &.active {
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

  .blip:hover {
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
  }

   .blip:not(.active):not(.hover-active) {
     pointer-events: none;
   }
   }

  .ring-label {
    fill: ${color.boulder};

    &.active {
      fill: ${color.white};
    }
  }
`;
