import * as Airtable from 'airtable';

export const getAirtable = (key: string, base: string) => {
  return new Airtable({
    apiKey: key,
  }).base(base);
};
