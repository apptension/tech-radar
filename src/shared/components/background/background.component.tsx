import React from 'react';

import CloudsImg from '../../../images/clouds.png';
import { Container, Image } from './background.styles';

export const Background = () => {
  return (
    <Container>
      <Image src={CloudsImg} />
    </Container>
  );
};
