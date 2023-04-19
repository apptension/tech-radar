import { IntlShape } from 'react-intl';
import { RadarQuadrant, RadarRing, RadarTeam } from '../../../shared/components/radar/radar.types';
import { EditedEntry } from '../adminPanel/adminPanel.types';
import messages from './newEntry.messages';
import { NewEntryInputs } from './newEntry.types';

const getIcon = (id: string, name: string) => ({ id, name, description: '', url: '' });

export const prepareNewEntry = (data: NewEntryInputs, iconId?: string): Omit<EditedEntry, 'id'> => ({
  ...data,
  teams: data.teams.map(({ value }) => value),
  projects: data.projects.map(({ value }) => value),
  icon: iconId && data.icon ? getIcon(iconId, data.icon.name) : undefined,
  moved: +data.moved,
});

export const getQuadrantOptions = (radarQuadrants: RadarQuadrant[]) =>
  radarQuadrants.map(({ name, id }) => ({ label: name, value: id }));

export const getRingsOptions = (radarRings: RadarRing[]) =>
  radarRings.map(({ name, id }) => ({ label: name, value: id }));

export const getTeamsOptions = (radarTeams: RadarTeam[]) =>
  radarTeams.map(({ name, id }) => ({ label: name, value: id }));

export const getMovedOptions = (intl: IntlShape) => [
  { value: 0, label: intl.formatMessage(messages.movedCircle) },
  { value: 1, label: intl.formatMessage(messages.movedArrowUp) },
  { value: -1, label: intl.formatMessage(messages.movedArrowDown) },
];
