import styled from 'styled-components';

import { color, border } from '../../../theme';
import { Dropdown } from '../dropdown';

export const Container = styled.div`
  background-color: ${color.codGray};
  border: ${border.regularWhite};
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
  border-right: ${border.regularWhite};
`;

export const LevelDropdown = styled(Dropdown)`
  border-right: ${border.regularWhite};
`;

export const TeamDropdown = styled(Dropdown)``;
