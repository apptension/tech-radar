// @ts-nocheck
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Radar } from '../../shared/components/radar';
import { List } from '../../shared/components/list';
import { Toolbar } from '../../shared/components/toolbar';
import { Logo } from '../../shared/components/logo';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { Container, LogoWrapper, Title, VersionTag } from './explore.styles';
import messages from './explore.messages';

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  return (
    <Container>
      <LogoWrapper>
        <Logo full={false} />
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <VersionTag>
          <FormattedMessage {...messages.version} />
        </VersionTag>
      </LogoWrapper>

      <List />
      <Radar entries={technologies} quadrants={quadrants} rings={rings} />
      <Toolbar />
    </Container>
  );
};
