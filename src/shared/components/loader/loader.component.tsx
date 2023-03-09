import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../../../lottie/loader/data.json';
import { Container, FullPageContainer } from './loader.styles';

interface LoaderProps {
  isFullPage?: boolean;
}

export const Loader = ({ isFullPage = false }: LoaderProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (isFullPage) {
    return (
      <FullPageContainer>
        <Lottie options={defaultOptions} height={window.innerHeight} width={window.innerWidth} />
      </FullPageContainer>
    );
  }

  return (
    <Container>
      <Lottie options={defaultOptions} height={window.innerHeight} width={window.innerWidth} />
    </Container>
  );
};
