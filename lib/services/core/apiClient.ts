/**
 * Base API Client for making HTTP requests to the backend.
 * Handles base URLs, common headers, and standard error parsing.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export class ApiException extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // TODO: Intercept and attach auth tokens if needed from cookies or localStorage

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiException(
        errorData.message || response.statusText || 'An error occurred',
        response.status,
        errorData
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException((error as Error).message, 500);
  }
}
