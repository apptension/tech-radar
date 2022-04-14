import styled, { css } from 'styled-components';
import { color } from '../../../theme';
import { mediaQuery } from '../../../theme/media';
import { transition } from '../../utils/constants';

export const Container = styled.div`
  background-color: ${color.mineShaft2};
  position: relative;
  padding: 24px 20px 109px;
  overflow: auto;
  width: 100vw;
  height: calc(100vh - 120px);
  border-radius: 24px 24px 0 0;
  margin: 0 auto;

  ${mediaQuery.tablet} {
    width: 50vw;
  }

  ${mediaQuery.desktop} {
    padding-bottom: 20px;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: 31px;
  right: 31px;
  cursor: pointer;
`;

export const Title = styled.h3`
  font-size: 26px;
  line-height: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin: 26px 0 0;
`;

export const TagsWrapper = styled.div`
  display: flex;
`;

export const Tag = styled.div`
  background-color: ${color.codGray};
  border-radius: 28px;
  padding: 6px 12px 8px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 12px;
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
  margin: 14px 0 0;
  padding-right: 28px;
`;

export const Link = styled.a`
  color: ${color.white};
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  text-decoration: none;
  padding-left: 12px;

  & > span {
    opacity: 1;
    padding-bottom: 1px;
    border-bottom: 1px solid transparent;
    transition: border ${transition}, opacity ${transition};
  }

  &:hover {
    span {
      border-bottom: 1px solid ${color.white};
    }
  }

  &:first-child {
    padding-left: 0;
  }

  &:not(:last-child):after {
    transition: opacity ${transition};
    content: '|';
    padding-left: 12px;
  }
`;

export const LinksWrapper = styled.div`
  display: inline-flex;
  margin-top: 40px;

  &:hover {
    ${Link} span {
      opacity: 0.5;
    }
    ${Link}:after {
      opacity: 0.5;
    }
  }

  ${Link}:hover span {
    opacity: 1;
  }
`;

export const BlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 40px;
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
  ${blockStyles};
`;

export const BlockButton = styled.button<{ isClickAble: boolean }>`
  margin: 0;
  border: none;
  cursor: ${({ isClickAble }) => (isClickAble ? 'pointer' : 'none')};
  pointer-events: ${({ isClickAble }) => (isClickAble ? 'auto' : 'none')};
  ${blockStyles};

  &:hover {
    background-color: ${({ isClickAble }) => (isClickAble ? `${color.codGray2}` : `${color.mineShaft}`)};
  }
`;

export const BlockTitle = styled.h4`
  margin: 0 0 14px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
`;

export const BlockIcon = styled.img`
  max-width: 45px;
  max-height: 40px;
  margin: 14px 0 13px;
`;

export const BlockLabel = styled.p`
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 12px 0 0;
`;

export const BlockExpert = styled.h2`
  margin: 14px 0 33px 0;
  font-size: 46px;
  line-height: 46px;
  letter-spacing: 3.3px;
  font-weight: 500;
  color: ${color.white};
`;
