import styled from 'styled-components';
import { color } from '../../../../theme';
import { FIELD_HEIGHT } from '../fields.constants';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  height: ${FIELD_HEIGHT};
  background-color: ${color.mineShaft2};
  padding: 8px 16px;
  color: ${color.white};
  border: 1px solid ${color.darkBorder} !important;
  &:hover {
    border: 1px solid ${color.border} !important;
  }
`;
