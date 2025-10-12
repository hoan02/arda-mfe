import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Generic API Error interface
export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  status: number;
}

export abstract class BaseApiClient {
  protected client: AxiosInstance;
  protected baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8000/api/v1') {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ Response Error:', error.response?.data || error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  protected handleError(error: any): ApiError {
    if (error.response) {
      return {
        error: error.response.data?.error || 'API Error',
        message: error.response.data?.message || error.message,
        timestamp: error.response.data?.timestamp || new Date().toISOString(),
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        error: 'Network Error',
        message: 'Unable to connect to server',
        timestamp: new Date().toISOString(),
        status: 0,
      };
    } else {
      return {
        error: 'Request Error',
        message: error.message,
        timestamp: new Date().toISOString(),
        status: 0,
      };
    }
  }

  // Generic CRUD methods that can be used by any feature
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryParams = params ? new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    ).toString() : '';

    const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
    const response = await this.client.get<T>(url);
    return response.data;
  }

  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }

  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(endpoint, data);
    return response.data;
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data);
    return response.data;
  }

  protected async delete(endpoint: string): Promise<void> {
    await this.client.delete(endpoint);
  }

  // Health check - common to all APIs
  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    return this.get<{ status: string; timestamp: string }>('/health');
  }
}
