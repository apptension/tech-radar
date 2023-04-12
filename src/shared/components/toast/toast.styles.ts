import styled from 'styled-components';
import { color } from '../../../theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  background: ${color.mineShaft};
  padding: 16px 20px;
  border-radius: 8px;
  width: 336px;
  max-width: 100%;
  min-height: 74px;
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    height: 100%;
    width: 6px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ color }) => color};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
  svg line {
    stroke-width: 3;
  }
`;

export const IconContainer = styled.div`
  color: ${color.white};
`;
export const Body = styled.div`
  flex: 1;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 19px;
  margin: 0;
  color: ${color.brightGray};
`;

export const Title = styled(Paragraph)`
  color: ${color.white};
  font-weight: bold;
  margin-bottom: 4px;
`;
