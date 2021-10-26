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

  const MIN_WINDOW_HEIGHT_FOR_RADAR = 1000;
  const moveRadarBy = max(MIN_WINDOW_HEIGHT_FOR_RADAR - window.innerHeight, 0);

  return (
    <div>
      <Lottie options={defaultOptions} height={window.innerHeight - moveRadarBy} width={window.innerWidth} />
    </div>
  );
};

export { RadarHomeAnimation };
