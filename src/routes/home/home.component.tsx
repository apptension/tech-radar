import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Logo } from '../../shared/components/logo';
import RadarImg from '../../images/radar.png';
import RadarMobileImg from '../../images/radar-mobile.png';
import { Background } from '../../shared/components/background';
import { RadarHomeAnimation } from '../../shared/components/radarHomeAnimation';
import { ROUTES } from '../app.constants';
import { ButtonIcon, ButtonSize, ButtonVariant } from '../../shared/components/button/button.types';
import { Link } from '../../shared/components/link';
import { useLastContentfulUpdate } from '../../shared/hooks/useContentfulData/useContentfulData';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { Breakpoint } from '../../theme/media';
import messages from './home.messages';
import {
  Container,
  Content,
  Description,
  ExploreLinkContainer,
  Header,
  Image,
  LastUpdateInfo,
  LogoWrapper,
  RadarContent,
  MobileRadarContent,
  RadarAnimationContainer,
  TextContent,
  TitleTag,
  ButtonsContainer,
} from './home.styles';

export const Home = () => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const { matches: isTablet } = useMediaQuery({ above: Breakpoint.TABLET });
  const lastContentfulUpdate = useLastContentfulUpdate();

  const renderRadarContent = () => {
    if (isDesktop)
      return (
        <RadarAnimationContainer>
          <RadarHomeAnimation />
        </RadarAnimationContainer>
      );
    if (isTablet)
      return (
        <RadarContent>
          <Image src={RadarImg} />
        </RadarContent>
      );
    return (
      <MobileRadarContent moveImageBy={-20}>
        <Image src={RadarMobileImg} />
      </MobileRadarContent>
    );
  };

  return (
    <Container>
      <Background />
      <Header>
        <LogoWrapper>
          {isDesktop ? (
            <Logo />
          ) : (
            <Link to="https://apptension.com" withBorder={false}>
              <Logo full={false} />
            </Link>
          )}
        </LogoWrapper>
        {isDesktop && (
          <ButtonsContainer>
            <Link to="https://apptension.com/get-in-touch" variant={ButtonVariant.PRIMARY}>
              <FormattedMessage {...messages.getInTouchButton} />
            </Link>
            <Link to="https://apptension.com" icon={ButtonIcon.OUT}>
              <FormattedMessage {...messages.goToMainPageButton} />
            </Link>
          </ButtonsContainer>
        )}
      </Header>
      <Content>
        <TextContent>
          <TitleTag />
          <Description>
            <FormattedMessage {...messages.description} />
          </Description>
          <ExploreLinkContainer>
            <Link to={ROUTES.explore} size={isDesktop ? ButtonSize.LARGE : ButtonSize.REGULAR} icon={ButtonIcon.ARROW}>
              <FormattedMessage {...messages.exploreButton} />
            </Link>
          </ExploreLinkContainer>
        </TextContent>
        {renderRadarContent()}
      </Content>
      {!!lastContentfulUpdate && isDesktop && <LastUpdateInfo date={lastContentfulUpdate} />}
    </Container>
  );
};
