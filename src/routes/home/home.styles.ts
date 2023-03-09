import styled, { css, keyframes } from 'styled-components';

import { Paragraph } from '../../theme/typography';
import { Header as HeaderComponent } from '../../shared/components/header';
import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';
import { LastUpdateInfo as LastUpdateInfoComponent } from '../../shared/components/lastUpdateInfo';
import { mediaQuery } from '../../theme/media';
import { zIndex } from '../../theme';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Header = styled(HeaderComponent)`
  display: flex;
  justify-content: center;

  ${mediaQuery.desktop} {
    justify-content: space-between;
  }
`;

export const LogoWrapper = styled.div`
  height: 50px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-top: 110px;
  max-width: 1500px;
  margin: 0 auto;
`;

export const TextContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 56px;
  text-align: center;
  max-width: 722px;
`;

export const textEnterAnimation = keyframes`
  0% {opacity: 0; }
  100% {opacity: 1; filter: blur(0); transform: translateY(0)}
`;

export const textAnimationStyles = css`
  opacity: 0;
  filter: blur(4px);
  transform: translateY(-25px);
  animation-name: ${textEnterAnimation};
  animation-duration: 2.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  z-index: ${zIndex.contentOverlay};
`;

export const TitleTag = styled(TitleTagComponent)`
  ${textAnimationStyles}
`;

export const Description = styled(Paragraph)`
  z-index: ${zIndex.header};
  animation-delay: 0.23s;
  margin: 24px 24px 36px;
  ${textAnimationStyles}

  ${mediaQuery.desktop} {
    margin: 48px 0;
  }
`;

export const ExploreLinkContainer = styled.span`
  z-index: ${zIndex.header};
  animation-delay: 0.7s;
  ${textAnimationStyles}
`;

const radarContentStyles = css`
  flex: 1;
  display: flex;
  justify-content: center;
  position: absolute;
`;

export const RadarAnimationContainer = styled.div`
  align-items: flex-end;
  bottom: 0;
  ${radarContentStyles}
`;

export const RadarContent = styled.div`
  align-items: flex-end;
  max-width: 80vw;
  bottom: -150px;
  ${radarContentStyles}
`;

export const MobileRadarContent = styled.div<{ moveImageBy: number }>`
  align-items: flex-start;
  bottom: ${(props) => props.moveImageBy}px;
  max-height: 60%;
  ${radarContentStyles}
`;

export const Image = styled.img`
  width: 100vw;
  object-fit: contain;

  ${mediaQuery.desktop} {
    width: 100%;
  }
`;

export const LastUpdateInfo = styled(LastUpdateInfoComponent)`
  position: absolute;
  bottom: 24px;
  right: 35px;
`;
