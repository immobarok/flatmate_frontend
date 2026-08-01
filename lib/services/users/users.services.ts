import { fetchApi } from '../core/apiClient';
import type { MemberDashboardResponse, AdminDashboardResponse } from './users.types';

export const usersServices = {
  getMemberDashboard: async (token: string): Promise<MemberDashboardResponse> => {
    const response = await fetchApi<any>('/users/me/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Unwrap .data if the backend wraps it
    return response.data || response;
  },
  getAdminDashboard: async (token: string): Promise<AdminDashboardResponse> => {
    const response = await fetchApi<any>('/users/admin/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || response;
  },
};
