import axios from 'axios';

const { REACT_APP_FIREBASE_FUNCTIONS_API, REACT_APP_CONTENTFUL_ENVIRONMENT, REACT_APP_CONTENTFUL_SPACE_ID } =
  process.env;

export const axiosContentfulApi = axios.create({
  baseURL: REACT_APP_FIREBASE_FUNCTIONS_API,
});

axiosContentfulApi.interceptors.request.use((config) => {
  config.params = {
    space: REACT_APP_CONTENTFUL_SPACE_ID,
    environment: REACT_APP_CONTENTFUL_ENVIRONMENT,
    ...config.params,
  };
  return config;
});

export const axiosAirtableApi = axios.create({
  baseURL: REACT_APP_FIREBASE_FUNCTIONS_API,
});
