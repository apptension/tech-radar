import React from 'react';
import * as R from 'ramda';

import * as colors from '../../../theme/color';
import drawTechRadar from '../../../lib/zalando-tech-radar';
import { destroyRadar } from '../../utils/radarUtils';
import { RadarConfig, RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';

interface RadarProps {
  technologies: RadarTechnology[];
  rings: RadarRing[];
  quadrants: RadarQuadrant[];
  zoomedQuadrant: null | number;
  activeQuadrant: number;
  previouslyActiveQuadrant: number;
}

export const Radar = ({
  technologies,
  rings,
  quadrants,
  zoomedQuadrant,
  activeQuadrant,
  previouslyActiveQuadrant,
}: RadarProps) => {
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

  if (!R.isNil(zoomedQuadrant)) config.zoomed_quadrant = zoomedQuadrant;
  if (!R.isNil(activeQuadrant)) config.active_quadrant = activeQuadrant;
  if (!R.isNil(previouslyActiveQuadrant)) config.previously_active_quadrant = previouslyActiveQuadrant;

  destroyRadar();
  drawTechRadar(config);

  return <svg id="radar" />;
};
