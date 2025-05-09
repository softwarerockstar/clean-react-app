import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // TODO: add auth tokens here
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        throw new ApiError(
          error.response.statusText,
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        throw new ApiError('No response received', 0);
      } else {
        throw new ApiError(error.message || 'Unknown error', 0);
      }
    }
  );

  return client;
};

// Create a default client for JSONPlaceholder
export const jsonPlaceholderClient = createApiClient('https://jsonplaceholder.typicode.com');