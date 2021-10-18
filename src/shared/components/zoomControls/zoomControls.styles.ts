import styled from 'styled-components';

import { ReactComponent as PlusIconSVG } from '../../../images/icons/plus.svg';
import { ReactComponent as MinusIconSVG } from '../../../images/icons/minus.svg';

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const ZoomButton = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: none;

  &:first-of-type {
    margin-bottom: 8px;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const PlusIcon = styled(PlusIconSVG)``;
export const MinusIcon = styled(MinusIconSVG)``;
