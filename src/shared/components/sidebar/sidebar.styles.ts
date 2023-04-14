import styled from 'styled-components';
import { zIndex } from '../../../theme';

import * as colors from '../../../theme/color';
import { mediaQuery } from '../../../theme/media';
import { Tag as TagComponent } from '../tag';
import { Toolbar as ToolbarComponent } from '../toolbar';

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

export const FiltersContainer = styled.div`
  padding: 5px 0;
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  order: 2;
  margin-top: 35px;

  ${mediaQuery.desktop} {
    order: 0;
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const Tag = styled(TagComponent)`
  margin-right: 16px;
  margin-bottom: 10px;
`;

export const Toolbar = styled(ToolbarComponent)`
  max-width: 100%;
  order: 3;
  margin-top: 12px;
  margin-bottom: 50px;
  z-index: ${zIndex.overlay};

  ${mediaQuery.desktop} {
    margin-top: 0;
  }
`;
