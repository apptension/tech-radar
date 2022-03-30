import Lottie from 'react-lottie';

import animationData from '../../../lottie/loader/data.json';
import { Container } from './loader.styles';

export const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container>
      <Lottie options={defaultOptions} height={window.innerHeight} width={window.innerWidth} />
    </Container>
  );
};
