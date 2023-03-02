import * as functions from 'firebase-functions';
import { managementClient } from '../services/contentful';
import { AlternativesTableType, EnvironmentConfig } from '../types';

export const getQueryContentfulConfig = (req: functions.https.Request) => {
  const { space, environment } = req.query;
  if (!space || !environment) {
    throw new Error('SpaceId and Environment is missing!');
  }
  return { space: space as string, environment: environment as string };
};

export const getEnvironment = (contentfulConfig: EnvironmentConfig) =>
  managementClient.getSpace(contentfulConfig.space).then((space) => space.getEnvironment(contentfulConfig.environment));

export const prepareAlternativesArray = (alternatives: AlternativesTableType[]) =>
  alternatives?.map(({ id }: AlternativesTableType) => ({
    sys: {
      id,
      linkType: 'Entry',
      type: 'Link',
    },
  }));

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
