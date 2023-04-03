import styled from 'styled-components';

export const DraggableContainer = styled.div<{ isHidden: boolean }>`
  ${({ isHidden }) => isHidden && `visibility: hidden`}
`;

export const DroppableContainer = styled.div`
  width: 100%;
`;
