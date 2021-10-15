// @ts-nocheck
import * as d3 from 'd3';
import { color } from '../theme';

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
  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295
  let seed = 42;
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function random_between(min, max) {
    return min + random() * (max - min);
  }

  function normal_between(min, max) {
    return min + (random() + random()) * 0.5 * (max - min);
  }

  // radial_min / radial_max are multiples of PI
  const quadrants = [
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
  ];

  const rings = [
    { radius: 140 * config.scale },
    { radius: 245 * config.scale },
    { radius: 350 * config.scale },
    { radius: 450 * config.scale },
  ];

  function polar(cartesian) {
    const x = cartesian.x;
    const y = cartesian.y;
    return {
      t: Math.atan2(y, x),
      r: Math.sqrt(x * x + y * y),
    };
  }

  function cartesian(polar) {
    return {
      x: polar.r * Math.cos(polar.t),
      y: polar.r * Math.sin(polar.t),
    };
  }

  function bounded_interval(value, min, max) {
    const low = Math.min(min, max);
    const high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
  }

  function bounded_ring(polar, r_min, r_max) {
    return {
      t: polar.t,
      r: bounded_interval(polar.r, r_min, r_max),
    };
  }

  function bounded_box(point, min, max) {
    return {
      x: bounded_interval(point.x, min.x, max.x),
      y: bounded_interval(point.y, min.y, max.y),
    };
  }

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

  // position each entry randomly in its segment
  for (let i = 0; i < config.entries.length; i++) {
    const entry = config.entries[i];
    entry.segment = segment(entry.quadrant, entry.ring);
    const point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = entry.inactive ? config.colors.inactive : config.colors.default;
  }

  // partition entries according to segments
  const segmented = new Array(4);
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (let ring = 0; ring < 4; ring++) {
      segmented[quadrant][ring] = [];
    }
  }
  for (let i = 0; i < config.entries.length; i++) {
    let entry = config.entries[i];
    segmented[entry.quadrant][entry.ring].push(entry);
  }

  // assign unique sequential id to each entry
  let id = 1;
  for (let quadrant of [2, 3, 1, 0]) {
    for (let ring = 0; ring < 4; ring++) {
      const entries = segmented[quadrant][ring];
      entries.sort(function (a, b) {
        return a.label.localeCompare(b.label);
      });
      for (let i = 0; i < entries.length; i++) {
        entries[i].id = '' + id++;
      }
    }
  }

  function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  function viewbox(quadrant) {
    return [
      Math.max(0, quadrants[quadrant].factor_x * 560) - 370 * config.scale,
      Math.max(0, quadrants[quadrant].factor_y * 560) - 485 * config.scale,
      530 * config.scale,
      530 * config.scale,
    ].join(' ');
  }

  const svg = d3
    .select('svg#' + config.svg_id)
    .style('background-color', config.colors.background)
    .attr('width', config.width)
    .attr('height', config.height);

  const radar = svg.append('g');

  if ('zoomed_quadrant' in config) {
    svg.attr('viewBox', viewbox(config.zoomed_quadrant));
  } else {
    radar.attr('transform', translate(config.width / 2, config.height / 2));
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
    .attr('transform', 'rotate(90)');

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
    .attr('y1', -450 * config.scale)
    .attr('x2', 0)
    .attr('y2', 450 * config.scale)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 2);
  grid
    .append('line')
    .attr('x1', -450 * config.scale)
    .attr('y1', 0)
    .attr('x2', 450 * config.scale)
    .attr('y2', 0)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 2);

  // draw quadrant labels //TODO resize when zoomed
  for (let i = 0; i < config.quadrants.length; i++) {
    const oddQuadrantY = quadrants[i].factor_y * 320 * config.scale;
    const evenQuadrantY = oddQuadrantY + quadrants[i].factor_y * 40 * config.scale;
    const everyQuadrantX = quadrants[i].factor_x * 360 - 100 * config.scale;

    const quadrantLabel = grid.append('g').attr('id', `quadrant-label-${i}`).style('opacity', 1);
    quadrantLabel
      .append('rect')
      .attr('rx', config.zoomed_quadrant ? 12 : 20)
      .attr('ry', config.zoomed_quadrant ? 12 : 20)
      .attr('y', i % 2 ? oddQuadrantY : evenQuadrantY)
      .attr('x', everyQuadrantX)
      .style('fill', config.active_quadrant === i ? color.silver : color.mineShaft);
    quadrantLabel
      .append('text')
      .attr('y', i % 2 ? oddQuadrantY : evenQuadrantY)
      .attr('x', everyQuadrantX)
      .attr('text-anchor', 'left')
      .style('fill', config.active_quadrant === i ? color.mineShaft : color.scorpion)
      .style('font-family', 'Hellix')
      .style('font-size', `${config.zoomed_quadrant ? 8 : 14}px`)
      .style('letter-spacing', '0.2em');

    const label = d3.select(`#quadrant-label-${i} text`);
    label.text(config.quadrants[i].name.toUpperCase());
    if (config.zoomed_quadrant) label.attr('x', everyQuadrantX + 115).attr('y', evenQuadrantY - 1);

    const bbox = label.node().getBBox();

    d3.select(`#quadrant-label-${i} rect`)
      .attr('y', i % 2 ? oddQuadrantY - bbox.height - 5 : evenQuadrantY - bbox.height - 5)
      .attr('x', config.zoomed_quadrant ? everyQuadrantX + 100 : everyQuadrantX - 20)
      .attr('width', config.zoomed_quadrant ? bbox.width + 30 : bbox.width + 40)
      .attr('height', config.zoomed_quadrant ? bbox.height + 12 : bbox.height + 18);
  }

  // layer for entries
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

  function showBubble(d) {
    if (d.active || config.print_layout) {
      const tooltip = d3.select('#bubble text').text(d.label);
      const bbox = tooltip.node().getBBox();
      d3.select('#bubble')
        .attr('transform', translate(d.x - 8, d.ring === 3 ? d.y - 18 : d.y - 14))
        .style('opacity', 1);
      d3.select('#bubble rect')
        .attr('x', -bbox.width - 36)
        .attr('y', 0)
        .attr('width', bbox.width + 20)
        .attr('height', bbox.height + 14)
        .style('filter', `drop-shadow(2px 4px 2px rgba(0, 0, 0, .1))`);
      tooltip.attr('x', -bbox.width - 26).attr('y', 16);
    }
  }

  function hideBubble() {
    d3.select('#bubble').attr('transform', translate(0, 0)).style('opacity', 0);
  }

  // draw blips on radar
  const blips = rink
    .selectAll('.blip')
    .data(config.entries)
    .enter()
    .append('g')
    .attr('class', 'blip')
    .on('mouseover', function (event, d) {
      showBubble(d);
      // add gradients
    })
    .on('mouseout', function (event, d) {
      hideBubble();
      //remove gradients
    });

  // configure each blip
  blips.each(function (d) {
    let blip = d3.select(this);

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
      if (d.active) {
        blip
          .append('circle') // outer circle
          .attr('r', 10)
          .attr('fill', 'url(#mainGradient)')
          .style('opacity', 0.3);
      }

      blip
        .append('circle')
        .attr('r', 6)
        .attr('fill', d.active ? 'url(#mainGradient)' : d.color);
    } else if (d.ring === 1) {
      if (d.active) {
        blip
          .append('rect') // outer square
          .attr('x', -8.4)
          .attr('y', -8.4)
          .attr('width', 16.8)
          .attr('height', 16.8)
          .attr('fill', d.active ? 'url(#mainGradient)' : d.color)
          .style('opacity', 0.3);
      }

      blip
        .append('rect') // square
        .attr('x', -5.4)
        .attr('y', -5.4)
        .attr('width', 10.8)
        .attr('height', 10.8)
        .attr('fill', d.active ? 'url(#mainGradient)' : d.color);
    } else if (d.ring === 2) {
      if (d.active) {
        blip
          .append('rect') // outer diamond
          .attr('x', -8.4)
          .attr('y', -8.4)
          .attr('width', 16.8)
          .attr('height', 16.8)
          .attr('transform', 'rotate(45)')
          .attr('fill', d.active ? 'url(#diamondMainGradient)' : d.color)
          .style('opacity', 0.3);
      }

      blip
        .append('rect') // diamond
        .attr('x', -5.4)
        .attr('y', -5.4)
        .attr('width', 10.8)
        .attr('height', 10.8)
        .attr('transform', 'rotate(45)')
        .attr('fill', d.active ? 'url(#diamondMainGradient)' : d.color);
    } else {
      if (d.active) {
        blip
          .append('path')
          .attr('d', 'M 12.5 4.999 L -0.0003 -13 L -12.5 5 L 12.5 4.999 Z') // outer triangle pointing up
          .style('transform', 'scale(1.3)')
          .attr('fill', d.active ? 'url(#mainGradient)' : d.color)
          .style('opacity', 0.3);
      }

      blip
        .append('path')
        .attr('d', 'M 12.5 3.999 L -0.0003 -14 L -12.5 4 L 12.5 3.999 Z') // triangle pointing up
        .style('transform', 'scale(0.65)')
        .attr('fill', d.active ? 'url(#mainGradient)' : d.color);
    }
  });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr('transform', function (d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    });
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.entries)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force('collision', d3.forceCollide().radius(12).strength(0.85))
    .on('tick', ticked);
}
