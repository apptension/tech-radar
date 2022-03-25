// The MIT License (MIT)

// Copyright (c) 2017 Zalando SE

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { Selection, select, forceSimulation, forceCollide } from 'd3';
import { isNil } from 'ramda';
import { color } from '../../../theme';
import {
  bounded_box,
  bounded_ring,
  cartesian,
  getPxToSubtractQuadrantLabelText,
  getRotationForQuadrant,
  hideBubble,
  highlightBlip,
  highlightLegend,
  normal_between,
  polar,
  random_between,
  showBubble,
  toggleQuadrant,
  translate,
  unhighlightBlip,
} from '../../utils/radarUtils';
import { RadarQuadrant, RadarRing, RadarTechnology, Rings } from './radar.types';

const quadrantsData = [
  { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
  { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
  { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
  { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
];

type RenderGrid = {
  radar: Selection<SVGGElement, unknown, null, undefined>;
  scale: number;
  rings: Rings;
};

export const renderGrid = ({ radar, scale, rings }: RenderGrid) => {
  const grid = radar.append('g');

  const defs = grid.append('defs');
  const filter = defs.append('filter').attr('x', 0).attr('y', 0).attr('width', 1).attr('height', 1).attr('id', 'solid');
  filter.append('feFlood').attr('flood-color', 'rgb(0, 0, 0, 0.8)');
  filter.append('feComposite').attr('in', 'SourceGraphic');

  const ringGradient = defs.append('radialGradient').attr('id', 'ringGradient');
  ringGradient.append('stop').attr('offset', '60%').attr('stop-color', 'transparent').attr('stop-opacity', 1);
  ringGradient.append('stop').attr('offset', '85%').attr('stop-color', 'transparent').attr('stop-opacity', 0.8);
  ringGradient.append('stop').attr('offset', '100%').attr('stop-color', color.tundora).attr('stop-opacity', 0.2);

  for (let i = 0; i < rings.length; i++) {
    grid
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', rings[i].radius)
      .style('fill', 'url(#ringGradient)')
      .style('stroke', color.mineShaft)
      .style('stroke-width', 2);
  }

  grid
    .append('line')
    .attr('x1', 0)
    .attr('y1', -450 * scale)
    .attr('x2', 0)
    .attr('y2', 450 * scale)
    .style('stroke', color.mineShaft)
    .style('stroke-width', 2);
  grid
    .append('line')
    .attr('x1', -450 * scale)
    .attr('y1', 0)
    .attr('x2', 450 * scale)
    .attr('y2', 0)
    .style('stroke', color.mineShaft)
    .style('stroke-width', 2);

  return grid;
};

type RenderActiveQuadrantContainer = {
  grid: Selection<SVGGElement, unknown, null, undefined>;
  activeQuadrant: number | null;
  previouslyActiveQuadrant: number | null;
  rings: { radius: number }[];
};

export const renderActiveQuadrantContainer = ({
  grid,
  activeQuadrant,
  previouslyActiveQuadrant,
  rings,
}: RenderActiveQuadrantContainer) => {
  const defs = grid.select('defs');
  const semiCircle = grid.select('defs').append('clipPath').attr('id', 'semi-circle');
  semiCircle
    .append('rect')
    .attr('x', -rings[3].radius)
    .attr('y', 0)
    .attr('width', rings[3].radius)
    .attr('height', rings[3].radius);

  const conicGradient = defs.append('linearGradient').attr('id', 'conic-gradient');
  conicGradient.attr('x1', '0%').attr('y1', '100%').attr('x2', '100%').attr('y2', '0%');
  conicGradient.append('stop').attr('offset', '0%').attr('stop-color', color.white20).attr('stop-opacity', 0.7);
  conicGradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(0, 0, 0, 0)').attr('stop-opacity', 1);

  return grid
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', rings[3].radius)
    .attr('clip-path', 'url(#semi-circle)')
    .attr('fill', 'url(#conic-gradient)')
    .style('opacity', activeQuadrant === undefined ? 0 : 1)
    .attr('transform', `rotate(${getRotationForQuadrant(activeQuadrant)})`);
};

type RenderQuadrantSectors = {
  radar: Selection<SVGGElement, unknown, null, undefined>;
  activeQuadrant: number | null;
  quadrants: RadarQuadrant[];
  rings: Rings;
};

export const renderQuadrantSectors = ({ radar, activeQuadrant, quadrants, rings }: RenderQuadrantSectors) => {
  const quadrantSectors = radar.append('g').attr('id', 'quadrants');
  const quadrantData = [
    { position: -90, quadrant: 0 },
    { position: 0, quadrant: 1 },
    {
      position: 90,
      quadrant: 2,
    },
    { position: 180, quadrant: 3 },
  ];

  return quadrantSectors
    .selectAll('.quadrant')
    .data(quadrantData)
    .enter()
    .append('circle')
    .attr('class', 'quadrant')
    .attr('id', (d) => `quadrant-${d.quadrant}`)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', rings[3].radius)
    .attr('clip-path', 'url(#semi-circle)')
    .style('opacity', 0)
    .attr('transform', (d) => `rotate(${d.position})`)
    .attr('fill', 'url(#conic-gradient)');
};

type RenderQuadrantLabels = {
  activeQuadrant: number | null;
  quadrants: RadarQuadrant[];
  fullSize: boolean;
  radar: Selection<SVGGElement, unknown, null, undefined>;
};

export const renderQuadrantLabels = ({ quadrants, activeQuadrant, fullSize, radar }: RenderQuadrantLabels) => {
  const quandrantLabelsContainer = radar.append('g').attr('id', 'quadrant-labels-container');

  for (let i = 0; i < quadrantsData.length; i++) {
    const smallerRadar = !fullSize;
    const factorX = quadrantsData[i].factor_x;
    const factorY = quadrantsData[i].factor_y;
    const factorsForSmallerRadar = [
      { x: factorX * 210, y: factorY * 220 },
      { x: factorX * 350, y: factorY * 200 },
      { x: factorX * 410, y: factorY * 220 },
      { x: factorX * 220, y: factorY * 200 },
    ];
    const factorsForBiggerRadar = [
      { x: factorX * 290, y: factorY * 280 },
      { x: factorX * 450, y: factorY * 250 },
      { x: factorX * 480, y: factorY * 300 },
      { x: factorX * 300, y: factorY * 260 },
    ];

    const currentFactors = smallerRadar ? factorsForSmallerRadar : factorsForBiggerRadar;
    const { subtractX, subtractY } = getPxToSubtractQuadrantLabelText(smallerRadar);

    const quadrantLabel = quandrantLabelsContainer.append('g').attr('id', `quadrant-label-${i}`).style('opacity', 1);

    quadrantLabel
      .append('rect')
      .attr('rx', 15)
      .attr('ry', 15)
      .attr('x', currentFactors[i].x)
      .attr('y', currentFactors[i].y)
      .style('fill', color.mineShaft)
      .transition()
      .style('fill', activeQuadrant === i ? color.silver : color.mineShaft);
    const text = quadrantLabel
      .append('text')
      .attr('x', currentFactors[i].x - subtractX)
      .attr('y', currentFactors[i].y - subtractY)
      .attr('text-anchor', 'left')
      .style('fill', activeQuadrant === i ? color.mineShaft : color.scorpion)
      .style('font-family', 'Hellix')
      .style('font-size', '13px')
      .style('font-weight', 600)
      .style('letter-spacing', '0.2em');

    text.text(quadrants[i].name.toUpperCase());

    const labelNode = text.node() as SVGTextElement;
    if (labelNode) {
      const bbox = labelNode.getBBox();

      select(`#quadrant-label-${i} rect`)
        .attr('x', currentFactors[i].x - 20)
        .attr('y', currentFactors[i].y - bbox.height - 5)
        .attr('width', bbox.width + 30)
        .attr('height', 32);
    }
  }
};

type RenderRinkLabels = {
  radar: Selection<SVGGElement, unknown, null, undefined>;
  quadrants: RadarQuadrant[];
  rings: Rings;
  radarRings: RadarRing[];
  activeRing: number | null;
};

export const renderRingLabels = ({ radar, rings, activeRing, radarRings }: RenderRinkLabels) => {
  const ringLabels = radar.append('g').attr('id', 'ring-labels');
  for (let i = 0; i < rings.length; i++) {
    const isActiveRing = activeRing === radarRings[i]?.position || !activeRing;
    ringLabels
      .append('text')
      .text(radarRings[i]?.name)
      .attr('y', -rings[i].radius + 21)
      .attr('x', 7)
      .attr('text-anchor', 'left')
      .style('fill', isActiveRing ? color.white : color.boulder)
      .style('font-family', 'Hellix')
      .style('font-size', 14)
      .style('pointer-events', 'none')
      .style('user-select', 'none');
  }
};

type RenderTechnologies = {
  radar: Selection<SVGGElement, unknown, null, undefined>;
  activeQuadrant: number | null;
  technologies: RadarTechnology[];
  rings: Rings;
};

export const renderTechnologies = ({ radar, technologies, activeQuadrant, rings }: RenderTechnologies) => {
  function getSegment(quadrant: number, ring: number) {
    const polar_min = {
      t: quadrantsData[quadrant].radial_min * Math.PI,
      r: ring == 0 ? 30 : rings[ring - 1].radius,
    };
    const polar_max = {
      t: quadrantsData[quadrant].radial_max * Math.PI,
      r: rings[ring].radius,
    };
    const cartesian_min = {
      x: 15 * quadrantsData[quadrant].factor_x,
      y: 15 * quadrantsData[quadrant].factor_y,
    };
    const cartesian_max = {
      x: rings[3].radius * quadrantsData[quadrant].factor_x,
      y: rings[3].radius * quadrantsData[quadrant].factor_y,
    };

    return {
      clipx: function (d: any) {
        const c = bounded_box(d, cartesian_min, cartesian_max);
        const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.x = cartesian(p).x;
        return d.x;
      },
      clipy: function (d: any) {
        const c = bounded_box(d, cartesian_min, cartesian_max);
        const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.y = cartesian(p).y;
        return d.y;
      },
      random: function () {
        return cartesian({
          t: random_between(polar_min.t, polar_max.t),
          r: normal_between(polar_min.r, polar_max.r),
        });
      },
    };
  }

  const formattedTechnologies = technologies.map((technology, index) => {
    const segment = getSegment(technology.quadrant, technology.ring);
    return { ...technology, segment, ...segment.random(), color: technology.inactive ? color.mineShaft : color.silver };
  });

  const segmented = new Array(4);
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (let ring = 0; ring < 4; ring++) {
      segmented[quadrant][ring] = [];
    }
  }
  for (let i = 0; i < formattedTechnologies.length; i++) {
    const technology = formattedTechnologies[i];
    segmented[technology.quadrant][technology.ring].push(technology);
  }

  const rink = radar.append('g').attr('id', 'rink');

  const bubble = radar
    .append('g')
    .attr('id', 'bubble')
    .attr('x', 0)
    .attr('y', 0)
    .style('opacity', 0)
    .style('pointer-events', 'none')
    .style('user-select', 'none');
  bubble.append('rect').attr('rx', 6).attr('ry', 6).style('fill', color.mineShaft);
  bubble.append('text').style('font-family', 'Hellix').style('font-size', '10px').style('fill', color.white);

  const blips = rink.selectAll('.blip').data(formattedTechnologies).enter().append('g').attr('class', 'blip');

  blips.each(function (d) {
    const blip = select(this);
    blip.attr('id', `blip-${d.id}`).style('opacity', 0).transition().duration(700).style('opacity', 1);

    if (isNil(activeQuadrant)) {
      d.color = color.mineShaft;
    }

    const blipDefs = blip.append('defs');

    const mainGradient = blipDefs.append('linearGradient').attr('id', 'mainGradient');
    mainGradient.append('stop').attr('offset', '0%').attr('stop-color', color.schoolBusYellow).attr('stop-opacity', 1);
    mainGradient.append('stop').attr('offset', '100%').attr('stop-color', color.screaminGreen).attr('stop-opacity', 1);

    const diamondMainGradient = blipDefs.append('linearGradient').attr('id', 'diamondMainGradient');
    diamondMainGradient.attr('x1', '0%').attr('y1', '100%').attr('x2', '100%').attr('y2', '0%');
    diamondMainGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color.schoolBusYellow)
      .attr('stop-opacity', 1);
    diamondMainGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color.screaminGreen)
      .attr('stop-opacity', 1);

    if (d.ring === 0) {
      blip.append('circle').attr('r', 9).attr('fill', 'url(#mainGradient)').style('opacity', 0);

      blip
        .append('circle')
        .attr('r', 5.5)
        .attr('fill', d.color || '');
    } else if (d.ring === 1) {
      blip
        .append('rect')
        .attr('x', -7.4)
        .attr('y', -7.4)
        .attr('width', 14.8)
        .attr('height', 14.8)
        .attr('transform', 'rotate(45)')
        .attr('fill', 'url(#diamondMainGradient)')
        .style('opacity', 0);

      blip
        .append('rect')
        .attr('x', -4.5)
        .attr('y', -4.5)
        .attr('width', 9)
        .attr('height', 9)
        .attr('transform', 'rotate(45)')
        .attr('fill', d.color || '');
    } else if (d.ring === 2) {
      blip
        .append('rect')
        .attr('x', -7.4)
        .attr('y', -7.4)
        .attr('width', 14.8)
        .attr('height', 14.8)
        .attr('fill', 'url(#mainGradient)')
        .style('opacity', 0);

      blip
        .append('rect')
        .attr('x', -4.5)
        .attr('y', -4.5)
        .attr('width', 9)
        .attr('height', 9)
        .attr('fill', d.color || '');
    } else {
      blip
        .append('path')
        .attr('d', 'M 12.5 4.999 L -0.0003 -13 L -12.5 5 L 12.5 4.999 Z')
        .style('transform', 'scale(0.9)')
        .attr('fill', 'url(#mainGradient)')
        .style('opacity', 0);

      blip
        .append('path')
        .attr('d', 'M 12.5 3.999 L -0.0003 -14 L -12.5 4 L 12.5 3.999 Z')
        .style('transform', 'scale(0.5)')
        .attr('fill', d.color || '');
    }
  });

  function ticked() {
    blips.attr('transform', function (d) {
      const translateData = { x: d.segment.clipx(d), y: d.segment.clipy(d) };
      const blip = select(this);
      blip.attr('data-translate', JSON.stringify(translateData));
      return translate(translateData);
    });
  }

  forceSimulation()
    .alphaMin(0.00001)
    .nodes(formattedTechnologies)
    .velocityDecay(0.19)
    .force('collision', forceCollide().radius(12).strength(0.01))
    .on('tick', ticked);

  return blips;
};
