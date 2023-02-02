import { RadarTechnology } from '../../shared/components/radar/radar.types';

export type TechnologyColumn = {
  Header: string;
  accessor: string;
  Cell?: ((row: any) => JSX.Element) | undefined;
};

export type TechnologyTable = {
  Header: string;
  columns: TechnologyColumn[];
};

export type ExtendedRadarTechnology = RadarTechnology & {
  iconDescription: string;
  iconName: string;
  iconUrl: string;
};
