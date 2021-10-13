// @ts-nocheck
import * as d3 from 'd3';

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

  const rings = [{ radius: 180 }, { radius: 270 }, { radius: 360 }, { radius: 450 }];

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
    entry.color = entry.active || config.print_layout ? config.rings[entry.ring].color : config.colors.inactive;
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
      Math.max(0, quadrants[quadrant].factor_x * 450) - 470,
      Math.max(0, quadrants[quadrant].factor_y * 450) - 470,
      490,
      490,
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

  const grid = radar.append('g');

  // draw grid lines
  grid
    .append('line')
    .attr('x1', 0)
    .attr('y1', -450)
    .attr('x2', 0)
    .attr('y2', 450)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);
  grid
    .append('line')
    .attr('x1', -450)
    .attr('y1', 0)
    .attr('x2', 450)
    .attr('y2', 0)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  const defs = grid.append('defs');
  const filter = defs.append('filter').attr('x', 0).attr('y', 0).attr('width', 1).attr('height', 1).attr('id', 'solid');
  filter.append('feFlood').attr('flood-color', 'rgb(0, 0, 0, 0.8)');
  filter.append('feComposite').attr('in', 'SourceGraphic');

  // draw rings
  for (let i = 0; i < rings.length; i++) {
    grid
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', rings[i].radius)
      .style('fill', 'none')
      .style('stroke', config.colors.grid)
      .style('stroke-width', 1);
    if (config.print_layout) {
      grid
        .append('text')
        .text(config.rings[i]?.name)
        .attr('y', -rings[i].radius + 62)
        .attr('text-anchor', 'middle')
        .style('fill', '#e5e5e5')
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', 42)
        .style('font-weight', 'bold')
        .style('pointer-events', 'none')
        .style('user-select', 'none');
    }
  }

  // layer for entries
  const rink = radar.append('g').attr('id', 'rink');

  // rollover bubble (on top of everything else)
  const bubble = radar
    .append('g')
    .attr('id', 'bubble')
    .attr('x', 0)
    .attr('y', 0)
    .style('opacity', 0)
    .style('pointer-events', 'none')
    .style('user-select', 'none');
  bubble.append('rect').attr('rx', 4).attr('ry', 4).style('fill', '#333');
  bubble.append('text').style('font-family', 'sans-serif').style('font-size', '10px').style('fill', '#fff');
  bubble.append('path').attr('d', 'M 0,0 10,0 5,8 z').style('fill', '#333');

  function showBubble(d) {
    if (d.active || config.print_layout) {
      const tooltip = d3.select('#bubble text').text(d.label);
      const bbox = tooltip.node().getBBox();
      d3.select('#bubble')
        .attr('transform', translate(d.x - bbox.width / 2, d.y - 16))
        .style('opacity', 0.8);
      d3.select('#bubble rect')
        .attr('x', -5)
        .attr('y', -bbox.height)
        .attr('width', bbox.width + 10)
        .attr('height', bbox.height + 4);
      d3.select('#bubble path').attr('transform', translate(bbox.width / 2 - 5, 3));
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
    })
    .on('mouseout', hideBubble);

  // configure each blip
  blips.each(function (d) {
    let blip = d3.select(this);

    // blip link
    if (!config.print_layout && d.active && d.hasOwnProperty('link')) {
      blip = blip.append('a').attr('xlink:href', d.link);
    }

    // blip shape
    if (d.moved > 0) {
      blip
        .append('path')
        .attr('d', 'M -11,5 11,5 0,-13 z') // triangle pointing up
        .style('fill', d.color);
    } else if (d.moved < 0) {
      blip
        .append('path')
        .attr('d', 'M -11,-5 11,-5 0,13 z') // triangle pointing down
        .style('fill', d.color);
    } else {
      blip.append('circle').attr('r', 9).attr('fill', d.color);
    }

    // blip text
    if (d.active || config.print_layout) {
      const blip_text = config.print_layout ? d.id : d.label.match(/[a-z]/i);
      blip
        .append('text')
        .text(blip_text)
        .attr('y', 3)
        .attr('text-anchor', 'middle')
        .style('fill', '#fff')
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', function () {
          return blip_text.length > 2 ? '8' : '9';
        })
        .style('pointer-events', 'none')
        .style('user-select', 'none');
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
