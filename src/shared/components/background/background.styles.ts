import styled from 'styled-components';
import { zIndex } from '../../../theme';

export const Container = styled.div`
  position: absolute;
  top: -160px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.content};
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
