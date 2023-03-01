import axios from 'axios';

export const axiosFunctionsApi = axios.create({ baseURL: process.env.REACT_APP_FIREBASE_FUNCTIONS_API });
