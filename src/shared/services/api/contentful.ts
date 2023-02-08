import * as contentfulDelivery from 'contentful';
import * as contentful from 'contentful-management';
import { isEmpty, values, any } from 'ramda';

export interface ContentfulConfigType {
  space: string;
  accessToken: string;
  environment: string;
  contentManagementApi: string;
  contentManagementToken: string;
}

export const contentfulConfig: ContentfulConfigType = {
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT || '',
  contentManagementApi: process.env.REACT_APP_CONTENTFUL_CONTENT_MANAGEMENT_API_PATH || '',
  contentManagementToken: process.env.REACT_APP_CONTENTFUL_CONTENT_MANAGEMENT_TOKEN || '',
};

if (any(isEmpty, values(contentfulConfig))) {
  throw new Error('Some of Contentful env variables are missing');
}

export const client = contentfulDelivery.createClient({
  space: contentfulConfig.space,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});

export const cmaURL = `${contentfulConfig.contentManagementApi}spaces/${contentfulConfig.space}/environments/${contentfulConfig.environment}`;

export const managementClient = contentful.createClient({
  accessToken: contentfulConfig.contentManagementToken,
});
