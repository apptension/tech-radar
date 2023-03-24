import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { color } from '../../../../../theme';
import { TagSmall } from '../../../../../theme/typography';

export const Container = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  border-radius: 2px;
  background-color: ${color.white};
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

export const Option = styled.li`
  width: 100%;
`;

export const OptionIconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const OptionText = styled.span`
  ${TagSmall};
  color: ${color.codGray};
  letter-spacing: 0.08em;
  text-transform: none;
  line-height: 18px;
`;

const optionActionCommonStyles = css`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 9px 12px;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  ${optionActionCommonStyles};
`;

export const OptionButton = styled.button`
  ${optionActionCommonStyles};
  width: 100%;
  border: none;
  background: transparent;
`;
