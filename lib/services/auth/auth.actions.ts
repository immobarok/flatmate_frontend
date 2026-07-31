'use server';

import { withServerAction, type ActionState } from '../core/serverAction';
import { authServices } from './auth.services';
import type { LoginRequest, AuthResponse } from './auth.types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function loginAction(
  credentials: LoginRequest
): Promise<ActionState<AuthResponse>> {
  return withServerAction(async () => {
    const data = await authServices.login(credentials);
    
    // Store token securely in an httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('access_token', data.accessToken, {
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
