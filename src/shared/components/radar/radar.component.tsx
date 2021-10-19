import React from 'react';
import { isNil, min } from 'ramda';

import * as colors from '../../../theme/color';
import drawTechRadar from '../../../lib/zalando-tech-radar';
import { destroyRadar } from '../../utils/radarUtils';
import { RadarConfig, RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';
import { BASIC_RADAR_WIDTH } from './radar.constants';

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
    width: zoomedQuadrant ? min(window.innerWidth - 360, BASIC_RADAR_WIDTH) : window.innerHeight + 210,
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

  if (!isNil(zoomedQuadrant)) config.zoomed_quadrant = zoomedQuadrant;
  if (!isNil(activeQuadrant)) config.active_quadrant = activeQuadrant;
  if (!isNil(previouslyActiveQuadrant)) config.previously_active_quadrant = previouslyActiveQuadrant;

  destroyRadar();
  drawTechRadar(config);

  return <svg id="radar" />;
};
