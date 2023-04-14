import { WebClient } from '@slack/web-api';

export const getSlackClient = (token: string) => new WebClient(token);
