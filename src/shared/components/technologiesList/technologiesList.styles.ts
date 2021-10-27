import styled, { css } from 'styled-components';

import * as colors from '../../../theme/color';
import { Tag as TagComponent } from '../tag';
import { color } from '../../../theme';

export const ListWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const List = styled.ul`
  position: absolute;
  height: calc(100% - 16px);
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ListItem = styled.li`
  margin: 10px 0;
  cursor: default;
  display: flex;
  justify-content: space-between;
`;

export const ListLabel = styled.div`
  height: 26px;
  color: ${colors.boulder};
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export const ListItemTags = styled.div<{ visible: boolean }>`
  display: flex;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  > :last-child {
    margin-right: 8px;
  }
`;

export const Tag = styled(TagComponent)`
  margin-left: 8px;
`;

export const EmptyResults = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  color: ${colors.boulder};
  font-size: 18px;
  margin-top: 16px;
  height: calc(100% - 16px);
`;

const shadowStyles = css`
  position: absolute;
  left: 0;
  width: 100%;
  height: 10%;
  mix-blend-mode: darken;
  pointer-events: none;
`;

export const ShadowBottom = styled.div<{ visible: boolean }>`
  ${shadowStyles};
  bottom: -1px;
  background: ${color.shadowGradientBottom};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

export const ShadowTop = styled.div<{ visible: boolean }>`
  ${shadowStyles};
  top: 15px;
  background: ${color.shadowGradientTop};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
