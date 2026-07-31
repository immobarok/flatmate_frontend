// Define request payloads and response types for Auth based on the Prisma schema

export interface LoginRequest {
  email: string;
  password: string;
  cfTurnstileToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  cfTurnstileToken: string;
  // Optional: join existing mess
  messCode?: string;
  // Optional: name for new mess (when creating, not joining)
  messName?: string;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEFT';

export interface UserResponse {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  status: UserStatus;
  messId?: string | null;
  balance?: number;
}

// Login returns full auth tokens + user
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

// Register returns only basic user info (no tokens)
// If joining a mess → status is PENDING (awaiting admin approval)
// If creating a mess → status is ACTIVE, role is ADMIN
export interface RegisterResponse {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
