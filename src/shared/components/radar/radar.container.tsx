import React from 'react';
import * as R from 'ramda';

import { RadarComponent } from './radar.component';
import { Container } from './radar.styles';
import { ZOOMED_QUADRANT } from './radar.constants';
import { RadarEntry, RadarQuadrant, RadarRing } from './radar.types';

// TODO: interfaces for entries (we may change it to technologies), rings, quadrants
export interface RadarProps {
  entries: any;
  rings: any;
  quadrants: any;
}

export const Radar = ({ entries, rings, quadrants }: RadarProps) => {
  const activeQuadrant = ZOOMED_QUADRANT.topLeft;
  // const zoomedQuadrant = ZOOMED_QUADRANT.topLeft;
  const zoomedQuadrant = null;

  //TODO when zooming, always set zoomedQuadrant to activeQuadrant

  const getEntryQuadrant = (entry: any) => {
    const position = R.pathOr('', ['fields', 'quadrant', 'fields', 'position'], entry);
    return getQuadrantPosition(position);
  };

  const getRadarEntries = () => {
    const radarEntries: RadarEntry[] = [];
    R.forEachObjIndexed(
      (item) =>
        radarEntries.push({
          label: R.pathOr('', ['fields', 'label'], item),
          quadrant: getEntryQuadrant(item),
          ring: R.pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
          inactive: getEntryQuadrant(item) !== activeQuadrant,
        }),
      entries
    );
    return radarEntries;
  };

  const getRadarRings = () => {
    const radarRings: RadarRing[] = [];
    R.forEachObjIndexed(
      (item) =>
        radarRings.push({
          name: R.pathOr('', ['fields', 'label'], item),
          position: R.pathOr(1, ['fields', 'position'], item),
        }),
      rings
    );

    return R.sortBy(R.prop('position'), radarRings);
  };

  const getQuadrantPosition = (position: string | number) => {
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
    const radarQuadrants: RadarQuadrant[] = [];
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

  return (
    <Container fullRadar={!zoomedQuadrant}>
      <RadarComponent
        entries={getRadarEntries()}
        quadrants={getRadarQuadrants()}
        rings={getRadarRings()}
        zoomedQuadrant={zoomedQuadrant}
        activeQuadrant={activeQuadrant}
      />
    </Container>
  );
};
