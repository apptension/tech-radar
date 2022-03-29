import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useDebounce } from 'react-use';
import { Selection, select } from 'd3';
import * as colors from '../../../theme/color';
import { hideBubble, highlightLegend, showBubble, toggleQuadrant, translate } from '../../utils/radarUtils';
import { FilterType } from '../../../modules/filters/filters.types';
import { setArea } from '../../../modules/filters/filters.actions';
import { RadarTechnology, RadarQuadrant, RadarRing } from './radar.types';
import { RADAR_RADIUS, VERTICAL_RADAR_MARGIN, HORIZONTAL_RADAR_MARGIN } from './radar.constants';
import {
  renderBubble,
  renderGrid,
  renderLegend,
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
  activeRing: number | null;
  viewerHeight: number;
  viewerWidth: number;
}

export const Radar = ({
  technologies,
  rings: radarRings,
  quadrants,
  activeQuadrant,
  activeRing,
  viewerHeight,
  viewerWidth,
}: RadarProps) => {
  const [quadrantSectors, setQuadrantSectors] = useState<Selection<SVGGElement, any, SVGGElement, unknown> | null>(
    null
  );
  const [quadrantLegend, setQuadrantLegend] = useState<Selection<SVGGElement, any, SVGGElement, unknown> | null>(null);
  const [blips, setBlips] = useState<Selection<any, any, SVGGElement, unknown> | null>(null);
  const [ringLabels, setRingLabels] = useState<Selection<SVGTextElement, { radius: number }, any, unknown> | null>(
    null
  );
  const radarRef = useRef(null);
  const dispatch = useDispatch();
  const handleAreaSelect = (option: FilterType) => dispatch(setArea(option));

  const renderRadar = () => {
    const height = viewerHeight - VERTICAL_RADAR_MARGIN;
    const width = viewerWidth - HORIZONTAL_RADAR_MARGIN;
    const radarSize = width < height ? width : height;

    const scale = (radarSize - 1) / (RADAR_RADIUS * 2);
    const rings = [
      { radius: 140 * scale },
      { radius: 245 * scale },
      { radius: 350 * scale },
      { radius: RADAR_RADIUS * scale },
    ];
    const container = select(radarRef.current);
    container.selectAll('*').remove();
    container.style('background-color', colors.codGray).attr('width', radarSize).attr('height', radarSize);

    const radar = container.append('g').attr('class', 'radar');
    const legend = container.append('g').attr('class', 'legend');
    container.attr('viewBox', `0 0 ${radarSize} ${radarSize}`);
    radar.attr('transform', translate({ x: radarSize / 2, y: Math.ceil(rings[3].radius) }));
    legend.attr('transform', translate({ x: radarSize / 2, y: Math.ceil(rings[3].radius) }));

    renderGrid({ radar, scale, rings });
    const quadrantSectors = renderQuadrantSectors({ rings, radar });
    const renderedTechnologies = renderTechnologies({ radar, technologies, rings });
    const renderedRingLabels = renderRingLabels({ radar, radarRings, rings, quadrants });
    const renderedLegend = renderLegend({ quadrants, rings, legend });
    renderBubble(radar);

    setBlips(renderedTechnologies);
    setRingLabels(renderedRingLabels);
    setQuadrantLegend(renderedLegend);
    setQuadrantSectors(quadrantSectors);

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

    quadrantSectors
      .on('click', (event, d) => {
        handleAreaSelect(quadrants[d.quadrant].name);
      })
      .on('mouseover', function (event: MouseEvent, d) {
        toggleQuadrant(d.quadrant, true);
      })
      .on('mouseout', function (event: MouseEvent, d) {
        toggleQuadrant(d.quadrant, false);
      });
  };

  useDebounce(renderRadar, 200, [viewerWidth, viewerHeight]);

  useEffect(() => {
    if (quadrantSectors && quadrantLegend) {
      if (activeQuadrant) {
        toggleQuadrant(activeQuadrant, false);
      }
      quadrantSectors.classed('active', (d) => d.quadrant === activeQuadrant);
      quadrantLegend.classed('active', (d) => d.quadrant === activeQuadrant);
      blips
        ?.classed('active', (d) => !technologies[d.index].inactive && activeQuadrant !== null)
        .classed('hover-active', activeQuadrant === null);
      ringLabels?.classed('active', (d, i) => i + 1 === activeRing || !activeRing);
    }
  }, [quadrantSectors, technologies]);

  return <SVG ref={radarRef} />;
};
