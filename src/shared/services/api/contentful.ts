import * as contentful from 'contentful';
import { isEmpty } from 'ramda';

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || '';
const environment = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT;

if (!space || !environment || isEmpty(accessToken)) {
  throw new Error('Some of Contentful env variables are missing');
}

export const client = contentful.createClient({
  space,
  accessToken,
  environment,
});
