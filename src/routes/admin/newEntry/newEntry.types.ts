import { TableSelect } from '../../../shared/components/radar/radar.types';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';

export type NewEntryInputs = {
  label: string;
  quadrant: string;
  ring: string;
  description: string;
  specification: string;
  github: string;
  projects: TableSelect[];
  icon?: File;
  alternatives: AlternativesTableType[];
  experts: string;
  teams: TableSelect[];
  moved: string;
};
