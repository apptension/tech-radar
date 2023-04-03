import * as contentfulDelivery from 'contentful';
import { isEmpty, values, any } from 'ramda';

export interface ContentfulConfigType {
  space: string;
  accessToken: string;
  environment: string;
}

export const contentfulConfig: ContentfulConfigType = {
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT || '',
};

if (any(isEmpty, values(contentfulConfig))) {
  throw new Error('Some of Contentful env variables are missing');
}

export const client = contentfulDelivery.createClient({
  space: contentfulConfig.space,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});
