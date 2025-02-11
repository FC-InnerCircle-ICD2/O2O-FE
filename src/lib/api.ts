import type { Options } from 'ky'
import { kyClient, mockClient } from './apiClient'

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export const api = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    const response = await kyClient.get(endpoint, options).json<ApiResponse<T>>()
    return response.data
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    const response = await kyClient
      .post(endpoint, { json: body, ...options })
      .json<ApiResponse<T>>()
    return response.data
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    const response = await kyClient.put(endpoint, { json: body, ...options }).json<ApiResponse<T>>()
    return response.data
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    const response = await kyClient.delete(endpoint, options).json<ApiResponse<T>>()
    return response.data
  },
}

export const mockApi = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    const response = await mockClient.get(endpoint, options).json<ApiResponse<T>>()
    return response.data
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    const response = await mockClient
      .post(endpoint, { json: body, ...options })
      .json<ApiResponse<T>>()
    return response.data
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    const response = await mockClient
      .put(endpoint, { json: body, ...options })
      .json<ApiResponse<T>>()
    return response.data
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    const response = await mockClient.delete(endpoint, options).json<ApiResponse<T>>()
    return response.data
  },
}
