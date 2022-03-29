import styled from 'styled-components';
import { color } from '../../../theme';

export const SVG = styled.svg`
  overflow: visible;

  .quadrant-legend {
    rect {
      transition: fill 300ms linear;
      fill: ${color.mineShaft};
    }

    text {
      transition: fill 300ms linear;
      fill: ${color.scorpion};
    }


    &.active {
      rect {
        fill: ${color.silver};
      }

      text {
        fill: ${color.mineShaft};
      }
    }
  }

  .quadrant {
    circle {
      transition: opacity 300ms linear;
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
