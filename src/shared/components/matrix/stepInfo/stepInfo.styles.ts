import styled, { css } from 'styled-components';
import { color, fontFamily } from '../../../../theme';
import { H1large, ParagraphLarge } from '../../../../theme/typography';

export const Header = styled.header`
  margin-bottom: 80px;
  display: flex;
  max-width: 1000px;
`;

export const FinalStepHeader = styled(Header)`
  flex-direction: column;
`;

export const FinalStepProgressContainer = styled.div`
  display: flex;
`;

export const TitleContainer = styled.div``;

export const FormProgressWrapper = styled.div`
  margin-right: 30px;
`;

export const Title = styled.h1`
  ${H1large};
  line-height: 48px;
  margin: 0 0 16px 0;
`;

export const FinalStepTitle = styled(Title)`
  margin-bottom: 40px;
  line-height: 61px;
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
