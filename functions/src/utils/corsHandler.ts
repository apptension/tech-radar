import * as cors from 'cors';

export const corsHandler = cors({ origin: `${process.env.WEBAPP_URL}` });
