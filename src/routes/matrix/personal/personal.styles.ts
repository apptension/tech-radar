import styled from 'styled-components';
import { color } from '../../../theme';
import { H1large, ParagraphLarge } from '../../../theme/typography';
import { ReactComponent as PatternSVG } from '../../../images/matrix-form-pattern.svg';

export const MainContainer = styled.div`
  background-color: ${color};
  height: 1px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 129px;
`;

export const Header = styled.header`
  margin-bottom: 80px;
`;

export const Title = styled.h1`
  ${H1large};
  margin: 0 0 16px 0;
`;

export const InfoText = styled(ParagraphLarge)`
  color: ${color.boulder};
`;

export const PatternContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const Pattern = styled(PatternSVG)`
  width: 100%;
`;
