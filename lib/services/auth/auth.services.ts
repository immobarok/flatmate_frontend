import { fetchApi } from '../core/apiClient';
import type { LoginRequest, AuthResponse, UserResponse } from './auth.types';

export const authServices = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async (): Promise<UserResponse> => {
    return fetchApi<UserResponse>('/auth/profile', {
      method: 'GET',
    });
  },
};
