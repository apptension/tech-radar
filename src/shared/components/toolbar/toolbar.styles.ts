import styled from 'styled-components';

import { color } from '../../../theme';
import { Dropdown } from '../dropdown';
import { mediaQuery } from '../../../theme/media';

export const Container = styled.div`
  background-color: ${color.codGray};
  height: 60px;
  position: initial;
  bottom: initial;
  display: flex;

  > div:not(:last-child) {
    border-right: none;
  }

  ${mediaQuery.desktop} {
    position: fixed;
    bottom: 24px;
  }
`;

export const ToolbarDropdown = styled(Dropdown)`
  .options-container {
    min-width: calc(100vw - 50px);

    ${mediaQuery.tablet} {
      min-width: initial;
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
    min-width: 250px;
  }
`;

export const LevelDropdown = styled(ToolbarDropdown)`
  min-width: calc(100% / 3);

  ${mediaQuery.desktop} {
    min-width: 200px;
  }

  .options-container {
    margin-left: calc(-100% - 2px);

    ${mediaQuery.tablet} {
      margin-left: initial;
    }
  }
`;

export const TeamDropdown = styled(ToolbarDropdown)`
  min-width: calc(100% / 3);
  border-radius: 0 2px 2px 0;

  &.open-dropdown {
    border-radius: 0 0 2px 0;
  }

  ${mediaQuery.desktop} {
    min-width: 200px;
  }

  .options-container {
    margin-left: calc(-200% - 8px);

    ${mediaQuery.tablet} {
      margin-left: initial;
    }
  }
`;
