import * as functions from 'firebase-functions';
import * as contentful from 'contentful-management';

export const managementClient = contentful.createClient({
  accessToken: functions.config().contentful.key,
});
