import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { env } from '@/config/environment';
import { ApiError } from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message,
          status: error.response?.status,
          code: error.code,
        };

        if (error.response?.data) {
          const errorData = error.response.data as any;
          apiError.message = errorData.message || errorData.error || error.message;
        }

        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Create API instances
export const githubApi = new ApiClient(env.github.apiUrl, {
  Accept: 'application/vnd.github.v3+json',
  ...(env.github.token && { Authorization: `token ${env.github.token}` }),
});

export const blogApi = new ApiClient(env.blog.apiUrl, {
  'api-key': env.blog.apiKey,
});

export const mainApi = new ApiClient(env.api.baseUrl);
