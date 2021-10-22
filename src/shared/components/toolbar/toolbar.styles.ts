import styled from 'styled-components';

import { color } from '../../../theme';
import { Dropdown } from '../dropdown';

export const Container = styled.div`
  background-color: ${color.codGray};
  height: 60px;
  position: fixed;
  bottom: 24px;
  display: flex;

  > div:not(:last-child) {
    border-right: none;
  }
`;

export const AreaDropdown = styled(Dropdown)`
  min-width: 250px;
  border-radius: 2px 0 0 2px;

  &.open-dropdown {
    border-radius: 0 0 0 2px;
  }
`;

export const LevelDropdown = styled(Dropdown)`
  min-width: 200px;
`;

export const TeamDropdown = styled(Dropdown)`
  min-width: 200px;
  border-radius: 0 2px 2px 0;

  &.open-dropdown {
    border-radius: 0 0 2px 0;
  }
`;
