import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Header } from '../../shared/components/header';
import { Logo } from '../../shared/components/logo';

import RadarImg from '../../images/radar.png';
import { Background } from '../../shared/components/background';
import { ROUTES } from '../app.constants';
import { ButtonIcon, ButtonSize } from '../../shared/components/button/button.types';
import { Link } from '../../shared/components/link';
import messages from './home.messages';
import { Container, Content, Description, Image, LogoWrapper, RadarContent, TextContent, Title } from './home.styles';

export const Home = () => {
  return (
    <Container>
      <Background />
      <Header>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Link to="https://apptension.com" icon={ButtonIcon.OUT}>
          <FormattedMessage {...messages.backToMainPageButton} />
        </Link>
      </Header>
      <Content>
        <TextContent>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Description>
            <FormattedMessage {...messages.description} />
          </Description>
          <Link to={ROUTES.explore} size={ButtonSize.LARGE} icon={ButtonIcon.ARROW}>
            <FormattedMessage {...messages.exploreButton} />
          </Link>
        </TextContent>
        <RadarContent>
          <Image src={RadarImg}></Image>
        </RadarContent>
      </Content>
    </Container>
  );
};
