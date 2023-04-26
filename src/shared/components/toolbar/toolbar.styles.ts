import styled from 'styled-components';

import { color } from '../../../theme';
import { Dropdown } from '../dropdown';
import { mediaQuery } from '../../../theme/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${color.codGray};
  width: 100%;
  margin-top: 32px;
`;

export const ToolbarDropdown = styled(Dropdown)`
  .options-container {
    z-index: 12;
    top: calc(100% + 2px);
    bottom: unset;
    transition: none;
    > div {
      border-bottom: 2px solid ${color.white};
      border-top: none;
      transform: none;
    }
  }
`;

export const AreaDropdown = styled(ToolbarDropdown)`
  min-width: calc(100% / 3);
  border-radius: 2px 0 0 2px;

  &.open-dropdown {
    border-radius: 0 0 0 2px;
  }

  ${mediaQuery.desktop} {
    min-width: 300px;
  }
`;

export const TeamDropdown = styled(ToolbarDropdown)`
  min-width: calc(100% / 3);
  border-radius: 0 2px 2px 0;

  &.open-dropdown {
    border-radius: 0 0 2px 0;
  }
`;
