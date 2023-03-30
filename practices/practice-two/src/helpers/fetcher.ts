import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export const fetcher = (endpoint: string) => {
  return axiosConfig.get(endpoint).then((r) => r.data);
};
