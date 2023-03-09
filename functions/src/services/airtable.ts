import * as Airtable from 'airtable';
import * as functions from 'firebase-functions';

export const airtable = new Airtable({
  apiKey: functions.config().airtable.key,
}).base('appTMfdEVmoLM62bU');
