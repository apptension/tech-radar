import { BaseType, Selection } from 'd3';
import { FilterType } from '../../../modules/filters/filters.types';

export type RadarTechnology = {
  label: string;
  quadrant: number;
  ring: number;
  ringLabel: string;
  inactive: boolean;
  id: string;
  teams: string[];
  color?: string;
  description: string;
  specification: string;
  github: string;
  projects: {
    name: string;
    description: string;
    url: string;
    image: string;
  }[];
  icon: { id: string; url: string; description: string; name: string };
  alternatives: {
    label: string;
    icon: { url: string; description: string; name: string };
    id: string;
    description: string;
  }[];
  experts: number;
};

export type TableSelect = {
  label: string;
  value: string;
};

export type TableRadarTechnology = {
  label: string;
  quadrant: string;
  ring: string;
  inactive: boolean;
  id: string;
  teams: TableSelect[];
  description: string;
  specification: string;
  github: string;
  projects: TableSelect[];
  icon: { id: string; url: string; description: string; name: string };
  alternatives: {
    label: string;
    icon: { url: string; description: string; name: string };
    id: string;
    description: string;
  }[];
  experts: string;
};

export type RadarRing = { id: string; name: string; position: number; description: string };
export type RadarQuadrant = { id: string; name: string; position: number; description: string };
export type RadarTeam = { id: string; name: string; description: string };
export type RadarProject = { id: string; name: string; description: string; url: string; image: ContentfulImageSource };

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

export type ContentfulProject = {
  fields: { id: string; name: string; description: string; url: string; image: ContentfulImageSource };
};

export type ContentfulTeam = { fields: { label: string } };

export type ContentfulQuadrant = { fields: { id: string; label: string; position: QuadrantPositions } };

export type ContentfulIcon = { fields: { file: { url: string }; description: string; name: string } };

export type ContentfulAlternative = {
  fields: { label: string; icon: ContentfulIcon; id: string; description: string };
};

export type ContentfulTechnologyFields = {
  id?: string;
  label: string;
  quadrant: ContentfulQuadrant;
  ring: ContentfulRing;
  description: string;
  specification: string;
  github: string;
  projects: string[];
  icon: ContentfulIcon;
  alternatives: ContentfulAlternative[];
  experts: number;
};

export type ContentfulTechnology = {
  fields: ContentfulTechnologyFields;
  sys: { id?: string; contentType: { id: string } };
};

export type ContentfulData = ContentfulTechnology[] | ContentfulRing[] | ContentfulQuadrant[];

export type ContentfulImageSource =
  | string
  | { url: string }
  | { file: { url: string } }
  | { fields: { file: { url: string } } };

export interface BlipInterface {
  id: string;
  ring: number;
  color: string;
  scale?: boolean;
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

export type RingLabels = Selection<BaseType, { radius: number; description: string; name: string }, any, unknown>;
