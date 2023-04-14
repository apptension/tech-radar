import * as cors from 'cors';

export const corsHandler = (origins: string[]) => cors({ origin: origins });
