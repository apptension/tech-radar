import styled from 'styled-components';
import { color } from '../../../theme';
import { ReactComponent as PatternSVG } from '../../../images/matrix-pattern.svg';
import { Button } from '../../../shared/components/button';
import { H1large, ParagraphLarge } from '../../../theme/typography';

export const MainContainer = styled.div`
  background-color: ${color};
  height: 1px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 74px;
  padding-left: 48px;
  max-width: 1980px;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: absolute;
  padding-top: 32px;
  padding-right: 36px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const LogoContainer = styled.div`
  position: fixed;
  top: 32px;
  left: 0;
  right: 0;
`;

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  max-width: 680px;
  min-width: 420px;
  flex-shrink: 2;
  justify-self: center;
  margin-left: auto;
`;

export const Title = styled.h1`
  ${H1large};
  margin-bottom: 40px;
`;

export const InfoText = styled(ParagraphLarge)`
  color: ${color.boulder};
`;

export const LoginButton = styled(Button)`
  position: relative;
  z-index: 1;
  margin-top: 80px;
`;

export const PhotoContainer = styled.div`
  margin-left: auto;
`;

export const Photo = styled.img`
  max-width: 100%;
`;

export const PatternContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const InfoSpacer = styled.div`
  margin-top: 24px;
`;

export const Pattern = styled(PatternSVG)`
  width: 100%;
`;
