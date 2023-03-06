import { RadarQuadrant, RadarRing, RadarTeam } from '../../shared/components/radar/radar.types';
import { EditedEntry } from '../adminPanel/adminPanel.types';
import { NewEntryInputs } from './newEntry.component';

const getIcon = (id: string, name: string) => ({ id, name, description: '', url: '' });

export const prepareNewEntry = (data: NewEntryInputs, iconId?: string): Omit<EditedEntry, 'id'> => ({
  ...data,
  icon: iconId && data.icon ? getIcon(iconId, data.icon.name) : undefined,
  moved: +data.moved,
});

export const getQuadrantOptions = (radarQuadrants: RadarQuadrant[]) =>
  radarQuadrants.map(({ name, id }) => ({ label: name, value: id }));

export const getRingsOptions = (radarRings: RadarRing[]) =>
  radarRings.map(({ name, id }) => ({ label: name, value: id }));

export const getTeamsOptions = (radarTeams: RadarTeam[]) =>
  radarTeams.map(({ name, id }) => ({ label: name, value: id }));

export const getMovedOptions = () => [
  { value: 0, label: 'Circle' },
  { value: 1, label: 'Arrow up' },
  { value: -1, label: 'Arrow down' },
];
