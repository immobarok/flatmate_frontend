import { fetchApi } from '../core/apiClient';
import type { LoginRequest, RegisterRequest, AuthResponse, UserResponse } from './auth.types';

export const authServices = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: async (): Promise<UserResponse> => {
    return fetchApi<UserResponse>('/auth/profile', {
      method: 'GET',
    });
  },
};
