import { SECRET_KEYS } from '../constants/secretKeys';

export const getSecrets = () => {
  const {
    [SECRET_KEYS.AIRTABLE_API_KEY]: AIRTABLE_API_KEY = '',
    [SECRET_KEYS.AIRTABLE_BASE]: AIRTABLE_BASE = '',
    [SECRET_KEYS.CONTENTFUL_TOKEN]: CONTENTFUL_TOKEN = '',
    [SECRET_KEYS.WEBAPP_URL]: WEBAPP_URL = '',
    [SECRET_KEYS.WEBAPP_DEV_URL]: WEBAPP_DEV_URL = '',
    [SECRET_KEYS.SLACK_MAINTAINER_ID]: SLACK_MAINTAINER_ID = '',
    [SECRET_KEYS.SLACK_TOKEN]: SLACK_TOKEN = '',
    [SECRET_KEYS.CONTENTFUL_SPACE_ID]: CONTENTFUL_SPACE_ID = '',
    [SECRET_KEYS.CONTENTFUL_ENVIRONMENT]: CONTENTFUL_ENVIRONMENT = '',
  } = process.env;

  return {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE,
    CONTENTFUL_TOKEN,
    WEBAPP_URL,
    WEBAPP_DEV_URL,
    SLACK_MAINTAINER_ID,
    SLACK_TOKEN,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT,
  };
};
