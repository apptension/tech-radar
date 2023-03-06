import styled, { css } from 'styled-components';
import { mediaQuery } from './media';

import * as colors from './color';
import { fontFamily, fontWeight } from './font';

export const CaptionMedium = css`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 14px;
  line-height: 24px;
`;

export const BodyMedium = css`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 16px;
  line-height: 22px;

  ${mediaQuery.desktop} {
    font-size: 20px;
    line-height: 28px;
  }
`;

export const LabelMedium = css`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 18px;
  line-height: 18px;
`;

export const Title = css`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 32px;
  line-height: 38.4px;

  ${mediaQuery.desktop} {
    font-size: 48px;
    line-height: 48px;
  }
`;

export const H1 = styled.h1`
  ${Title};
  font-weight: ${fontWeight.bold};
  color: ${colors.white};
  margin: 0;
`;

export const H1small = css`
  ${H1};
  font-size: 20px;
  line-height: 28px;
`;

export const H1large = css`
  ${H1};
  font-size: 48px;
  line-height: 61px;
`;

export const Paragraph = styled.p`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 16px;
  line-height: 140%;
  color: ${colors.boulder};
  margin: 0;
  padding: 0;

  ${mediaQuery.desktop} {
    font-size: 20px;
  }
`;

export const ParagraphLarge = styled.p`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 24px;
  line-height: 31px;
  margin: 0;
  padding: 0;
`;

export const Paragraph2 = styled.p`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.normal};
  font-size: 10px;
  line-height: 12px;
  color: ${colors.boulder};
  margin: 0;
  padding: 0;
`;

export const ButtonRegularTypography = css`
  font-weight: ${fontWeight.normal};
  font-size: 16px;
  line-height: 28px;
  text-decoration: none;
`;

export const ButtonLargeTypography = css`
  font-weight: ${fontWeight.normal};
  font-size: 20px;
  line-height: 28px;
  text-decoration: none;
`;

export const tagTypographyStyles = css`
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const TagSmall = css`
  ${tagTypographyStyles};
  font-size: 12px;
  line-height: 12px;
`;

export const TagMedium = css`
  ${tagTypographyStyles};
  font-size: 14px;
  line-height: 14px;
`;

export const TagLarge = css`
  ${tagTypographyStyles};
  font-size: 16px;
  line-height: 16px;

  ${mediaQuery.desktop} {
    font-size: 20px;
    line-height: 20px;
  }
`;
