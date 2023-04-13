import * as functions from 'firebase-functions';
import { Entry, ClientAPI } from 'contentful-management';
import { EntryFieldsData, EnvironmentConfig, PreparedEntry } from '../types';
import { DEFAULT_LOCALE } from '../constants';

export const getQueryContentfulConfig = (req: functions.https.Request) => {
  const { space, environment } = req.query;
  if (!space || !environment) {
    throw new Error('SpaceId and Environment is missing!');
  }
  return { space: space as string, environment: environment as string };
};

export const getEnvironment = (client: ClientAPI, contentfulConfig: EnvironmentConfig) =>
  client.getSpace(contentfulConfig.space).then((space) => space.getEnvironment(contentfulConfig.environment));

export const getOrganization = (client: ClientAPI, space: string) => client.getSpace(space);

export const checkUser = async (client: ClientAPI, req: functions.https.Request) => {
  try {
    const contentfulConfg = getQueryContentfulConfig(req);
    const { email } = req.query;
    const organistaion = await getOrganization(client, contentfulConfg.space);
    const users = await organistaion.getSpaceUsers();
    const isSpaceUser = users.items.find((user) => user.email === email);

    return Boolean(isSpaceUser);
  } catch (err) {
    return false;
  }
};

export const prepareIcon = (id?: string) => ({
  sys: {
    id: id ? id : '',
    linkType: 'Asset',
    type: 'Link',
  },
});

export const prepareReference = (reference: string) => ({
  sys: {
    id: reference,
    type: 'Link',
    linkType: 'Entry',
  },
});

export const convertEntryFields = (entry: EntryFieldsData): PreparedEntry => {
  const arrayOfFields = (Object.keys(entry) as Array<keyof typeof entry>).map((key) => {
    switch (key) {
      case 'quadrant':
      case 'ring':
        return { [key]: prepareReference(entry[key]) };
      case 'teams':
        return { [key]: entry.teams.map((team) => prepareReference(team)) };
      case 'icon':
        return { [key]: prepareIcon(entry[key]?.id || '') };
      default:
        return { [key]: entry[key] };
    }
  });
  return Object.assign({}, ...arrayOfFields);
};

export const changeEntryFields = (entry: Entry, newEntry: PreparedEntry) => {
  (Object.keys(newEntry) as Array<keyof typeof newEntry>).forEach((key) => {
    entry.fields[key] = { ...entry.fields[key], [DEFAULT_LOCALE]: newEntry[key] };
  });
};

export const createEntryFields = (entryFields: PreparedEntry) => {
  const localisedFields = (Object.keys(entryFields) as Array<keyof typeof entryFields>).map((key) => {
    return { [key]: { [DEFAULT_LOCALE]: entryFields[key] } };
  });

  return Object.assign({}, ...localisedFields);
};
