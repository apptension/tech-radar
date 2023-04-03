import * as contentful from 'contentful-management';

export const getContentfulClient = (accessToken: string) =>
  contentful.createClient({
    accessToken,
  });
