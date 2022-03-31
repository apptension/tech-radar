import { FilterType } from '../../../modules/filters/filters.types';

export type RadarTechnology = {
  label: string;
  quadrant: number;
  ring: number;
  ringLabel: string;
  inactive: boolean;
  id: string;
  team: string;
  color?: string;
  description: string;
  specification: string;
  github: string;
  projects: string;
  icon: { url: string; description: string; name: string };
  alternatives: {
    label: string;
    icon: { url: string; description: string; name: string };
    id: string;
    description: string;
  }[];
  experts: string;
};
export type RadarRing = { name: string; position: number; description: string };
export type RadarQuadrant = { name: string; position: number; description: string };
export type RadarTeam = { name: string };

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

export type ContentfulIcon = { fields: { file: { url: string }; description: string; name: string } };

export type ContentfulAlternative = {
  fields: { label: string; icon: ContentfulIcon; id: string; description: string };
};

export type ContentfulTechnology = {
  fields: {
    label: string;
    quadrant: ContentfulQuadrant;
    ring: ContentfulRing;
    description: string;
    specification: string;
    github: string;
    projects: string;
    icon: ContentfulIcon;
    alternatives: ContentfulAlternative[];
    experts: string;
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

export type Rings = { radius: number; description: string; name: string }[];
