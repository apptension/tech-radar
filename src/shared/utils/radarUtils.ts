import * as d3 from 'd3';
import { clamp, pathOr, forEachObjIndexed, sortBy, prop, pluck } from 'ramda';
import { color } from '../../theme';
import {
  BASIC_RADAR_HEIGHT,
  BASIC_RADAR_WIDTH,
  RADAR_SEED,
  RADAR_SEED_MULTIPLIER,
  SIDEBAR_WIDTH,
} from '../components/radar/radar.constants';
import {
  BlipInterface,
  BubbleInterface,
  ContentfulQuadrant,
  ContentfulRing,
  ContentfulTeam,
  ContentfulTechnology,
  MinMaxFunction,
  Point,
  RadarQuadrant,
  RadarRing,
  RadarTeam,
  RadarTechnology,
} from '../components/radar/radar.types';

// custom random number generator, to make random sequence reproducible
// source: https://stackoverflow.com/questions/521295
let seed = RADAR_SEED;
export const random = () => {
  const x = Math.sin(seed++) * RADAR_SEED_MULTIPLIER;
  return x - Math.floor(x);
};

export const random_between: MinMaxFunction = (min, max) => {
  return min + random() * (max - min);
};

export const normal_between: MinMaxFunction = (min, max) => {
  return min + (random() + random()) * 0.5 * (max - min);
};

export const polar = (cartesian: Point) => {
  const x = cartesian.x;
  const y = cartesian.y;
  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y),
  };
};

export const cartesian = (polar: { r: number; t: number }) => {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t),
  };
};

export const bounded_interval = (value: number, min: number, max: number) => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
};

export const bounded_ring = (polar: { t: number; r: number }, r_min: number, r_max: number) => {
  return {
    t: polar.t,
    r: bounded_interval(polar.r, r_min, r_max),
  };
};

export const bounded_box = (point: Point, min: Point, max: Point) => {
  return {
    x: bounded_interval(point.x, min.x, max.x),
    y: bounded_interval(point.y, min.y, max.y),
  };
};

export const translate = ({ x, y }: Point) => {
  return `translate(${x}, ${y})`;
};

export const getRadarScale = (): number => {
  const availableRadarWidth = window.innerWidth - SIDEBAR_WIDTH;

  const widthScale = availableRadarWidth / BASIC_RADAR_WIDTH;
  const heightScale = window.innerHeight / BASIC_RADAR_HEIGHT;

  return clamp(0, 1, Math.min(widthScale, heightScale));
};

export const showBubble = ({ label, x, y, ring }: BubbleInterface) => {
  const tooltip = d3.select('#bubble text').text(label);
  const tooltipNode = tooltip.node() as SVGGraphicsElement | null;
  if (tooltipNode) {
    const bbox = tooltipNode.getBBox();
    d3.select('#bubble')
      .attr('transform', translate({ x: x - 8, y: ring === 3 ? y - 18 : y - 14 }))
      .style('opacity', 1);
    d3.select('#bubble rect')
      .attr('x', -bbox.width - 36)
      .attr('y', 0)
      .attr('width', bbox.width + 20)
      .attr('height', bbox.height + 14)
      .style('filter', `drop-shadow(2px 4px 2px rgba(0, 0, 0, .1))`);
    tooltip.attr('x', -bbox.width - 26).attr('y', 16);
  }
};

export const hideBubble = () => {
  d3.select('#bubble')
    .attr('transform', translate({ x: 0, y: 0 }))
    .style('opacity', 0);
};

export const changeHighlight = ({
  id,
  shape,
  opacity,
  fill = 'url(#mainGradient)',
}: {
  id: string;
  shape: string;
  opacity: number;
  fill?: string;
}) => {
  const outerBlip = d3.select(`#blip-${id} ${shape}`);
  outerBlip.style('opacity', opacity);
  const fullBlip = d3.selectAll(`#blip-${id} ${shape}`);
  fullBlip.style('fill', fill);
};

export const highlightBlip = ({ id, ring }: Omit<BlipInterface, 'color'>) => {
  switch (ring) {
    case 0:
      changeHighlight({ id, shape: 'circle', opacity: 0.3 });
      break;
    case 1:
      changeHighlight({ id, shape: 'rect', opacity: 0.3 });
      break;
    case 2:
      changeHighlight({ id, shape: 'rect', opacity: 0.3, fill: 'url(#diamondMainGradient)' });
      break;
    default:
      changeHighlight({ id, shape: 'path', opacity: 0.3 });
  }
};

export const unhighlightBlip = ({ id, ring, color }: BlipInterface) => {
  switch (ring) {
    case 0:
      changeHighlight({ id, shape: 'circle', opacity: 0, fill: color });
      break;
    case 1:
      changeHighlight({ id, shape: 'rect', opacity: 0, fill: color });
      break;
    case 2:
      changeHighlight({ id, shape: 'rect', opacity: 0, fill: color });
      break;
    default:
      changeHighlight({ id, shape: 'path', opacity: 0, fill: color });
  }
};

export const getBlipDataById = (id: string) => {
  const blip = document.querySelector(`#blip-${id}`) as SVGGraphicsElement;
  return JSON.parse(blip.dataset.translate || '');
};

export const highlightLegend = ({ id, mode = 'on' }: { id: string; mode?: 'on' | 'off' }) => {
  const listItem = document.querySelector(`#list-item-${id}`) as HTMLDivElement;
  if (listItem) {
    listItem.style.color = mode === 'on' ? color.white : color.boulder;
  }
};

export const getRotationForQuadrant = (quadrant: number) => {
  switch (quadrant) {
    case 0:
      return -90;
    case 1:
      return 0;
    case 2:
      return 90;
    default:
      return 180;
  }
};

export const destroyRadar = () => {
  d3.select('.radar').remove();
};

export const getQuadrantPosition = (position: string) => {
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

export const getTechnologyQuadrant = (technology: ContentfulTechnology): number => {
  const position = pathOr('', ['fields', 'quadrant', 'fields', 'position'], technology);
  return getQuadrantPosition(position);
};

export const getRadarTechnologies = (technologies: ContentfulTechnology[], activeQuadrant: number) => {
  const radarTechnologies: RadarTechnology[] = [];

  forEachObjIndexed<ContentfulTechnology[]>((item, i) => {
    const quadrant = getTechnologyQuadrant(item as ContentfulTechnology);
    return radarTechnologies.push({
      label: pathOr('', ['fields', 'label'], item),
      quadrant,
      ring: pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
      inactive: quadrant !== activeQuadrant,
      id: i.toString(),
    });
  }, technologies);
  return radarTechnologies;
};

export const getRadarRings = (rings: ContentfulRing[]) => {
  const radarRings: RadarRing[] = [];
  forEachObjIndexed(
    (item) =>
      radarRings.push({
        name: pathOr('', ['fields', 'label'], item),
        position: pathOr(1, ['fields', 'position'], item),
      }),
    rings
  );

  return sortBy(prop('position'), radarRings);
};

export const getRadarTeams = (teams: ContentfulTeam[]) => {
  const radarTeams: RadarTeam[] = [];
  forEachObjIndexed(
    (item) =>
      radarTeams.push({
        name: pathOr('', ['fields', 'label'], item),
      }),
    teams
  );

  return radarTeams;
};

export const getRadarQuadrants = (quadrants: ContentfulQuadrant[]) => {
  const radarQuadrants: RadarQuadrant[] = [];
  forEachObjIndexed(
    (item) =>
      radarQuadrants.push({
        name: pathOr('', ['fields', 'label'], item),
        position: getQuadrantPosition(pathOr('top-left', ['fields', 'position'], item)),
      }),
    quadrants
  );
  return sortBy(prop('position'), radarQuadrants);
};

export const pluckNameFromList = (list: RadarRing[] | RadarQuadrant[] | RadarTeam[]) => pluck('name', list);
