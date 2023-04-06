import styled from 'styled-components';
import { ReactComponent as ArrowRight } from '../../../../images/icons/arrow-right.svg';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 40px;
`;

export const ArrowRightIcon = styled(ArrowRight)`
  margin-left: 10px;
  path {
    stroke: #000000;
  }
`;
