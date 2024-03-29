import { ReactNode } from 'react';

export type TechnologyColumn = {
  Header: string;
  accessor: string;
  Cell?: ((row: any) => JSX.Element) | undefined;
  Filter?: ReactNode;
  disableFilters?: boolean;
};

export type TechnologyTable = {
  Header: string;
  columns: TechnologyColumn[];
};

export type IconType = {
  id: string;
  description: string;
  name: string;
  url: string;
};

export type AlternativesTableType = {
  description: string;
  icon: IconType;
  id: string;
  label: string;
};

export type EditedEntry = {
  alternatives: AlternativesTableType[];
  description: string;
  experts: number;
  github: string;
  icon?: IconType;
  iconUpload?: File;
  id?: string;
  label: string;
  projects: string[];
  quadrant: string;
  ring: string;
  specification: string;
  teams: string[];
  moved?: number;
};
