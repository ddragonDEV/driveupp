/* eslint-disable no-shadow */
import axios from 'axios';
import { config } from 'config';
import { getItem } from 'helpers/localStorage';

export const backend = axios.create({
  baseURL: config.apiUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

backend.interceptors.request.use(
  async (config) => {
    const token = await getItem('token');

    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  },
  (error) => Promise.reject(error),
);
