import axios from 'axios';

const { REACT_APP_FIREBASE_FUNCTIONS_API } = process.env;

export const axiosAirtableApi = axios.create({
  baseURL: REACT_APP_FIREBASE_FUNCTIONS_API,
});
