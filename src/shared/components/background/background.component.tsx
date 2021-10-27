import React from 'react';

import CloudsImg from '../../../images/clouds.png';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Breakpoint } from '../../../theme/media';
import { Container, Image, MovingImage } from './background.styles';

export const Background = () => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  return (
    <Container>
      <Image src={CloudsImg} animated={isDesktop} />
      {isDesktop && <MovingImage src={CloudsImg} />}
    </Container>
  );
};
