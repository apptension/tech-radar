import styled from 'styled-components';

import { ReactComponent as ChevronIconSVG } from '../../../images/icons/chevron-up.svg';

export const Container = styled.div`
  height: 58px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 190px;
`;

export const ChevronIcon = styled(ChevronIconSVG)`
  height: 100%;
`;
