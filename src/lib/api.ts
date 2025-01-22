import type { Options } from 'ky'
import { kyClient, mockClient } from './apiClient'

export const api = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    return await kyClient.get(endpoint, options).json<T>()
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    return await kyClient.post(endpoint, { json: body, ...options }).json<T>()
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    return await kyClient.put(endpoint, { json: body, ...options }).json<T>()
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    return await kyClient.delete(endpoint, options).json<T>()
  },
}

export const mockApi = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    return await mockClient.get(endpoint, options).json<T>()
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    return await mockClient.post(endpoint, { json: body, ...options }).json<T>()
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    return await mockClient.put(endpoint, { json: body, ...options }).json<T>()
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    return await mockClient.delete(endpoint, options).json<T>()
  },
}
