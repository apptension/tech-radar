import { TableTeam } from '../../../shared/components/radar/radar.types';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';

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
  teams: TableTeam[];
  moved: string;
};
