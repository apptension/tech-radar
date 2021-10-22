// @ts-nocheck
import * as d3 from 'd3';
import { color } from '../theme';
import {
  translate,
  showBubble,
  hideBubble,
  highlightBlip,
  unhighlightBlip,
  highlightLegend,
  random_between,
  normal_between,
  polar,
  cartesian,
  bounded_box,
  bounded_ring,
  getRadarScale,
  getRotationForQuadrant,
} from '../shared/utils/radarUtils';

/* eslint-disable */

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

export default function radar_visualization(config) {
  const { scale, fullSize } = getRadarScale();

  // radial_min / radial_max are multiples of PI
  const quadrants = [
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
  ];

  const rings = [{ radius: 140 * scale }, { radius: 245 * scale }, { radius: 350 * scale }, { radius: 450 * scale }];

  function segment(quadrant, ring) {
    const polar_min = {
      t: quadrants[quadrant].radial_min * Math.PI,
      r: ring == 0 ? 30 : rings[ring - 1].radius,
    };
    const polar_max = {
      t: quadrants[quadrant].radial_max * Math.PI,
      r: rings[ring].radius,
    };
    const cartesian_min = {
      x: 15 * quadrants[quadrant].factor_x,
      y: 15 * quadrants[quadrant].factor_y,
    };
    const cartesian_max = {
      x: rings[3].radius * quadrants[quadrant].factor_x,
      y: rings[3].radius * quadrants[quadrant].factor_y,
    };

    return {
      clipx: function (d) {
        const c = bounded_box(d, cartesian_min, cartesian_max);
        const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.x = cartesian(p).x; // adjust data too!
        return d.x;
      },
      clipy: function (d) {
        const c = bounded_box(d, cartesian_min, cartesian_max);
        const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.y = cartesian(p).y; // adjust data too!
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

  // position each technology randomly in its segment
  for (let i = 0; i < config.technologies.length; i++) {
    const technology = config.technologies[i];
    technology.segment = segment(technology.quadrant, technology.ring);
    const point = technology.segment.random();
    technology.x = point.x;
    technology.y = point.y;
    technology.color = technology.inactive ? config.colors.inactive : config.colors.default;
  }

  // partition technologies according to segments
  const segmented = new Array(4);
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (let ring = 0; ring < 4; ring++) {
      segmented[quadrant][ring] = [];
    }
  }
  for (let i = 0; i < config.technologies.length; i++) {
    let technology = config.technologies[i];
    segmented[technology.quadrant][technology.ring].push(technology);
  }

  function viewbox(quadrant) {
    return [
      Math.max(0, quadrants[quadrant].factor_x * 560) - 400 * scale,
      Math.max(0, quadrants[quadrant].factor_y * 560) - 485 * scale,
      500 * scale,
      550 * scale,
    ].join(' ');
  }

  const svg = d3
    .select('svg#' + config.svg_id)
    .style('background-color', config.colors.background)
    .attr('width', config.width)
    .attr('height', config.height);

  const radar = svg.append('g').attr('class', 'radar');

  if ('zoomed_quadrant' in config) {
    svg.attr('viewBox', viewbox(config.zoomed_quadrant));
  } else {
    svg.attr('viewBox', `0 0 ${config.width} ${config.height}`);
    radar.attr('transform', translate({ x: config.width / 2, y: config.height / 2 }));
  }

  // layer for grid
  const grid = radar.append('g');

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  const defs = grid.append('defs');
  const filter = defs.append('filter').attr('x', 0).attr('y', 0).attr('width', 1).attr('height', 1).attr('id', 'solid');
  filter.append('feFlood').attr('flood-color', 'rgb(0, 0, 0, 0.8)');
  filter.append('feComposite').attr('in', 'SourceGraphic');

  // grid conic gradient
  const semiCircle = defs.append('clipPath').attr('id', 'semi-circle');
  semiCircle
    .append('rect')
    .attr('x', -rings[3].radius)
    .attr('y', 0)
    .attr('width', rings[3].radius * 2)
    .attr('height', rings[3].radius);

  const conicGradient = defs.append('linearGradient').attr('id', 'conic-gradient');
  conicGradient.attr('x1', '0%').attr('y1', '100%').attr('x2', '100%').attr('y2', '0%');
  conicGradient.append('stop').attr('offset', '0%').attr('stop-color', color.tundora).attr('stop-opacity', 0.7);
  conicGradient.append('stop').attr('offset', '100%').attr('stop-color', 'transparent').attr('stop-opacity', 1);

  grid
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', rings[3].radius)
    .attr('clip-path', 'url(#semi-circle)')
    .attr('fill', 'url(#conic-gradient)')
    .attr(
      'transform',
      config.zoomed_quadrant
        ? `rotate(${getRotationForQuadrant(config.zoomed_quadrant)})`
        : `rotate(${getRotationForQuadrant(config.active_quadrant)})`
    );

  // grid radial gradient
  const ringGradient = defs.append('radialGradient').attr('id', 'ringGradient');
  ringGradient.append('stop').attr('offset', '60%').attr('stop-color', 'transparent').attr('stop-opacity', 1);
  ringGradient.append('stop').attr('offset', '85%').attr('stop-color', 'transparent').attr('stop-opacity', 0.8);
  ringGradient.append('stop').attr('offset', '100%').attr('stop-color', color.tundora).attr('stop-opacity', 0.2);

  // draw rings
  for (let i = 0; i < rings.length; i++) {
    grid
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', rings[i].radius)
      .style('fill', 'url(#ringGradient)')
      .style('stroke', config.colors.grid)
      .style('stroke-width', 2);
  }

  // draw grid lines
  grid
    .append('line')
    .attr('x1', 0)
    .attr('y1', -450 * scale)
    .attr('x2', 0)
    .attr('y2', 450 * scale)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 2);
  grid
    .append('line')
    .attr('x1', -450 * scale)
    .attr('y1', 0)
    .attr('x2', 450 * scale)
    .attr('y2', 0)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 2);

  // draw quadrant labels
  for (let i = 0; i < config.quadrants.length; i++) {
    const smallerLabels = config.zoomed_quadrant || !fullSize;
    const isZoomed = i === config.zoomed_quadrant;
    const factorX = quadrants[i].factor_x;
    const factorY = quadrants[i].factor_y;
    // magic numbers (found by experimentation)
    const factorsForSmallerLabels = [
      { x: factorX * 200, y: factorY * 220 },
      { x: factorX * 300, y: factorY * 200 },
      { x: factorX * 320, y: factorY * 220 },
      { x: factorX * 200, y: factorY * 200 },
    ];
    const factorsForBiggerLabels = [
      { x: factorX * 340, y: factorY * 280 },
      { x: factorX * 510, y: factorY * 250 },
      { x: factorX * 550, y: factorY * 300 },
      { x: factorX * 330, y: factorY * 260 },
    ];

    const currentFactors = smallerLabels ? factorsForSmallerLabels : factorsForBiggerLabels;
    const subtractX = smallerLabels ? 6 : 0;
    const subtractY = smallerLabels ? 0 : -1;

    const quadrantLabel = grid.append('g').attr('id', `quadrant-label-${i}`).style('opacity', 1);
    quadrantLabel
      .append('rect')
      .attr('rx', smallerLabels ? 12 : 20)
      .attr('ry', smallerLabels ? 12 : 20)
      .attr('x', currentFactors[i].x)
      .attr('y', currentFactors[i].y)
      .style('fill', color.mineShaft)
      .transition()
      .style(
        'fill',
        !config.active_quadrant || config.active_quadrant === i || config.zoomed_quadrant === i
          ? color.silver
          : color.mineShaft
      );
    quadrantLabel
      .append('text')
      .attr('x', currentFactors[i].x - subtractX)
      .attr('y', currentFactors[i].y - subtractY)
      .attr('text-anchor', 'left')
      .style(
        'fill',
        !config.active_quadrant || config.active_quadrant === i || config.zoomed_quadrant === i
          ? color.mineShaft
          : color.scorpion
      )
      .style('font-family', 'Hellix')
      .style('font-size', `${smallerLabels ? 8 : 14}px`)
      .style('letter-spacing', '0.2em');

    const label = d3.select(`#quadrant-label-${i} text`);
    label.text(config.quadrants[i].name.toUpperCase());
    if (config.zoomed_quadrant) {
      const addX = fullSize && isZoomed ? -50 : 44;
      const addY = fullSize && isZoomed ? -130 : -46;
      label.attr('x', currentFactors[i].x + addX).attr('y', currentFactors[i].y + addY);
    }

    const labelNode = label.node();
    if (labelNode) {
      const bbox = labelNode.getBBox();
      const addX = fullSize && isZoomed ? -64 : 30;
      const addY = fullSize && isZoomed ? -134 : -50;

      d3.select(`#quadrant-label-${i} rect`)
        .attr('x', config.zoomed_quadrant ? currentFactors[i].x + addX : currentFactors[i].x - 20)
        .attr(
          'y',
          config.zoomed_quadrant ? currentFactors[i].y - bbox.height + addY : currentFactors[i].y - bbox.height - 5
        )
        .attr('width', smallerLabels ? bbox.width + 30 : bbox.width + 40)
        .attr('height', smallerLabels ? bbox.height + 12 : bbox.height + 18);
    }
  }

  // layer for technologies
  const rink = radar.append('g').attr('id', 'rink');

  // layer for ring labels
  const ringLabels = radar.append('g').attr('id', 'ring-labels');
  if (config.print_layout) {
    for (let i = 0; i < rings.length; i++) {
      ringLabels
        .append('text')
        .text(config.rings[i]?.name)
        .attr('y', -rings[i].radius + 21)
        .attr('x', 7)
        .attr('text-anchor', 'left')
        .style('fill', color.white)
        .style('font-family', 'Hellix')
        .style('font-size', config.zoomed_quadrant ? 8 : 14)
        .style('pointer-events', 'none')
        .style('user-select', 'none');
    }
  }

  // rollover bubble (on top of everything else)
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

  // draw blips on radar
  const blips = rink.selectAll('.blip').data(config.technologies).enter().append('g').attr('class', 'blip');

  // configure each blip
  blips.each(function (d) {
    let blip = d3.select(this);
    blip.attr('id', `blip-${d.id}`).style('opacity', 0).transition().duration(700).style('opacity', 1);

    // blip link
    if (!config.print_layout && d.active && d.hasOwnProperty('link')) {
      blip = blip.append('a').attr('xlink:href', d.link);
    }

    // blip gradients
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

    // blip shape with outer layer
    if (d.ring === 0) {
      blip
        .append('circle') // outer circle
        .attr('r', 10)
        .attr('fill', 'url(#mainGradient)')
        .style('opacity', 0);

      blip.append('circle').attr('r', 6).attr('fill', d.color);
    } else if (d.ring === 1) {
      blip
        .append('rect') // outer square
        .attr('x', -8.4)
        .attr('y', -8.4)
        .attr('width', 16.8)
        .attr('height', 16.8)
        .attr('fill', 'url(#mainGradient)')
        .style('opacity', 0);

      blip
        .append('rect') // square
        .attr('x', -5.4)
        .attr('y', -5.4)
        .attr('width', 10.8)
        .attr('height', 10.8)
        .attr('fill', d.color);
    } else if (d.ring === 2) {
      blip
        .append('rect') // outer diamond
        .attr('x', -8.4)
        .attr('y', -8.4)
        .attr('width', 16.8)
        .attr('height', 16.8)
        .attr('transform', 'rotate(45)')
        .attr('fill', 'url(#diamondMainGradient)')
        .style('opacity', 0);

      blip
        .append('rect') // diamond
        .attr('x', -5.4)
        .attr('y', -5.4)
        .attr('width', 10.8)
        .attr('height', 10.8)
        .attr('transform', 'rotate(45)')
        .attr('fill', d.color);
    } else {
      blip
        .append('path')
        .attr('d', 'M 12.5 4.999 L -0.0003 -13 L -12.5 5 L 12.5 4.999 Z') // outer triangle pointing up
        .style('transform', 'scale(1.3)')
        .attr('fill', 'url(#mainGradient)')
        .style('opacity', 0);

      blip
        .append('path')
        .attr('d', 'M 12.5 3.999 L -0.0003 -14 L -12.5 4 L 12.5 3.999 Z') // triangle pointing up
        .style('transform', 'scale(0.65)')
        .attr('fill', d.color);
    }
  });

  blips
    .on('mouseover', function (event, d) {
      showBubble(d);
      highlightBlip(d);
      highlightLegend({ id: d.id });
    })
    .on('mouseout', function (event, d) {
      hideBubble();
      unhighlightBlip(d);
      highlightLegend({ id: d.id, mode: 'off' });
    });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr('transform', function (d) {
      const translateData = { x: d.segment.clipx(d), y: d.segment.clipy(d) };
      const blip = d3.select(this);
      blip.attr('data-translate', JSON.stringify(translateData));
      return translate(translateData);
    });
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.technologies)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force('collision', d3.forceCollide().radius(12).strength(0.85))
    .on('tick', ticked);
}
