import styled from 'styled-components';
import { ReactComponent as ChevronDownSVG } from '../../../../images/icons/chevron-down.svg';
import { color, zIndex } from '../../../../theme';
import { LabelMedium } from '../../../../theme/typography';

export const HeaderButton = styled.button<{ increasedZindex?: boolean }>`
  ${LabelMedium};
  position: sticky;
  z-index: ${({ increasedZindex }) => (increasedZindex ? zIndex.overlay : zIndex.header)};
  top: 0;
  width: 100%;
  border: none;
  background-color: ${color.codGray};
  color: ${color.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
`;

export const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &:last-child {
    margin-bottom: 24px;
  }
`;

export const ChevronIcon = styled(ChevronDownSVG)<{ reversed: boolean }>`
  ${({ reversed }) => reversed && `transform: rotate(180deg)`}
`;
