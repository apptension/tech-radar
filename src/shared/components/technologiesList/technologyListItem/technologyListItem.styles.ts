import styled from 'styled-components';
import { color } from '../../../../theme';
import { Tag as TagComponent } from '../../tag';

export const ListItem = styled.li<{ showTechnology: boolean }>`
  margin: 6px 0;
  justify-content: space-between;
  display: ${({ showTechnology }) => (showTechnology ? 'flex' : 'none')};
`;

export const ListLabel = styled.div<{ showPointer: boolean }>`
  color: ${color.boulder};
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: ${({ showPointer }) => (showPointer ? 'pointer' : 'default')};
  flex-grow: 1;
`;

export const ListItemTags = styled.div<{ visible: boolean }>`
  display: flex;
  height: 26px;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'initial' : 'none')};
  > :last-child {
    margin-right: 8px;
  }
`;

export const Tag = styled(TagComponent)`
  margin-left: 8px;
`;
