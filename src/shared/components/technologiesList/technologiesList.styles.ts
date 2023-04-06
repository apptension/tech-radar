import styled, { css } from 'styled-components';

import { color, fontWeight, zIndex } from '../../../theme';
import { H1small } from '../../../theme/typography';
import { customScrollbar } from '../../../theme/scrollbar';

export const ListWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`;

export const List = styled.div`
  ${customScrollbar};
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0;
  margin: 16px 0 0;
  margin-bottom: 42px;
  list-style: none;

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${color.mineShaft2};
  }
`;

export const ResultsTextInfo = styled.span`
  ${H1small};
  margin: 18px 0 28px 0;
  font-weight: ${fontWeight.bold};
  color: ${color.white};
  z-index: ${zIndex.header};
`;

export const EmptyResults = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  color: ${color.boulder};
  font-size: 18px;
  margin-top: 16px;
  height: calc(100% - 16px);
`;

const shadowStyles = css`
  position: absolute;
  left: 0;
  width: calc(100% - 5px);
  height: 10%;
  mix-blend-mode: darken;
  pointer-events: none;
`;

export const ShadowBottom = styled.div<{ visible: boolean }>`
  ${shadowStyles};
  bottom: 42px;
  background: ${color.shadowGradientBottom};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

export const ShadowTop = styled.div<{ visible: boolean }>`
  ${shadowStyles};
  top: 35px;
  background: ${color.shadowGradientTop};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
