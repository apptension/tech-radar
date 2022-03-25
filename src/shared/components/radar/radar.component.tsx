import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { isNil, min, equals } from 'ramda';

import { useDebouncedCallback } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { Selection, select } from 'd3';
import * as colors from '../../../theme/color';
import {
  destroyRadar,
  getRadarScale,
  getRotationForQuadrant,
  hideBubble,
  highlightBlip,
  highlightLegend,
  showBubble,
  toggleQuadrant,
  translate,
  unhighlightBlip,
} from '../../utils/radarUtils';
import { isSafari } from '../../utils/isSafari';
import { FilterType } from '../../../modules/filters/filters.types';
import { setArea } from '../../../modules/filters/filters.actions';
import { RadarConfig, RadarTechnology, RadarQuadrant, RadarRing, RadarContainer } from './radar.types';
import {
  BASIC_RADAR_WIDTH,
  HORIZONTAL_RADAR_MARGIN,
  HORIZONTAL_ZOOMED_RADAR_MARGIN,
  VERTICAL_RADAR_MARGIN,
} from './radar.constants';
import {
  renderActiveQuadrantContainer,
  renderGrid,
  renderQuadrantLabels,
  renderQuadrantSectors,
  renderRingLabels,
  renderTechnologies,
} from './radar.helpers';
import { SVG } from './radar.styles';

interface RadarProps {
  technologies: RadarTechnology[];
  rings: RadarRing[];
  quadrants: RadarQuadrant[];
  activeQuadrant: number | null;
  previouslyActiveQuadrant: number | null;
  activeRing: number | null;
}

export const Radar = ({
  technologies,
  rings: radarRings,
  quadrants,
  activeQuadrant,
  activeRing,
  previouslyActiveQuadrant,
}: RadarProps) => {
  const [radarNode, setRadarNode] = useState<RadarContainer | null>(null);
  const [activeQuadrantContainer, setActiveQuadrantContainer] = useState<Selection<
    SVGCircleElement,
    unknown,
    null,
    undefined
  > | null>(null);
  const [quadrantSectors, setQuadrantSectors] = useState<Selection<
    SVGCircleElement,
    { position: number; quadrant: number },
    SVGGElement,
    unknown
  > | null>(null);
  const radarRef = useRef(null);
  const activeQuadrantRef = useRef(activeQuadrant);
  const dispatch = useDispatch();
  const handleAreaSelect = (option: FilterType) => dispatch(setArea(option));
  const width = window.innerHeight + HORIZONTAL_RADAR_MARGIN;
  const height = window.innerHeight - VERTICAL_RADAR_MARGIN;

  useEffectOnce(() => {
    const { scale, fullSize } = getRadarScale();
    const rings = [{ radius: 140 * scale }, { radius: 245 * scale }, { radius: 350 * scale }, { radius: 450 * scale }];
    const container = select(radarRef.current);
    container.selectAll('*').remove();
    container.style('background-color', colors.codGray).attr('width', width).attr('height', height);

    setRadarNode(container);

    const radar = container.append('g').attr('class', 'radar');

    container.attr('viewBox', `0 0 ${width} ${height}`);
    radar.attr('transform', translate({ x: width / 2, y: height / 2 }));

    const grid = renderGrid({ radar, scale, rings });
    const activeQuadrantContainer = renderActiveQuadrantContainer({
      activeQuadrant,
      previouslyActiveQuadrant,
      rings,
      grid,
    });
    setActiveQuadrantContainer(activeQuadrantContainer);
    const quadrantSectors = renderQuadrantSectors({ quadrants, activeQuadrant, rings, radar });
    setQuadrantSectors(quadrantSectors);
    renderQuadrantLabels({ activeQuadrant, quadrants, fullSize, radar });
    const blips = renderTechnologies({ radar, technologies, activeQuadrant, rings });
    renderRingLabels({ radar, activeRing, radarRings, rings, quadrants });

    blips
      .on('mouseover', function (event: MouseEvent, d: RadarTechnology) {
        // toggleQuadrant(d.quadrant, true, activeQuadrant);
        // if (activeQuadrant === undefined || !d.inactive) {
        //   // @ts-ignore
        //   showBubble(d);
        //   highlightBlip(d);
        //   highlightLegend({ id: d.id });
        // }
      })
      .on('mouseout', function (event: MouseEvent, d) {
        // toggleQuadrant(d.quadrant, false, activeQuadrant);
        // hideBubble();
        // unhighlightBlip(d);
        // highlightLegend({ id: d.id, mode: 'off' });
      })
      .on('click', function (event: MouseEvent, d) {
        if (activeQuadrant !== undefined && d.inactive) {
          handleAreaSelect(quadrants[d.quadrant].name);
        }
      });

    quadrantSectors.on('click', (event, d) => {
      handleAreaSelect(quadrants[d.quadrant].name);
    });
  });

  useEffect(() => {
    if (activeQuadrantContainer) {
      activeQuadrantContainer.transition().attr('transform', `rotate(${getRotationForQuadrant(activeQuadrant)})`);
    }
    if (quadrantSectors && typeof activeQuadrant === 'number') {
      // quadrantSectors.each((d) => toggleQuadrant(d.quadrant, false, d.quadrant));
      quadrantSectors
        .on('mouseover', (event, d) => toggleQuadrant(d.quadrant, true, activeQuadrant))
        .on('mouseleave', (event, d) => toggleQuadrant(d.quadrant, false, activeQuadrant));
    }
  }, [activeQuadrant, activeQuadrantContainer]);

  return <SVG ref={radarRef} />;
};
