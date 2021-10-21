import React, { useState } from 'react';
import { isNil, min, equals } from 'ramda';

import { useDebouncedCallback } from 'use-debounce';
import * as colors from '../../../theme/color';
import drawTechRadar from '../../../lib/zalando-tech-radar';
import { destroyRadar } from '../../utils/radarUtils';
import { RadarConfig, RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';
import {
  BASIC_RADAR_WIDTH,
  HORIZONTAL_RADAR_MARGIN,
  HORIZONTAL_ZOOMED_RADAR_MARGIN,
  VERTICAL_RADAR_MARGIN,
} from './radar.constants';

interface RadarProps {
  technologies: RadarTechnology[];
  rings: RadarRing[];
  quadrants: RadarQuadrant[];
  zoomedQuadrant: null | number;
  activeQuadrant: number | null;
}

export const Radar = ({ technologies, rings, quadrants, zoomedQuadrant, activeQuadrant }: RadarProps) => {
  const [previousConfig, setPreviousConfig] = useState<RadarConfig | null>(null);

  const config: RadarConfig = {
    svg_id: 'radar',
    width: zoomedQuadrant
      ? min(window.innerWidth - HORIZONTAL_ZOOMED_RADAR_MARGIN, BASIC_RADAR_WIDTH)
      : window.innerHeight + HORIZONTAL_RADAR_MARGIN,
    height: window.innerHeight - VERTICAL_RADAR_MARGIN,
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

  const drawRadar = () => {
    destroyRadar();
    drawTechRadar(config);
  };

  const debouncedDrawRadar = useDebouncedCallback(drawRadar, 120);

  if (!equals(config, previousConfig)) {
    setPreviousConfig(config);
    debouncedDrawRadar();
  }

  return <svg id="radar" />;
};
