import styled from 'styled-components';
import { color } from '../../../theme';

export const StyledTable = styled.table`
  display: block;
  max-height: 85vh;
  overflow: auto;
`;

export const TableBodyRow = styled.tr`
  position: relative;
`;

export const TableSaveCell = styled.td`
  position: sticky;
  right: 0;
  padding: 0 16px;
  background-color: ${color.codGray};
`;
