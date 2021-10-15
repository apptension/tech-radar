// @ts-nocheck
import React from 'react';

import * as colors from '../../../theme/color';
import techRadar from '../../../lib/zalando-tech-radar';

export const RadarComponent = ({
  entries,
  rings,
  quadrants,
  zoomedQuadrant,
  activeQuadrant = 2,
  scale = 1,
  highlightLegend,
}) => {
  const config = {
    svg_id: 'radar',
    width: zoomedQuadrant ? window.innerWidth - 360 : window.innerHeight + 210,
    height: window.innerHeight - 40,
    scale,
    colors: {
      background: colors.codGray,
      grid: colors.mineShaft,
      inactive: colors.mineShaft,
      default: colors.silver,
    },
    print_layout: true,
    quadrants,
    rings,
    entries,
    highlightLegend,
  };

  if (zoomedQuadrant) config.zoomed_quadrant = zoomedQuadrant;
  if (activeQuadrant) config.active_quadrant = activeQuadrant;

  techRadar(config);

  return <svg id="radar" />;
};
