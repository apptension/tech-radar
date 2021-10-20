import React from 'react';

import { List } from '../list';
import { Input } from '../input';
import { Container } from './sidebar.styles';

export const Sidebar = () => {
  return (
    <Container>
      <Input />
      <List />
    </Container>
  );
};
