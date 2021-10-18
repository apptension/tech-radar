import React from 'react';

import * as colors from '../../../theme/color';
import techRadar from '../../../lib/zalando-tech-radar';
import { RadarConfig, RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';

interface RadarComponentProps {
  technologies: RadarTechnology[];
  rings: RadarRing[];
  quadrants: RadarQuadrant[];
  zoomedQuadrant: null | number;
  activeQuadrant: null | number;
}

export const RadarComponent = ({
  technologies,
  rings,
  quadrants,
  zoomedQuadrant,
  activeQuadrant = 2,
}: RadarComponentProps) => {
  const config: RadarConfig = {
    svg_id: 'radar',
    width: zoomedQuadrant ? window.innerWidth - 360 : window.innerHeight + 210,
    height: window.innerHeight - 40,
    colors: {
      background: colors.codGray,
      grid: colors.mineShaft,
      inactive: colors.mineShaft,
      default: colors.silver,
    },
    print_layout: true,
    quadrants,
    rings,
    technologies,
  };

  if (zoomedQuadrant) config.zoomed_quadrant = zoomedQuadrant;
  if (activeQuadrant) config.active_quadrant = activeQuadrant;

  techRadar(config);

  return <svg id="radar" />;
};
