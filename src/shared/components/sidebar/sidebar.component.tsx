import React from 'react';

import { List } from '../list';
import { Input } from '../input';
import { RadarTechnology } from '../radar/radar.types';
import { Container, FiltersContainer } from './sidebar.styles';

interface SidebarProps {
  technologies: RadarTechnology[];
  emptyResults: boolean;
}

export const Sidebar = ({ technologies, emptyResults }: SidebarProps) => {
  //TODO display filter tags

  return (
    <Container>
      <Input />
      <FiltersContainer />
      <List technologies={technologies} emptyResults={emptyResults} />
    </Container>
  );
};
