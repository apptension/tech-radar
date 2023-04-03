import * as cors from 'cors';

export const corsHandler = (origin: string) =>
  cors({
    origin,
  });
