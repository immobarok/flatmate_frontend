'use server';

import { cookies } from 'next/headers';
import { withServerAction, type ActionState } from '../core/serverAction';
import { usersServices } from './users.services';
import type { MemberDashboardResponse, AdminDashboardResponse } from './users.types';

export async function getMemberDashboardAction(): Promise<ActionState<MemberDashboardResponse>> {
  return withServerAction(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      throw new Error('Unauthorized'); // This will be caught by withServerAction
    }

    const data = await usersServices.getMemberDashboard(token);
    return data;
  });
}

export async function getAdminDashboardAction(): Promise<ActionState<AdminDashboardResponse>> {
  return withServerAction(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      throw new Error('Unauthorized'); 
    }

    const data = await usersServices.getAdminDashboard(token);
    return data;
  });
}
