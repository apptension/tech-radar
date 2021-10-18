import React, { useState } from 'react';
import * as R from 'ramda';

import { RadarComponent } from './radar.component';
import { Container } from './radar.styles';
import { ZOOMED_QUADRANT } from './radar.constants';
import {
  ContentfulQuadrant,
  ContentfulRing,
  ContentfulTechnology,
  RadarTechnology,
  RadarQuadrant,
  RadarRing,
} from './radar.types';

export interface RadarProps {
  technologies: ContentfulTechnology[];
  rings: ContentfulRing[];
  quadrants: ContentfulQuadrant[];
}

export const Radar = ({ technologies, rings, quadrants }: RadarProps) => {
  const [previouslyActiveQuadrant, setPreviouslyActiveQuadrant] = useState<number>(ZOOMED_QUADRANT.bottomLeft);
  const [activeQuadrant, setActiveQuadrant] = useState(ZOOMED_QUADRANT.topLeft);
  const [zoomedQuadrant, setZoomedQuadrant] = useState<number | null>(null);

  const updateActiveQuadrant = (newQuadrant: number) => {
    setPreviouslyActiveQuadrant(activeQuadrant);
    setActiveQuadrant(newQuadrant);
  };

  //TODO when zooming, always set zoomedQuadrant to activeQuadrant

  const getTechnologyQuadrant = (technology: ContentfulTechnology): number => {
    const position = R.pathOr('', ['fields', 'quadrant', 'fields', 'position'], technology);
    return getQuadrantPosition(position);
  };

  const getRadarTechnologies = () => {
    const radarEntries: RadarTechnology[] = [];

    R.forEachObjIndexed<ContentfulTechnology[]>((item) => {
      const quadrant = getTechnologyQuadrant(item as ContentfulTechnology);
      return radarEntries.push({
        label: R.pathOr('', ['fields', 'label'], item),
        quadrant,
        ring: R.pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
        inactive: quadrant !== activeQuadrant,
      });
    }, technologies);
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

  const getQuadrantPosition = (position: string) => {
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
          position: getQuadrantPosition(R.pathOr('top-left', ['fields', 'position'], item)),
        }),
      quadrants
    );
    return R.sortBy(R.prop('position'), radarQuadrants);
  };

  return (
    <Container fullRadar={!zoomedQuadrant}>
      <RadarComponent
        technologies={getRadarTechnologies()}
        quadrants={getRadarQuadrants()}
        rings={getRadarRings()}
        zoomedQuadrant={zoomedQuadrant}
        activeQuadrant={activeQuadrant}
        previouslyActiveQuadrant={previouslyActiveQuadrant}
      />
      {
        //TODO remove after adding this functionality in toolbar
      }
      <button onClick={() => updateActiveQuadrant((activeQuadrant + 1) % 4)}>Change quadrant</button>
    </Container>
  );
};
