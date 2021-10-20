import styled from 'styled-components';

import * as colors from '../../../theme/color';

export const ListWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  height: 850px;
  max-height: 100%;
  overflow: auto;
`;

export const ListItem = styled.div`
  color: ${colors.boulder};
  font-size: 18px;
  margin: 10px 0;
  cursor: default;
`;
