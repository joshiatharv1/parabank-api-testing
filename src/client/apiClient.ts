import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config/env';

export interface TimedResponse<T = unknown> extends AxiosResponse<T> {
  durationMs: number;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      validateStatus: () => true, // never throw on HTTP errors — we assert manually
    });
  }

  private async timed<T>(fn: () => Promise<AxiosResponse<T>>): Promise<TimedResponse<T>> {
    const start = Date.now();
    const res   = await fn();
    return { ...res, durationMs: Date.now() - start };
  }

  async get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<TimedResponse<T>> {
    return this.timed(() => this.client.get<T>(path, { params }));
  }

  async post<T = unknown>(path: string, data?: unknown, params?: Record<string, unknown>): Promise<TimedResponse<T>> {
    return this.timed(() => this.client.post<T>(path, data, { params }));
  }

  async delete<T = unknown>(path: string): Promise<TimedResponse<T>> {
    return this.timed(() => this.client.delete<T>(path));
  }
}

export const apiClient = new ApiClient();