import * as functions from 'firebase-functions';
import { Entry } from 'contentful-management';
import { managementClient } from '../services/contentful';
import { EntryFieldsData, EnvironmentConfig, PreparedEntry } from '../types';
import { DEFAULT_LOCALE } from '../constants';

export const getQueryContentfulConfig = (req: functions.https.Request) => {
  const { space, environment } = req.query;
  if (!space || !environment) {
    throw new Error('SpaceId and Environment is missing!');
  }
  return { space: space as string, environment: environment as string };
};

export const getEnvironment = (contentfulConfig: EnvironmentConfig) =>
  managementClient.getSpace(contentfulConfig.space).then((space) => space.getEnvironment(contentfulConfig.environment));

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
      case 'team':
        return { [key]: prepareReference(entry[key]) };
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
