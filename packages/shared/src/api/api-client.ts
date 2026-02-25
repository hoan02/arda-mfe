import { getToken, getTenantKey } from '../auth/auth-store';
import { refreshAccessToken } from '../auth/auth-api';
import { ApiError } from './types/api';

// Request configuration interface
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export abstract class BaseApiClient {
  protected baseUrl: string;
  protected defaultTimeout: number = 10000;

  constructor(baseUrl: string = 'http://localhost:9080/api') {
    this.baseUrl = baseUrl;
  }

  // Core fetch method with timeout and error handling
  protected async fetchWithTimeout(
    endpoint: string,
    config: RequestConfig = { method: 'GET' }
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const timeout = config.timeout || this.defaultTimeout;

    console.log(`🚀 API Request: ${config.method} ${url}`);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Build headers with auth injection
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...config.headers,
      };

      // Auto-inject auth token if available
      const token = getToken();
      if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Auto-inject tenant ID if available
      const tenantKey = getTenantKey();
      if (tenantKey && !headers['X-Tenant-ID']) {
        headers['X-Tenant-ID'] = tenantKey;
      }

      const response = await fetch(url, {
        method: config.method,
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(`✅ API Response: ${response.status} ${url}`);

      if (!response.ok) {
        // 401 — attempt token refresh and retry once
        if (response.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            clearTimeout(timeoutId);
            // Retry with new token
            return this.fetchWithTimeout(endpoint, config);
          }
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      console.error('❌ Request Error:', error);
      throw this.handleError(error);
    }
  }

  protected handleError(error: any): ApiError {
    if (error.message?.includes('HTTP')) {
      // Extract status code from error message like "HTTP 404: Not Found"
      const statusMatch = error.message.match(/HTTP (\d+):/);
      const status = statusMatch ? parseInt(statusMatch[1]) : 500;

      return {
        error: 'API Error',
        message: error.message,
        timestamp: new Date().toISOString(),
        status,
      };
    } else if (error.message === 'Request timeout') {
      return {
        error: 'Timeout Error',
        message: 'Request timed out',
        timestamp: new Date().toISOString(),
        status: 408,
      };
    } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      return {
        error: 'Network Error',
        message: 'Unable to connect to server',
        timestamp: new Date().toISOString(),
        status: 0,
      };
    } else {
      return {
        error: 'Request Error',
        message: error.message || 'Unknown error occurred',
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
    const response = await this.fetchWithTimeout(url, { method: 'GET' });
    return response.json();
  }

  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'POST',
      body: data,
    });
    return response.json();
  }

  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'PUT',
      body: data,
    });

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    return {} as T;
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'PATCH',
      body: data,
    });

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    return {} as T;
  }

  protected async delete(endpoint: string): Promise<void> {
    await this.fetchWithTimeout(endpoint, { method: 'DELETE' });
  }

  // Health check - common to all APIs
  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    return this.get<{ status: string; timestamp: string }>('/health');
  }

  // TanStack Query integration helpers
  protected createQueryKey(endpoint: string, params?: Record<string, any>): (string | Record<string, any>)[] {
    const baseKey: (string | Record<string, any>)[] = [this.baseUrl, endpoint];
    if (params) {
      baseKey.push(params);
    }
    return baseKey;
  }

  // Method to get query key for caching
  getQueryKey(endpoint: string, params?: Record<string, any>): (string | Record<string, any>)[] {
    return this.createQueryKey(endpoint, params);
  }

  // Method to invalidate queries (useful for mutations)
  getQueryKeysForEndpoint(endpoint: string): string[] {
    return [this.baseUrl, endpoint];
  }
}
