import styled, { css } from 'styled-components';
import theme from 'styled-theming';

import { ReactComponent as ChevronIconSVG } from '../../../images/icons/chevron-up.svg';
import { ReactComponent as RemoveIconSVG } from '../../../images/icons/remove.svg';
import { BodyMedium, LabelMedium } from '../../../theme/typography';
import { Tag as TagComponent } from '../tag';
import { border, color } from '../../../theme';

export const LABEL_HEIGHT = 26;
export const LABEL_BOTTOM_MARGIN = 12;
export const LIST_TOP_PADDING = 24;
export const LIST_BOTTOM_PADDING = 32;

export const Container = styled.div`
  height: 58px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 190px;
  position: relative;
  background: ${color.codGray};
  border: ${border.boldWhite};

  div {
    display: flex;
    align-items: center;
  }
`;

export const Label = styled.label`
  ${BodyMedium};
`;

export const Tag = styled(TagComponent)`
  margin-left: 16px;
`;

const chevronOpenStyle = css`
  transform: rotate(180deg);
`;

export const ChevronIcon = styled(ChevronIconSVG)`
  transition: transform 0.3s ease-in-out;

  ${theme('open', {
    true: chevronOpenStyle,
  })};
`;

export const ToggleButton = styled.button.attrs({ type: 'button' })`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const optionsOpenStyle = css`
  max-height: 100vh;
  transition: max-height 0s ease-in-out;
`;

export const OptionsContainer = styled.div<{ height: number }>`
  position: absolute;
  left: -2px;
  width: calc(100% + 4px);
  bottom: calc(100% + 2px);
  transition: max-height 0.3s ease-in-out;
  max-height: 0;
  height: ${({ height }) => (height ? height : 250)}px;
  overflow: hidden;

  ${theme('open', {
    true: optionsOpenStyle,
  })};
`;

const OptionsListOpenStyle = css`
  transform: translateY(0);
`;

export const Options = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border: ${border.boldWhite};
  border-bottom: none;
  background: ${color.codGray};
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  ${theme('open', {
    true: OptionsListOpenStyle,
  })};
`;

export const OptionsContent = styled.ul`
  width: 100%;
  height: 100%;
  padding: 24px 24px 32px 40px;
  margin: 0;
  list-style: none;
`;

export const Option = styled.li<{ active: boolean }>`
  height: 26px;
  display: flex;
  align-items: center;
  ${LabelMedium};
  color: ${({ active }) => (active ? color.white : color.boulder)};
  margin-bottom: 12px;
  cursor: pointer;

  span {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }

  &:hover {
    color: ${color.white};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Icon = styled.span`
  margin-left: 16px;
  display: flex;
  cursor: pointer;
  position: relative;
  top: 1px;
`;

export const RemoveIcon = styled(RemoveIconSVG)`
  line {
    stroke: ${color.white};
  }
`;
