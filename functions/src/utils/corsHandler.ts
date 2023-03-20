import * as cors from 'cors';
import * as functions from 'firebase-functions';

export const corsHandler = cors({
  origin: [functions.config().config.test_webapp_url, functions.config().config.test_webapp_url],
});
