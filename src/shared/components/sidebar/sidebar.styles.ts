import styled from 'styled-components';

import * as colors from '../../../theme/color';
import { Tag as TagComponent } from '../tag';

export const Container = styled.div`
  padding: 70px 35px;
  color: ${colors.white};
  height: 100%;
  width: 100%;
`;

export const FiltersContainer = styled.div`
  padding: 5px 0;
  height: 87px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const Tag = styled(TagComponent)`
  margin-right: 16px;
`;
