import { css } from 'styled-components';
import { color } from '.';

export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${color.mineShaft};
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${color.silver};
    border-radius: 100px;
  }
`;
