// @ts-nocheck
import React from 'react';

import * as colors from '../../../theme/color';
import techRadar from '../../../lib/zalando-tech-radar';

export const RadarComponent = ({ entries, rings, quadrants, zoomedQuadrant, scale = 1 }) => {
  const config = {
    svg_id: 'radar',
    width: zoomedQuadrant ? window.innerWidth - 360 : window.innerHeight,
    height: window.innerHeight - 40,
    scale,
    colors: {
      background: colors.codGray,
      grid: colors.mineShaft,
      inactive: colors.silver,
      default: colors.mineShaft,
      active: colors.screaminGreen, //TODO gradient and outer shape
    },
    print_layout: true,
    quadrants,
    rings,
    entries,
  };

  if (zoomedQuadrant) config.zoomed_quadrant = zoomedQuadrant;

  techRadar(config);

  return <svg id="radar" />;
};
