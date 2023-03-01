import * as contentful from 'contentful-management';

export const managementClient = contentful.createClient({
  accessToken: `${process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN}` || '',
});
