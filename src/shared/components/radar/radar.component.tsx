import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { Selection, select } from 'd3';
import * as colors from '../../../theme/color';
import {
  getRadarScale,
  hideBubble,
  highlightLegend,
  showBubble,
  toggleQuadrant,
  translate,
} from '../../utils/radarUtils';
import { FilterType } from '../../../modules/filters/filters.types';
import { setArea } from '../../../modules/filters/filters.actions';
import { RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';
import { HORIZONTAL_RADAR_MARGIN, VERTICAL_RADAR_MARGIN } from './radar.constants';
import { renderBubble, renderGrid, renderQuadrantSectors, renderRingLabels, renderTechnologies } from './radar.helpers';
import { SVG } from './radar.styles';

interface RadarProps {
  technologies: RadarTechnology[];
  rings: RadarRing[];
  quadrants: RadarQuadrant[];
  activeQuadrant: number | null;
  activeRing: number | null;
}

export const Radar = ({ technologies, rings: radarRings, quadrants, activeQuadrant, activeRing }: RadarProps) => {
  const [quadrantSectors, setQuadrantSectors] = useState<Selection<
    SVGGElement,
    { position: number; quadrant: number },
    SVGGElement,
    unknown
  > | null>(null);
  const [blips, setBlips] = useState<Selection<any, any, SVGGElement, unknown> | null>(null);
  const [ringLabels, setRingLabels] = useState<Selection<SVGTextElement, { radius: number }, any, unknown> | null>(
    null
  );
  const radarRef = useRef(null);
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

    const radar = container.append('g').attr('class', 'radar');

    container.attr('viewBox', `0 0 ${width} ${height}`);
    radar.attr('transform', translate({ x: width / 2, y: height / 2 }));

    renderGrid({ radar, scale, rings });
    const quadrantSectors = renderQuadrantSectors({ quadrants, rings, radar, fullSize });
    setQuadrantSectors(quadrantSectors);
    const renderedTechnologies = renderTechnologies({ radar, technologies, rings });
    setBlips(renderedTechnologies);
    const renderedRingLabels = renderRingLabels({ radar, radarRings, rings, quadrants });
    renderBubble(radar);
    setRingLabels(renderedRingLabels);
    renderedTechnologies
      .on('mouseover', function (event: MouseEvent, d) {
        toggleQuadrant(d.quadrant, true);
        highlightLegend({ id: d.id });
        showBubble(d);
      })
      .on('mouseout', function (event: MouseEvent, d) {
        toggleQuadrant(d.quadrant, false);
        highlightLegend({ id: d.id, mode: 'off' });
        hideBubble();
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
    if (quadrantSectors) {
      quadrantSectors.classed('active', (d) => d.quadrant === activeQuadrant);
      blips
        ?.classed('active', (d) => !technologies[d.index].inactive && activeQuadrant !== null)
        .classed('hover-active', activeQuadrant === null);
      ringLabels?.classed('active', (d, i) => i + 1 === activeRing || !activeRing);
    }
  }, [quadrantSectors, technologies]);

  return <SVG ref={radarRef} />;
};
