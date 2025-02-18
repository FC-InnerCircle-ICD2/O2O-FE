import { HTTPError, type Options } from 'ky'
import { kyClient, mockClient } from './apiClient'

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface ApiErrorResponse {
  data?: unknown
  message: string
  status: number
}

export const api = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    try {
      const response = await kyClient.get(endpoint, options).json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    try {
      const response = await kyClient
        .post(endpoint, {
          ...(body instanceof FormData ? { body } : { json: body }),
          ...options,
        })
        .json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    try {
      const response = await kyClient
        .put(endpoint, {
          ...(body instanceof FormData ? { body } : { json: body }),
          ...options,
        })
        .json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    try {
      const response = await kyClient.delete(endpoint, options).json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
}

export const mockApi = {
  get: async <T>(endpoint: string, options?: Options): Promise<T> => {
    try {
      const response = await mockClient.get(endpoint, options).json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  post: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    try {
      const response = await mockClient
        .post(endpoint, {
          ...(body instanceof FormData ? { body } : { json: body }),
          ...options,
        })
        .json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  put: async <T>(endpoint: string, body: unknown, options?: Options): Promise<T> => {
    try {
      const response = await mockClient
        .put(endpoint, {
          ...(body instanceof FormData ? { body } : { json: body }),
          ...options,
        })
        .json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
  delete: async <T>(endpoint: string, options?: Options): Promise<T> => {
    try {
      const response = await mockClient.delete(endpoint, options).json<ApiResponse<T>>()
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
}

const handleError = async (error: unknown): Promise<never> => {
  if (error instanceof HTTPError) {
    const errorResponse = (await error.response.json()) as ApiErrorResponse
    throw errorResponse
  }
  throw error
}
