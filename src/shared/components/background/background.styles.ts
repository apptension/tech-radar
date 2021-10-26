import styled from 'styled-components';
import { zIndex } from '../../../theme';
import { mediaQuery } from '../../../theme/media';

export const Container = styled.div`
  position: absolute;
  top: -130px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.content};

  ${mediaQuery.desktop} {
    top: -160px;
  }
`;

export const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: overlay;
  opacity: 0.15;
  filter: blur(16px);
`;
