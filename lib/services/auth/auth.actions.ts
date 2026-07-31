'use server';

import { withServerAction, type ActionState } from '../core/serverAction';
import { authServices } from './auth.services';
import type { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse } from './auth.types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function loginAction(
  credentials: LoginRequest
): Promise<ActionState<AuthResponse>> {
  return withServerAction(async () => {
    const data = await authServices.login(credentials);

    // Store tokens securely in httpOnly cookies
    const cookieStore = await cookies();
    cookieStore.set('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    });
    cookieStore.set('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    revalidatePath('/');
    return data;
  });
}

export async function registerAction(
  data: RegisterRequest
): Promise<ActionState<RegisterResponse>> {
  return withServerAction(async () => {
    // Register does NOT return tokens — it returns basic user info only.
    // If joining a mess → status PENDING (need admin approval)
    // If creating a mess → status ACTIVE (auto-login separately)
    const responseData = await authServices.register(data);
    return responseData;
  });
}

export async function logoutAction(): Promise<ActionState<void>> {
  return withServerAction(async () => {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    revalidatePath('/');
  });
}
