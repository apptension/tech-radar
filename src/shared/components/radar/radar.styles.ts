import styled from 'styled-components';
import { color } from '../../../theme';

export const SVG = styled.svg`
  .quadrant {
    circle {
      transition: opacity 300ms linear;
      opacity: 0;
    }

    rect {
      transition: fill 300ms linear;
      fill: ${color.mineShaft};
    }

    text {
      transition: fill 300ms linear;
      fill: ${color.scorpion};
    }

    &:hover {
      circle {
        opacity: 0.5;
      }

      rect {
        fill: ${color.silver};
      }

      text {
        fill: ${color.mineShaft};
      }
    }

    &.active {
      circle {
        opacity: 1;
      }

      rect {
        fill: ${color.silver};
      }

      text {
        fill: ${color.mineShaft};
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
