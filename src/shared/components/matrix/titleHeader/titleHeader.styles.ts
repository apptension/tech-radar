import styled, { css } from 'styled-components';
import { color, fontFamily } from '../../../../theme';
import { H1large, ParagraphLarge } from '../../../../theme/typography';

export const TitleContainer = styled.div`
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  ${H1large};
  line-height: 48px;
  margin: 0 0 16px 0;
`;

export const InfoText = styled(ParagraphLarge)<{ limitedWidth?: boolean }>`
  font-family: ${fontFamily.secondary};
  color: ${color.boulder};
  white-space: pre-wrap;
  ${({ limitedWidth }) =>
    limitedWidth &&
    css`
      max-width: 619px;
    `}
`;
