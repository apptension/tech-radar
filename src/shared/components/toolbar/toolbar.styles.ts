import styled from 'styled-components';

import { color, border } from '../../../theme';
import { Dropdown } from '../dropdown';

export const Container = styled.div`
  background-color: ${color.codGray};
  border-radius: 2px;
  height: 60px;
  width: 697px;
  position: fixed;
  bottom: 24px;
  right: 340px;
  display: flex;
`;

export const AreaDropdown = styled(Dropdown)`
  flex: 1;
  width: 260px;
`;

export const LevelDropdown = styled(Dropdown)``;

export const TeamDropdown = styled(Dropdown)``;
