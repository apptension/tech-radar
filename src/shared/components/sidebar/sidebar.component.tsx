import React from 'react';

import { List } from '../list';
import { Input } from '../input';
import { RadarTechnology } from '../radar/radar.types';
import { Container, FiltersContainer } from './sidebar.styles';

interface SidebarProps {
  technologies: RadarTechnology[];
  filters?: string[];
  setSearchText: (text: string) => void;
}

export const Sidebar = ({ technologies, filters, setSearchText }: SidebarProps) => {
  return (
    <Container>
      <Input setSearchText={setSearchText} />
      <FiltersContainer />
      <List technologies={technologies} />
    </Container>
  );
};
