import styled from 'styled-components';
import { color } from '../../../../../theme';

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0;
  margin-bottom: 32px;
`;

export const StyledTag = styled.div<{ isActive: boolean; isStatic: boolean }>`
  background-color: ${({ isActive }) => (isActive ? color.white : color.codGray)};
  border-radius: 28px;
  border: 3px solid;
  border-color: ${({ isActive }) => !isActive && 'transparent'};
  padding: 6px 12px 8px;
  font-size: 12px;
  line-height: 12px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: ${color.boulder};
  cursor: ${({ isStatic }) => !isStatic && 'pointer'};
  user-select: ${({ isStatic }) => isStatic && 'none'};
  > span {
    color: ${({ isActive }) => (isActive ? color.black : color.boulder)};
  }
`;
