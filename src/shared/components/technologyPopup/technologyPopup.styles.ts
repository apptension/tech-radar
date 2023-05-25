import styled, { css } from 'styled-components';
import { color, scrollbar, zIndex } from '../../../theme';
import { mediaQuery } from '../../../theme/media';
import { transition } from '../../utils/constants';
import { ReactComponent as ChevronDownIcon } from '../../../images/icons/chevron-down.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${scrollbar.customScrollbar};
  background-color: ${color.mineShaft2};
  position: relative;
  z-index: ${zIndex.header};
  padding: 20px;
  width: calc(100vw - 20px);
  height: calc(100vh - 140px);
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 20px;
  max-height: 100%;
  ${mediaQuery.tablet} {
    width: 50vw;
  }

  ${mediaQuery.desktop} {
    padding-bottom: 20px;
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 0px;
  }
`;

export const Head = styled.div``;
export const Body = styled.div`
  overflow-y: auto;
  margin-right: -20px;
  padding-right: 20px;
  max-height: calc(100% - 78px);
  height: fit-content;
  ${mediaQuery.desktop} {
    max-height: 100%;
  }
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const Title = styled.h3`
  font-size: 26px;
  line-height: 34px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin: 0 0 32px 0;
  min-height: 46px;
`;

export const BlockWrapper = styled.div`
  margin: 32px 0;
`;

export const TagsWrapper = styled(BlockWrapper)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0;
`;

export const Tag = styled.div`
  background-color: ${color.codGray};
  border-radius: 28px;
  padding: 6px 12px 8px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 12px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: ${color.boulder};
`;

export const TechnologyIcon = styled.img`
  max-width: 46px;
  margin-left: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${color.silver};
  padding-right: 28px;
  margin-bottom: 24px;
  margin-top: 0;
`;

const blockStyles = css`
  background-color: ${color.mineShaft};
  border: 2px solid ${color.mineShaft};
  padding: 18px 0 26px;
  text-align: center;
  border-radius: 8px;
  color: ${color.dustyGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: background-color ${transition};
`;

export const Block = styled.div`
  display: flex;
  ${blockStyles};
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  padding: 16px 10px;
`;

export const GetInTouchBlock = styled(Block)`
  text-align: left;
  justify-content: flex-start;
  color: ${color.white};
  padding: 0;
  background-color: transparent;
  border: none;
`;

export const GetInTouchContainer = styled(BlockWrapper)`
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 10px;
`;

export const BlockExpert = styled.h2`
  font-size: 20px;
  line-height: 29px;
  font-weight: 500;
  color: ${color.white};
  width: auto;
  margin: 0;
  padding-right: 0;
  margin-right: 10px;
`;

export const AlternativesWrapper = styled(Block)`
  display: flex;
  flex-direction: column;
  color: ${color.dustyGray};
`;

export const AlternativesHeader = styled.h3`
  font-size: 20px;
  line-height: 19px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.9px;
`;

export const AlternativesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
  padding-left: 0;
  list-style: none;
`;

export const AlternativeItemIcon = styled.img`
  width: 45px;
`;

export const AlternativeItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 80px;
  cursor: pointer;
  padding: 5px;
  border-radius: 10px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${color.mineShaft2};
  }
`;

export const AlternativeItemLabel = styled.p`
  margin: 0;
  user-select: none;
`;
