import React from 'react';

import { Radar } from '../../shared/components/radar';
import { List } from '../../shared/components/list';
import { Toolbar } from '../../shared/components/toolbar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { Container, TitleTag } from './explore.styles';

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />

      <List />
      <Radar technologies={technologies} quadrants={quadrants} rings={rings} />
      <Toolbar />
    </Container>
  );
};
