// @ts-nocheck
import React from 'react';

import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { Container } from './explore.styles';

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  return (
    <Container>
      <Radar entries={technologies} quadrants={quadrants} rings={rings} />
    </Container>
  );
};
