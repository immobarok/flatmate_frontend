import { fetchApi } from '../core/apiClient';
import type { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, UserResponse } from './auth.types';

export const authServices = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetchApi<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response.data || response;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetchApi<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data || response;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  getProfile: async (): Promise<UserResponse> => {
    return fetchApi<UserResponse>('/users/me', {
      method: 'GET',
    });
  },
};
