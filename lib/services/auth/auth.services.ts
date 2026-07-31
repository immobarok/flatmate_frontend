import { fetchApi } from '../core/apiClient';
import type { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, UserResponse } from './auth.types';

export const authServices = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return fetchApi<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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
