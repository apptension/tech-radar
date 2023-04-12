import { AlternativesTableType } from '../adminPanel/adminPanel.types';

export type Team = {
  label: string;
  value: string;
};

export type NewEntryInputs = {
  label: string;
  quadrant: string;
  ring: string;
  description: string;
  specification: string;
  github: string;
  projects: string;
  icon?: File;
  alternatives: AlternativesTableType[];
  experts: string;
  teams: Team[];
  moved: string;
};
