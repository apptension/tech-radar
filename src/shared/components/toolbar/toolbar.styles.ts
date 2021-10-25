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

export const AreaDropdown = styled(Dropdown)`
  min-width: 100px;
  border-radius: 2px 0 0 2px;

  &.open-dropdown {
    border-radius: 0 0 0 2px;
  }

  ${mediaQuery.desktop} {
    min-width: 250px;
  }
`;

export const LevelDropdown = styled(Dropdown)`
  min-width: 100px;

  ${mediaQuery.desktop} {
    min-width: 200px;
  }
`;

export const TeamDropdown = styled(Dropdown)`
  min-width: 100px;
  border-radius: 0 2px 2px 0;

  &.open-dropdown {
    border-radius: 0 0 2px 0;
  }

  ${mediaQuery.desktop} {
    min-width: 200px;
  }
`;
