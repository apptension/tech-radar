// @ts-nocheck
import React, { FC } from 'react';
import * as R from 'ramda';

import techRadar from '../../../lib/zalando-tech-radar';
import './radar.css';

export const Radar: FC = ({ entries, rings, quadrants }) => {
  const getEntryQuadrant = (entry) => {
    const position = R.pathOr('', ['fields', 'quadrant', 'fields', 'position'], entry);
    return getQuadrantPosition(position);
  };

  const getRadarEntries = () => {
    const radarEntries = [];
    R.forEachObjIndexed(
      (item) =>
        radarEntries.push({
          label: R.pathOr('', ['fields', 'label'], item),
          quadrant: getEntryQuadrant(item),
          ring: R.pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
          moved: R.pathOr(0, ['fields', 'moved'], item),
        }),
      entries
    );
    return radarEntries;
  };

  const getRadarRings = () => {
    const radarRings = [];
    R.forEachObjIndexed(
      (item) =>
        radarRings.push({
          name: R.pathOr('', ['fields', 'label'], item),
          color: R.pathOr('#000000', ['fields', 'color'], item),
          position: R.pathOr(1, ['fields', 'position'], item),
        }),
      rings
    );

    return R.sortBy(R.prop('position'), radarRings);
  };

  const getQuadrantPosition = (position) => {
    if (position) {
      switch (position) {
        case 'bottom-right':
          return 0;
        case 'bottom-left':
          return 1;
        case 'top-left':
          return 2;
        case 'top-right':
          return 3;
        default:
          return 0;
      }
    }
    return 0;
  };

  const getRadarQuadrants = () => {
    const radarQuadrants = [];
    R.forEachObjIndexed(
      (item) =>
        radarQuadrants.push({
          name: R.pathOr('', ['fields', 'label'], item),
          position: getQuadrantPosition(R.pathOr(0, ['fields', 'position'], item)),
        }),
      quadrants
    );
    return R.sortBy(R.prop('position'), radarQuadrants);
  };

  techRadar({
    svg_id: 'radar',
    width: 1450,
    height: 1000,
    colors: {
      background: '#fff',
      grid: '#bbb',
      inactive: '#ddd',
    },
    quadrants: getRadarQuadrants(),
    rings: getRadarRings(),
    print_layout: true,
    // zoomed_quadrant: 0,
    //ENTRIES
    entries: getRadarEntries(),
  });

  return (
    <div>
      <svg id="radar" />
    </div>
  );
};
