import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../app.constants';
import { Container } from './home.styles';

export const Home = () => {
  return (
    <Container>
      <Link to={ROUTES.explore}>explore</Link>
    </Container>
  );
};
