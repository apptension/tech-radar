import * as d3 from 'd3';
import { pathOr, forEachObjIndexed, sortBy, prop, pluck, isNil } from 'ramda';
import { color } from '../../theme';
import { RADAR_SEED, RADAR_SEED_MULTIPLIER } from '../components/radar/radar.constants';
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
  TableRadarTechnology,
  UpdateTechnologiesProps,
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

export const showBubble = ({ label, x, y, ring }: BubbleInterface) => {
  const tooltip = d3.select('#bubble text').text(label);
  const tooltipNode = tooltip.node() as SVGGraphicsElement | null;
  if (tooltipNode) {
    const bbox = tooltipNode.getBBox();
    d3.select('#bubble')
      .attr('transform', translate({ x: x - 8, y: ring === 3 ? y - 18 : y - 14 }))
      .style('opacity', 1);
    d3.select('#bubble rect')
      .attr('x', -bbox.width - 38)
      .attr('y', -4)
      .attr('width', bbox.width + 24)
      .attr('height', bbox.height + 20)
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
  hide,
  fill = 'url(#mainGradient)',
}: {
  id: string;
  shape: string;
  opacity: number;
  fill?: string;
  hide?: boolean;
}) => {
  const blip = d3.select(`#blip-${id}`);
  const outerBlip = blip.select(shape);
  const blipInner = blip.select('.blip-inner');
  outerBlip.style('opacity', hide ? '' : opacity);
  const fullBlip = blip.selectAll(shape);
  fullBlip.style('fill', hide ? '' : fill);
  blipInner.style('transform', hide ? '' : 'scale(1.5)');
};

export const highlightBlip = ({ id, ring }: Omit<BlipInterface, 'color'>) => {
  switch (ring) {
    case 0:
      changeHighlight({ id, shape: 'circle', opacity: 0.3 });
      break;
    case 1:
      changeHighlight({ id, shape: 'rect', opacity: 0.3, fill: 'url(#diamondMainGradient)' });
      break;
    case 2:
      changeHighlight({ id, shape: 'rect', opacity: 0.3 });
      break;
    default:
      changeHighlight({ id, shape: 'path', opacity: 0.3 });
  }
};

export const unhighlightBlip = ({ id, ring }: BlipInterface) => {
  switch (ring) {
    case 0:
      changeHighlight({ id, shape: 'circle', opacity: 0, hide: true });
      break;
    case 1:
      changeHighlight({ id, shape: 'rect', opacity: 0, hide: true });
      break;
    case 2:
      changeHighlight({ id, shape: 'rect', opacity: 0, hide: true });
      break;
    default:
      changeHighlight({ id, shape: 'path', opacity: 0, hide: true });
  }
};

export const getBlipDataById = (id: string) => {
  const blip = document.querySelector(`#blip-${id}`) as SVGGraphicsElement;
  return blip ? JSON.parse(blip.dataset.translate || '') : { x: -1000, y: -1000 };
};

export const highlightLegend = ({ id, mode = 'on' }: { id: string; mode?: 'on' | 'off' }) => {
  const listItem = document.querySelector(`#list-item-${id}`) as HTMLDivElement;
  const listItemTags = document.querySelector(`#list-item-tags-${id}`) as HTMLDivElement;
  if (listItem) listItem.style.color = mode === 'on' ? color.white : color.boulder;
  if (listItemTags) listItemTags.style.opacity = mode === 'on' ? '1' : '0';
};

export const toggleQuadrant = (quadrant: number, show: boolean) => {
  const quadrantElement = document.querySelector(`#quadrant-${quadrant}`) as HTMLDivElement;
  const areaLabelElement = document.querySelector(`#area-label-${quadrant}`) as HTMLDivElement;
  const isActiveElement = quadrantElement?.classList.contains('active') && show;
  if (quadrantElement && !isActiveElement) {
    const circle = quadrantElement.querySelector('circle');
    const rect = areaLabelElement.querySelector('rect');
    const text = areaLabelElement.querySelector('text');

    if (circle) circle.style.opacity = show ? '0.5' : '';
    if (rect) rect.style.fill = show ? color.silver : '';
    if (text) text.style.fill = show ? color.mineShaft : '';
  }
};

export const getRotationForQuadrant = (quadrant: number | null) => {
  switch (quadrant) {
    case 0:
      return -90;
    case 1:
      return 0;
    case 2:
      return 90;
    case 3:
      return 180;
    default:
      return 90;
  }
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

const getIcon = (item: ContentfulTechnology) => ({
  id: pathOr('', ['fields', 'icon', 'sys', 'id'], item),
  url: pathOr('', ['fields', 'icon', 'fields', 'file', 'url'], item),
  description: pathOr('', ['fields', 'icon', 'fields', 'description'], item),
  name: pathOr('', ['fields', 'icon', 'fields', 'title'], item),
});

const getAlternatives = (item: ContentfulTechnology) => {
  const alternatives = pathOr([], ['fields', 'alternatives'], item);

  return alternatives.map((alternative) => ({
    label: pathOr('', ['fields', 'label'], alternative),
    description: pathOr('', ['fields', 'description'], alternative),
    id: pathOr('', ['sys', 'id'], alternative),
    icon: getIcon(alternative),
  }));
};

const getTableTeams = (item: ContentfulTechnology) => {
  const teams = pathOr([], ['fields', 'teams'], item);
  return teams.map((team) => ({
    label: pathOr('', ['fields', 'label'], team),
    value: pathOr('', ['sys', 'id'], team),
  }));
};

const getTeams = (item: ContentfulTechnology) => {
  const teams = pathOr([], ['fields', 'teams'], item);
  return teams.map((team) => pathOr('', ['fields', 'label'], team));
};

export const getRadarTechnologies = (technologies: ContentfulTechnology[]) => {
  const radarTechnologies: RadarTechnology[] = [];

  forEachObjIndexed<ContentfulTechnology[]>((item) => {
    const quadrant = getTechnologyQuadrant(item as ContentfulTechnology);
    return radarTechnologies.push({
      label: pathOr('', ['fields', 'label'], item),
      description: pathOr('', ['fields', 'description'], item),
      specification: pathOr('', ['fields', 'specification'], item),
      github: pathOr('', ['fields', 'github'], item),
      projects: pathOr('', ['fields', 'projects'], item),
      experts: pathOr('', ['fields', 'experts'], item),
      icon: getIcon(item as ContentfulTechnology),
      alternatives: getAlternatives(item as ContentfulTechnology),
      quadrant,
      ring: pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
      ringLabel: pathOr('', ['fields', 'ring', 'fields', 'label'], item),
      teams: getTeams(item as ContentfulTechnology),
      inactive: false,
      id: pathOr('', ['sys', 'id'], item),
    });
  }, technologies);
  return radarTechnologies;
};

export const getRadarTechnologiesForTable = (technologies: ContentfulTechnology[]) => {
  const radarTechnologies: TableRadarTechnology[] = [];

  forEachObjIndexed<ContentfulTechnology[]>((item) => {
    return radarTechnologies.push({
      label: pathOr('', ['fields', 'label'], item),
      description: pathOr('', ['fields', 'description'], item),
      specification: pathOr('', ['fields', 'specification'], item),
      github: pathOr('', ['fields', 'github'], item),
      projects: pathOr('', ['fields', 'projects'], item),
      experts: pathOr('', ['fields', 'experts'], item),
      icon: getIcon(item as ContentfulTechnology),
      alternatives: getAlternatives(item as ContentfulTechnology),
      quadrant: pathOr('', ['fields', 'quadrant', 'sys', 'id'], item),
      ring: pathOr('', ['fields', 'ring', 'sys', 'id'], item),
      teams: getTableTeams(item as ContentfulTechnology),
      inactive: false,
      id: pathOr('', ['sys', 'id'], item),
    });
  }, technologies);
  return radarTechnologies;
};

export const getRadarRings = (rings: ContentfulRing[]) => {
  const radarRings: RadarRing[] = [];
  forEachObjIndexed(
    (item) =>
      radarRings.push({
        id: pathOr('', ['sys', 'id'], item),
        name: pathOr('', ['fields', 'label'], item),
        description: pathOr('', ['fields', 'description'], item),
        position: pathOr(1, ['fields', 'position'], item),
      }),
    rings
  );

  return sortBy(prop('position'), radarRings);
};

export const getRadarTeams = (teams: ContentfulTeam[] | undefined) => {
  const radarTeams: RadarTeam[] = [];
  forEachObjIndexed(
    (item) =>
      radarTeams.push({
        id: pathOr('', ['sys', 'id'], item),
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
        id: pathOr('', ['sys', 'id'], item),
        name: pathOr('', ['fields', 'label'], item),
        description: pathOr('', ['fields', 'description'], item),
        position: getQuadrantPosition(pathOr('top-left', ['fields', 'position'], item)),
      }),
    quadrants
  );
  return sortBy(prop('position'), radarQuadrants);
};

export const pluckNameFromList = (list: RadarRing[] | RadarQuadrant[] | RadarTeam[]) => pluck('name', list);

export const getActiveTechnologiesIds = ({
  searchText,
  teamValue,
  levelValue,
  rings,
  technologies,
  activeQuadrant,
}: UpdateTechnologiesProps): string[] => {
  let filtered = technologies;

  if (!isNil(activeQuadrant)) filtered = filtered.filter((technology) => technology.quadrant === activeQuadrant);

  if (searchText)
    filtered = filtered.filter((technology) => technology.label.toLowerCase().includes(searchText.toLowerCase()));

  if (teamValue) filtered = filtered.filter((technology) => technology.teams.find((team) => team === teamValue));

  if (levelValue) filtered = filtered.filter((technology) => rings[technology.ring].name === levelValue);

  return filtered.map((technology) => technology.id);
};

export const getUpdatedRadarTechnologies = ({
  technologies,
  searchText,
  teamValue,
  levelValue,
  rings,
  activeQuadrant,
}: UpdateTechnologiesProps): { updatedTechnologies: RadarTechnology[]; activeIds: string[] } => {
  const activeTechnologiesIds = getActiveTechnologiesIds({
    searchText,
    teamValue,
    technologies,
    levelValue,
    rings,
    activeQuadrant,
  });

  const updatedTechnologies = technologies.map((technology) => ({
    ...technology,
    inactive: !activeTechnologiesIds.includes(technology.id),
  }));

  return { updatedTechnologies, activeIds: activeTechnologiesIds };
};
