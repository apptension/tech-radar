import styled from 'styled-components';
import { color } from '../../../../theme';

export const Container = styled.div`
  width: 100%;
`;

export const DropzoneContainer = styled.div`
  margin-top: 8px;
  border: 1px solid ${color.darkBorder};
  background-color: ${color.mineShaft2};
  padding: 16px;
  &:hover {
    border: 1px solid ${color.border};
  }
`;

export const AcceptedFilesContainer = styled.ul`
  margin-top: 8px;
`;

export const InfoText = styled.p`
  color: ${color.dustyGray};
`;
