import axios from 'axios';
import useStore from '../store';

// Use the deployed Render URL in production, otherwise use the local proxy
const API_URL = import.meta.env.PROD 
    ? 'https://apna-mandi-server.onrender.com' // <-- PASTE YOUR RENDER BACKEND URL HERE
    : '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
