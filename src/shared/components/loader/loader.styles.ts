import styled from 'styled-components';
import { color, zIndex } from '../../../theme';

export const Container = styled.div``;

export const FullPageContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.overlay};
  background-color: ${color.codGray};
`;
