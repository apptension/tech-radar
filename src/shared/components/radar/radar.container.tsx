// @ts-nocheck
import React from 'react';
import * as R from 'ramda';

import { RadarComponent } from './radar.component';
import { Container } from './radar.styles';
import { ZOOMED_QUADRANT } from './radar.constants';

export const Radar = ({ entries, rings, quadrants }) => {
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
          active: item.fields.label === 'Java', //TODO change to be toggleable
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

  const availableRadarWidth = window.innerWidth - 411;
  const basicRadarWidth = 1450;
  const basicRadarHeight = 1000;
  const widthScale = availableRadarWidth / basicRadarWidth;
  const heightScale = window.innerHeight / basicRadarHeight;
  const radarScale = R.clamp(0, 1, Math.min(widthScale, heightScale));

  // const zoomedQuadrant = ZOOMED_QUADRANT.topLeft;
  const zoomedQuadrant = null;
  const isZoomed = !!zoomedQuadrant;

  return (
    <Container fullRadar={!isZoomed}>
      <RadarComponent
        entries={getRadarEntries()}
        quadrants={getRadarQuadrants()}
        rings={getRadarRings()}
        scale={radarScale}
        zoomedQuadrant={zoomedQuadrant}
      />
    </Container>
  );
};
