// Define request payloads and response types for Auth based on the Prisma schema

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER';
  status: 'ACTIVE' | 'INACTIVE' | 'LEFT';
  balance: number;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}
