import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Header } from '../../shared/components/header';
import { Logo } from '../../shared/components/logo';

import RadarImg from '../../images/radar.png';
import { Button } from '../../shared/components/button';
import { Background } from '../../shared/components/background';
import { ROUTES } from '../app.constants';
import messages from './home.messages';
import { Container, LogoWrapper, Content, TextContent, RadarContent, Image, Title, Description } from './home.styles';

export const Home = () => {
  return (
    <Container>
      <Background />
      <Header>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Button>
          <FormattedMessage {...messages.backToMainPageButton} />
        </Button>
      </Header>
      <Content>
        <TextContent>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Description>
            <FormattedMessage {...messages.description} />
          </Description>
          <Button link={ROUTES.explore}>
            <FormattedMessage {...messages.exploreButton} />
          </Button>
        </TextContent>
        <RadarContent>
          <Image src={RadarImg}></Image>
        </RadarContent>
      </Content>
    </Container>
  );
};
