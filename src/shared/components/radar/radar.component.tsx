// @ts-nocheck
import React from 'react';

import techRadar from '../../../lib/zalando-tech-radar';

export const RadarComponent = ({ entries, rings, quadrants, zoomedQuadrant }) => {
  const config = {
    svg_id: 'radar',
    width: 1450,
    height: 1000,
    colors: {
      background: '#fff',
      grid: '#bbb',
      inactive: '#ddd',
    },
    print_layout: true,
    quadrants,
    rings,
    entries,
  };

  if (zoomedQuadrant) config.zoomed_quadrant = zoomedQuadrant;

  techRadar(config);

  return (
    <div>
      <svg id="radar" />
    </div>
  );
};
