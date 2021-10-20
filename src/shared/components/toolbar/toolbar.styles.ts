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
  min-width: 300px;
`;

export const LevelDropdown = styled(Dropdown)`
  min-width: 200px;
`;

export const TeamDropdown = styled(Dropdown)`
  min-width: 200px;
`;
