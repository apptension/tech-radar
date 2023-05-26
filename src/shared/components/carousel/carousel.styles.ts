import styled from 'styled-components';
import { color } from '../../../theme';
import { mediaQuery } from '../../../theme/media';
import { H1small, LabelMedium, Paragraph } from '../../../theme/typography';
import { ReactComponent as ArrowRight } from '../../../images/icons/arrow-right.svg';

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const HeaderLabel = styled.p`
  ${LabelMedium};
  padding: 0 6px;
`;

export const Frame = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const CardLink = styled.a`
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: ${color.white};
`;

export const BoxContainer = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ disabled }) => (disabled ? 'transparent' : color.white)};
  width: 22px;
  padding: 0;
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  transition: color 0.2s ease;
`;

export const ThumbnailContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;
  height: 175px;
`;

export const Thumbnail = styled.img`
  width: 100%;
`;

export const Title = styled.h3`
  ${H1small};
  margin: 8px 0;
`;

export const Description = styled(Paragraph)`
  line-height: 20px;
  color: ${color.silver};
  ${mediaQuery.desktop} {
    font-size: 16px;
  }
`;

export const ArrowLeft = styled(ArrowRight)`
  transform: scaleX(-1);
`;
