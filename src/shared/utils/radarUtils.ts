// @ts-nocheck
import * as d3 from 'd3';

// custom random number generator, to make random sequence reproducible
// source: https://stackoverflow.com/questions/521295
let seed = 42;
export const random = () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const random_between = (min, max) => {
  return min + random() * (max - min);
};

export const normal_between = (min, max) => {
  return min + (random() + random()) * 0.5 * (max - min);
};

export const polar = (cartesian) => {
  const x = cartesian.x;
  const y = cartesian.y;
  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y),
  };
};

export const cartesian = (polar) => {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t),
  };
};

export const bounded_interval = (value, min, max) => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
};

export const bounded_ring = (polar, r_min, r_max) => {
  return {
    t: polar.t,
    r: bounded_interval(polar.r, r_min, r_max),
  };
};

export const bounded_box = (point, min, max) => {
  return {
    x: bounded_interval(point.x, min.x, max.x),
    y: bounded_interval(point.y, min.y, max.y),
  };
};

export const translate = (x, y) => {
  return 'translate(' + x + ',' + y + ')';
};

export const showBubble = (d) => {
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
};

export const hideBubble = () => {
  d3.select('#bubble').attr('transform', translate(0, 0)).style('opacity', 0);
};

export const changeHighlight = ({ d, shape, opacity, fill = 'url(#mainGradient)' }) => {
  const outerBlip = d3.select(`#blip-${d.id} ${shape}`);
  outerBlip.style('opacity', opacity);
  const fullBlip = d3.selectAll(`#blip-${d.id} ${shape}`);
  fullBlip.style('fill', fill);
};

export const highlightBlip = (d) => {
  if (d.ring === 0) {
    changeHighlight({ d, shape: 'circle', opacity: 0.3 });
  } else if (d.ring === 1) {
    changeHighlight({ d, shape: 'rect', opacity: 0.3 });
  } else if (d.ring === 2) {
    changeHighlight({ d, shape: 'rect', opacity: 0.3, fill: 'url(#diamondMainGradient)' });
  } else {
    changeHighlight({ d, shape: 'path', opacity: 0.3 });
  }
};

export const unhighlightBlip = (d) => {
  if (d.ring === 0) {
    changeHighlight({ d, shape: 'circle', opacity: 0, fill: d.color });
  } else if (d.ring === 1) {
    changeHighlight({ d, shape: 'rect', opacity: 0, fill: d.color });
  } else if (d.ring === 2) {
    changeHighlight({ d, shape: 'rect', opacity: 0, fill: d.color });
  } else {
    changeHighlight({ d, shape: 'path', opacity: 0, fill: d.color });
  }
};
