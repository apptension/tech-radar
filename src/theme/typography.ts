import styled, { css } from 'styled-components';

import * as colors from './color';
import { fontFamily, fontWeight } from './font';

export const H1 = styled.h1`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.bold};
  color: ${colors.white};
  font-size: 48px;
  line-height: 48px;
  margin: 0;
`;

export const Paragraph = styled.p`
  font-family: ${fontFamily.primary};
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: ${colors.boulder};
`;

export const ButtonRegularTypography = css`
  font-size: 16px;
  line-height: 28px;
  text-decoration: none;
`;

export const ButtonLargeTypography = css`
  font-size: 20px;
  line-height: 28px;
  text-decoration: none;
`;
