import styled from 'styled-components';

import * as colors from '../../../theme/color';
import { Tag as TagComponent } from '../tag';

export const ListWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  margin-top: 16px;
`;

export const ListItem = styled.div`
  margin: 10px 0;
  cursor: default;
  display: flex;
  justify-content: space-between;
`;

export const ListLabel = styled.div`
  height: 26px;
  color: ${colors.boulder};
  font-size: 18px;
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
  color: ${colors.boulder};
  font-size: 18px;
  margin-top: 16px;
`;
