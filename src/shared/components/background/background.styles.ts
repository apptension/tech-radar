import styled, { css, keyframes } from 'styled-components';
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

export const firstCloudAnimation = keyframes`
  0% {opacity: 0.15;  transform: translate(0, 0)}
  25% {opacity: 0.2; transform: translate(-10px, 0px)}
  50% {opacity: 0.15; transform: translate(-5px, 0px)}
  75% {opacity: 0.1; transform: translate(5px, 0px)}
  100% {opacity: 0.15; transform: translate(0, 0)}
`;

export const secondCloudAnimation = keyframes`
  0% {opacity: 0.1; transform: translate(0, 0)}
  25% {opacity: 0.15; transform: translate(-10px, 0px)}
  50% {opacity: 0.2; transform: translate(-30px, 0px)}
  75% {opacity: 0.15; transform: translate(-15px, 0px)}
  100% {opacity: 0.1;  transform: translate(0, 0)}
`;

const animatedImageStyles = css`
  transform: translate(0, 0);
  animation-name: ${firstCloudAnimation};
  animation-duration: 10s;
  animation-iteration-count: infinite;
`;

export const Image = styled.img<{ animated: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: overlay;
  opacity: 0.15;
  ${(props) => props.animated && animatedImageStyles}
`;

export const MovingImage = styled.img`
  position: absolute;
  left: 50px;
  top: -100px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: overlay;
  opacity: 0.2;
  transform: translate(0, 0);
  animation-name: ${secondCloudAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
`;
