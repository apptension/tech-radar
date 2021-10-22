import { FilterType } from '../../../modules/filters/filters.types';

export type RadarTechnology = {
  label: string;
  quadrant: number;
  ring: number;
  inactive: boolean;
  id: string;
  team: string;
};
export type RadarRing = { name: string; position: number };
export type RadarQuadrant = { name: string; position: number };
export type RadarTeam = { name: string };

export type RadarConfig = {
  svg_id: string;
  width: number;
  height: number;
  colors: { background: string; grid: string; inactive: string; default: string };
  print_layout: true;
  quadrants: RadarQuadrant[];
  rings: RadarRing[];
  technologies: RadarTechnology[];
  zoomed_quadrant?: number;
  active_quadrant?: number;
  active_ring?: number;
};

export enum QuadrantPositions {
  bottomRight,
  bottomLeft,
  topLeft,
  topRight,
}

export enum RingPositions {
  inner,
  second,
  third,
  outer,
}

export type ContentfulRing = { fields: { label: string; position: RingPositions } };

export type ContentfulTeam = { fields: { label: string } };

export type ContentfulQuadrant = { fields: { label: string; position: QuadrantPositions } };

export type ContentfulTechnology = {
  fields: {
    label: string;
    quadrant: ContentfulQuadrant;
    ring: ContentfulRing;
  };
  sys: { contentType: { id: string } };
};

export type ContentfulData = ContentfulTechnology[] | ContentfulRing[] | ContentfulQuadrant[];

export interface BlipInterface {
  id: string;
  ring: number;
  color: string;
}

export interface BubbleInterface {
  label: string;
  x: number;
  y: number;
  ring: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface MinMaxFunction {
  (min: number, max: number): number;
}

export interface RotateDataProps {
  activeQuadrant: number | null;
  newQuadrant: number;
  technologies: RadarTechnology[];
  quadrants: RadarQuadrant[];
  searchText: FilterType;
  teamValue: FilterType;
  levelValue: FilterType;
  rings: RadarRing[];
}

export type UpdateTechnologiesProps = Omit<RotateDataProps, 'newQuadrant' | 'quadrants'>;
