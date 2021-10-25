import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { ReactComponent as RemoveIconSVG } from '../../../images/icons/remove.svg';
import { color } from '../../../theme';
import { TagLarge, TagMedium, TagSmall } from '../../../theme/typography';
import { TagSize, TagTheme, TagVariant } from './tag.types';

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

const tagVariantDefaultStyles = css`
  color: ${color.mineShaft};
  background: ${color.silver};
`;

const tagVariantDarkStyles = css`
  background-color: ${color.mineShaft};
  color: ${color.boulder};
`;

const tagClickableStyles = css`
  :hover {
    background-color: ${color.white};
  }
`;

export const Container = styled.div<ThemeProps<TagTheme>>`
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${theme('size', {
    [TagSize.SMALL]: tagSizeSmallStyles,
    [TagSize.MEDIUM]: tagSizeMediumStyles,
    [TagSize.LARGE]: tagSizeLargeStyles,
  })};

  ${theme('variant', {
    [TagVariant.DEFAULT]: tagVariantDefaultStyles,
    [TagVariant.DARK]: tagVariantDarkStyles,
  })};

  ${theme('clickable', {
    true: tagClickableStyles,
  })}
`;

const childrenClickableStyles = css`
  max-width: calc(100% - 16px);
`;

export const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${theme('clickable', { true: childrenClickableStyles })}
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
