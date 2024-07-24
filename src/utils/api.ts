// utils/api.ts
import axios from 'axios';
import { getToken } from './localStorage';

const api = axios.create({
  baseURL: '/api', // 기본 API URL 설정
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// utils/api.ts
export const getRequest = async (url: string, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  });

  const result = await response.json();
  return result;
};

export const postRequest = async (url: string, data: object, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const patchRequest = async (url: string, data: FormData, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...headers,
    },
    body: data,
  });

  const result = await response.json();
  return result;
};

export const deleteRequest = async (url: string, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  });

  const result = await response.json();
  return result;
};

export default api;