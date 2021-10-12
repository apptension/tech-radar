// @ts-nocheck
import React from 'react';

import { Radar } from '../../shared/components/radar';
import { List } from '../../shared/components/list';
import { Toolbar } from '../../shared/components/toolbar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { Container } from './explore.styles';

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  return (
    <Container>
      <List />
      <Radar entries={technologies} quadrants={quadrants} rings={rings} />
      <Toolbar />
    </Container>
  );
};
