import React from 'react';

import { List } from '../../shared/components/list';
import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { Container, TitleTag, Viewer, Sidebar, Toolbar } from './explore.styles';

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />

      <Sidebar>
        <List />
      </Sidebar>
      <Viewer>
        <Radar technologies={technologies} quadrants={quadrants} rings={rings} />
        <Toolbar />
      </Viewer>
    </Container>
  );
};
