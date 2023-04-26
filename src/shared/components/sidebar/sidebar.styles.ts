import styled from 'styled-components';

import * as colors from '../../../theme/color';
import { mediaQuery } from '../../../theme/media';
import { Tag as TagComponent } from '../tag';

export const Container = styled.div<{ noPadding: boolean }>`
  padding: ${({ noPadding }) => (noPadding ? '120px 0 0' : '120px 25px 10px')};
  color: ${colors.white};
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  ${mediaQuery.desktop} {
    padding: 38px 35px 25px;
  }
`;

export const Tag = styled(TagComponent)`
  margin-right: 16px;
  margin-bottom: 10px;
`;
