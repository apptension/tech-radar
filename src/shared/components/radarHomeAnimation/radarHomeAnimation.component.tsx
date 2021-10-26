import React from 'react';
import Lottie from 'react-lottie';
import { max } from 'ramda';

import animationData from '../../../lottie/radar/data.json';

const RadarHomeAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const moveRadarBy = max(1000 - window.innerHeight, 0);

  return (
    <div>
      <Lottie options={defaultOptions} height={window.innerHeight - moveRadarBy} width={window.innerWidth} />
    </div>
  );
};

export { RadarHomeAnimation };
