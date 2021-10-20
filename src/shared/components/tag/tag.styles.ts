import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { ReactComponent as RemoveIconSVG } from '../../../images/icons/remove.svg';
import { color } from '../../../theme';
import { TagLarge, TagMedium, TagSmall } from '../../../theme/typography';
import { TagSize, TagTheme } from './tag.types';

const tagSizeSmallStyles = css`
  ${TagSmall};
  padding: 7px 12px;
`;

const tagSizeMediumStyles = css`
  ${TagMedium};
  padding: 9px 12px;
`;

const tagSizeLargeStyles = css`
  ${TagLarge};
  padding: 7px 16px 11px;
`;

export const Container = styled.div<ThemeProps<TagTheme>>`
  background: ${color.silver};
  border: none;
  border-radius: 20px;
  color: ${color.mineShaft};
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${theme('size', {
    [TagSize.SMALL]: tagSizeSmallStyles,
    [TagSize.MEDIUM]: tagSizeMediumStyles,
    [TagSize.LARGE]: tagSizeLargeStyles,
  })};
`;

const tagIconSizeLargeStyles = css`
  position: relative;
  top: 2px;
`;

export const Icon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${theme('size', {
    [TagSize.LARGE]: tagIconSizeLargeStyles,
  })};
`;

export const RemoveIcon = styled(RemoveIconSVG)``;
