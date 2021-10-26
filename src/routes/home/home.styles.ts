import styled from 'styled-components';

import { H1, Paragraph } from '../../theme/typography';
import { Header as HeaderComponent } from '../../shared/components/header';
import { LastUpdateInfo as LastUpdateInfoComponent } from '../../shared/components/lastUpdateInfo';
import { mediaQuery } from '../../theme/media';
import { zIndex } from '../../theme';
import { Link } from '../../shared/components/link';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
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

export const ExploreLinkContainer = styled.span`
  z-index: ${zIndex.header};
`;

export const RadarContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 0;

  ${mediaQuery.desktop} {
    position: initial;
    bottom: initial;
    max-height: initial;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const Title = styled(H1)``;

export const Description = styled(Paragraph)`
  margin: 24px 24px 36px;
  z-index: ${zIndex.header};

  ${mediaQuery.desktop} {
    margin: 48px 0;
  }
`;

export const LastUpdateInfo = styled(LastUpdateInfoComponent)`
  position: absolute;
  bottom: 24px;
  right: 35px;
`;
