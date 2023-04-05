import styled from 'styled-components';
import { zIndex } from '../../../theme';

export const Container = styled.aside`
  position: absolute;
  bottom: 24px;
  right: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: ${zIndex.overlay};
`;

export const SocialMediaLink = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noreferrer',
}))`
  &:hover svg path {
    fill: url(#link-hover-gradient);
  }
`;

export const SvgGradient = styled.svg`
  width: 0;
  height: 0;
  position: absolute;
`;
